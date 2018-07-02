import { Alert } from 'react-native'
import { createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers'
// import drawLotsAction from '../actions/drawLots.action'
// import Background fro../components/Background.componentund'
import courseMenuAction from '../actions/courseMenu.action'
import navAction from '../actions/nav.action'
import courseHomeAction from '../actions/courseHome.action'
import multiPeerAction from '../actions/multiPeer.action'
import currCourseAction from '../actions/currCourse.action'
// import quizAction from '../actions/quiz.action'
import getSelfInfo from '../submodule/react-native-multipeer/utils/getSelfInfo.util'

const navigationMiddleware = createReactNavigationReduxMiddleware(
  'root',
  state => state.nav,
)

const asyncFunctionMiddleware = ({ dispatch, getState }) => (
  next => (
    (action) => {
      if (typeof action.payload === 'function') {
        return action.payload(dispatch, getState)
      }
      return next(action)
    }
  )
)

const invitationMiddleware = ({ dispatch, getState }) => (
  next => (
    (action) => {
      // when a teacher found students, add the students into Peers
      const { profile, currCourse, multiPeer } = getState()
      if (action.type === 'multiPeer/common/updatePeerStatus') {
        const { peerStatus, change } = action.payload
        // change: 'found', 'lost'
        if (
          profile.isTeacher &&
          change === 'found' &&
          currCourse !== undefined &&
          (multiPeer.isReleasing || peerStatus.currCourse.courseId === currCourse.courseId)
        ) {
          dispatch(multiPeerAction.backend.invite(peerStatus.currPeerId, true, getSelfInfo({ profile, currCourse, multiPeer })))
        }
      } else if (action.type === 'multiPeer/common/updateOwnStatus') {
        const peersFound = Object.entries(multiPeer.peersStatus).filter(e => !e[1].connected).map(e => e[1])
        switch (action.payload) {
        case 'RELEASE':
        case 'START_RELEASE':
          peersFound.forEach((peerStatus) => {
            dispatch(multiPeerAction.backend.invite(peerStatus.currPeerId, true, getSelfInfo({ profile, currCourse, multiPeer })))
          })
          break
        case 'STOP_RELEASE':
          peersFound.forEach((peerStatus) => {
            dispatch(multiPeerAction.backend.invite(peerStatus.currPeerId, false, getSelfInfo({ profile, currCourse, multiPeer })))
          })
          break
        case 'STOP_ADVERTISE':
          peersFound.forEach((peerStatus) => {
            dispatch(multiPeerAction.backend.onPeerLost(peerStatus.currPeerId))
          })
          break
        default:
          break
        }
      }
      return next(action)
    }
  )
)

const messageMiddleware = ({ dispatch, getState }) => (
  next => (
    (action) => {
      if (action.type === 'multiPeer/backend/onDataReceived') {
        let courseData
        let newCourseData
        let currCourseData
        let dataToSave
        let dataToSend
        let quizHistory
        let senderEntry
        const { data, senderPeerId } = action.payload
        const state = getState()

        switch (data.messageType) {
        case 'CHOSEN_ONE':
          // dispatch(drawLotsAction.setChosen(data.textPop))
          if (state.currentRouteName === 'CourseHome') {
            dispatch(courseHomeAction.alert({
              title: '您被老師抽到要',
              message: data.textPop,
              okLabel: 'OK',
              okCallback: () => { dispatch(courseHomeAction.cancelAlert()) },
            }))
          } else {
            Alert.alert('您被老師抽到要', data.textPop, [{ text: 'OK' }])
          }
          break
        case 'QUESTION_DEBUT':
          senderEntry = Object.entries(state.multiPeer.peersStatus).find(e => e[1].currPeerId === senderPeerId)
          if (senderEntry === undefined) {
            break
          }
          dataToSave = { ...data, senderUserId: senderEntry[0], answerState: 'unAnswered' }
          courseData = state.courseMenu.courseList.find(item => item.courseId === data.courseId)
          courseData.studentQuizHistory.push(dataToSave)
          dispatch(courseMenuAction.courseList.modify(courseData))
          Alert.alert(
            data.releaseTime,
            data.questionType,
            [
              {
                text: '前往答題',
                onPress: () => {
                  switch (data.questionType) {
                  case '單選題':
                    dispatch(navAction.singleAnswerPage(dataToSave))
                    break
                  case '多選題':
                    dispatch(navAction.multiAnswerPage(dataToSave))
                    break
                  case '是非題':
                    dispatch(navAction.trueFalseAnswerPage(dataToSave))
                    break
                  case '簡答題':
                    dispatch(navAction.shortDescriptionAnswerPage(dataToSave))
                    break
                  default:
                  }
                },
              },
              { text: '收到' },
            ],
          )
          break
        case 'ANSWER_BACK':
          dataToSend = { messageType: 'ACK_BACK', questionID: data.questionID, courseId: data.courseId }
          dispatch(multiPeerAction.backend.sendData([senderPeerId], dataToSend))
          courseData = state.courseMenu.courseList.find(it => it.courseId === data.courseId)
          dataToSave = courseData.quizHistory.find(it => it.questionID === data.questionID)
          senderEntry = Object.entries(state.multiPeer.peersStatus).find(e => e[1].currPeerId === senderPeerId)
          if (state.currentRouteName === 'CourseHome') {
            dispatch(courseHomeAction.alert({
              title: `學生作答：${dataToSave.questionType}`,
              message: `來自 ${state.multiPeer.peersInfo[senderEntry[0]].username} 的回答`,
              okLabel: '收到',
              okCallback: () => { dispatch(courseHomeAction.cancelAlert()) },
            }))
          } else {
            Alert.alert(
              `學生作答：${dataToSave.questionType}`,
              `\n來自 ${state.multiPeer.peersInfo[senderEntry[0]].username} 的回答`,
              [{ text: '收到' }],
            )
          }

          dataToSave.studentAnswers.push({
            studentName: state.multiPeer.peersInfo[senderEntry[0]].username,
            answer: data.answer,
          })
          courseData.quizHistory[courseData.quizHistory.findIndex(it => it.questionID === data.questionID)] = dataToSave
          dispatch(courseMenuAction.courseList.modify(courseData))
          dispatch(currCourseAction.setQuizHistory(courseData.quizHistory))
          if (state.currentRouteName === 'HistoryRecord') {
            dispatch(navAction.reloadPage({
              routeName: 'HistoryRecord',
              currCourse: courseData,
            }))
          }
          break
        case 'ACK_BACK':
          courseData = state.courseMenu.courseList.find(item => item.courseId === data.courseId)
          dataToSave = courseData.studentQuizHistory.findIndex(it => it.questionID === data.questionID)
          courseData.studentQuizHistory[dataToSave].answerState = 'Checked'
          dispatch(courseMenuAction.courseList.modify(courseData))
          if (state.currentRouteName === 'QuizHome') {
            dispatch(navAction.reloadPage({
              routeName: 'QuizHome',
              currCourse: courseData,
            }))
          }
          break
        case 'COURSE_INFO_UPDATE':
          courseData = state.courseMenu.courseList.find(item => item.courseId === data.courseId)
          newCourseData = Object.assign({}, courseData, data.newCourseInfo)
          dispatch(courseMenuAction.courseList.modify(newCourseData))
          if (state.currentRouteName === 'CourseHome') {
            dispatch(courseHomeAction.alert({
              title: courseData.title,
              message: '課程資訊已更新',
              okLabel: '收到',
              okCallback: () => { dispatch(courseHomeAction.cancelAlert()) },
            }))
          } else {
            Alert.alert(courseData.title, '課程資訊已更新', [{ text: '收到' }])
          }
          dispatch(navAction.reloadPage({
            routeName: state.currentRouteName,
            currCourse: newCourseData,
          }))
          break
        case 'REQUEST_COURSE_INFO':
          currCourseData = state.currCourse
          if (data.timestamp < currCourseData.timestamp) {
            dataToSend = {
              messageType: 'COURSE_INFO_UPDATE',
              courseId: state.currCourse.courseId,
              newCourseInfo: {
                title: state.currCourse.title,
                classroom: state.currCourse.classroom,
                website: state.currCourse.website,
                year: state.currCourse.year,
                semester: state.currCourse.semester,
                weekday: state.currCourse.weekday,
                time: state.currCourse.time,
                timestamp: state.currCourse.timestamp,
              },
            }
            dispatch(multiPeerAction.backend.sendData([senderPeerId], dataToSend))
          }
          break
        case 'REQUEST_QUIZ_UPDATE':
          currCourseData = state.currCourse
          quizHistory = state.profile.isTeacher ? currCourseData.quizHistory : currCourseData.studentQuizHistory
          if (quizHistory.length > 0 && (data.timestamp === undefined || data.timestamp < quizHistory[quizHistory.length - 1].releaseTime)) {
            dataToSend = {
              messageType: 'RESPONSE_QUIZ_UPDATE',
              courseId: currCourseData.courseId,
              newQuestions: quizHistory
                .filter(q => (data.timestamp === undefined || q.releaseTime > data.timestamp))
                .map((q) => {
                  const {
                    questionID, questionType, questionState, releaseTime,
                  } = { ...q }
                  let options
                  let randIndex
                  let tmpStr
                  switch (questionType) {
                  case '單選題':
                    options = [
                      q.single.rightAns,
                      q.single.wrongAns1,
                      q.single.wrongAns2,
                      q.single.wrongAns3,
                    ]
                    randIndex = Math.floor(Math.random() * Math.floor(4))
                    tmpStr = options[randIndex]
                    options[randIndex] = q.single.rightAns
                    options[0] = tmpStr
                    break
                  case '多選題':
                    options = [
                      q.multi.ans1State,
                      q.multi.ans2State,
                      q.multi.ans3State,
                      q.multi.ans4State,
                      q.multi.ans5State,
                    ]
                    break
                  default:
                    options = []
                    break
                  }
                  return {
                    courseId: currCourseData.courseId, questionID, questionType, questionState, releaseTime, options,
                  }
                }),
            }
            dispatch(multiPeerAction.backend.sendData([senderPeerId], dataToSend))
          }
          break
        case 'RESPONSE_QUIZ_UPDATE':
          courseData = state.courseMenu.courseList.find(item => item.courseId === data.courseId)
          senderEntry = Object.entries(state.multiPeer.peersStatus).find(e => e[1].currPeerId === senderPeerId)
          if (senderEntry === undefined) {
            break
          }
          data.newQuestions.forEach((q) => {
            courseData.studentQuizHistory.push({ ...q, senderUserId: senderEntry[0], answerState: 'unAnswered' })
          })
          if (state.currentRouteName === 'CourseHome') {
            dispatch(courseHomeAction.alert({
              title: '隨堂測驗',
              message: '測驗題目已更新',
              okLabel: '了解',
              okCallback: () => { dispatch(courseHomeAction.cancelAlert()) },
            }))
          } else {
            Alert.alert('隨堂測驗', '測驗題目已更新', [{ text: '了解' }])
          }
          if (state.currentRouteName === 'QuizHome') {
            dispatch(navAction.reloadPage({
              routeName: 'QuizHome',
              currCourse: courseData,
            }))
          }
          break
        default:
          break
        }
      }
      return next(action)
    }
  )
)

export default [navigationMiddleware, asyncFunctionMiddleware, invitationMiddleware, messageMiddleware]
