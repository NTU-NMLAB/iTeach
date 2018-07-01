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
        const { data, senderId } = action.payload

        switch (data.messageType) {
        case 'CHOSEN_ONE':
          // dispatch(drawLotsAction.setChosen(data.textPop))
          if (getState().currentRouteName === 'CourseHome') {
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
          dataToSave = { ...data, senderId, answerState: 'unAnswered' }
          courseData = getState().courseMenu.courseList.find(item => item.courseId === data.courseId)
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
          dispatch(multiPeerAction.backend.sendData([senderId], dataToSend))
          courseData = getState().courseMenu.courseList.find(it => it.courseId === data.courseId)
          dataToSave = courseData.quizHistory.find(it => it.questionID === data.questionID)
          if (getState().currentRouteName === 'CourseHome') {
            dispatch(courseHomeAction.alert({
              title: `學生作答：${dataToSave.questionType}`,
              message: `來自 ${getState().multiPeer.peers[senderId].info.username} 的回答`,
              okLabel: '收到',
              okCallback: () => { dispatch(courseHomeAction.cancelAlert()) },
            }))
          } else {
            Alert.alert(
              `學生作答：${dataToSave.questionType}`,
              `\n來自 ${getState().multiPeer.peers[senderId].info.username} 的回答`,
              [{ text: '收到' }],
            )
          }
          dataToSave.studentAnswers.push({
            studentName: getState().multiPeer.peers[senderId].info.username,
            answer: data.answer,
          })
          courseData.quizHistory[courseData.quizHistory.findIndex(it => it.questionID === data.questionID)] = dataToSave
          dispatch(courseMenuAction.courseList.modify(courseData))
          dispatch(currCourseAction.setQuizHistory(courseData.quizHistory))
          if (getState().currentRouteName === 'HistoryRecord') {
            dispatch(navAction.reloadPage({
              routeName: 'HistoryRecord',
              currCourse: courseData,
            }))
          }
          break
        case 'ACK_BACK':
          courseData = getState().courseMenu.courseList.find(item => item.courseId === data.courseId)
          dataToSave = courseData.studentQuizHistory.findIndex(it => it.questionID === data.questionID)
          courseData.studentQuizHistory[dataToSave].answerState = 'Checked'
          dispatch(courseMenuAction.courseList.modify(courseData))
          if (getState().currentRouteName === 'QuizHome') {
            dispatch(navAction.reloadPage({
              routeName: 'QuizHome',
              currCourse: courseData,
            }))
          }
          break
        case 'COURSE_INFO_UPDATE':
          courseData = getState().courseMenu.courseList.find(item => item.courseId === data.courseId)
          newCourseData = Object.assign({}, courseData, data.newCourseInfo)
          dispatch(courseMenuAction.courseList.modify(newCourseData))
          if (getState().currentRouteName === 'CourseHome') {
            dispatch(courseHomeAction.alert({
              title: courseData.title,
              message: '課程資訊已更新',
              okLabel: '收到',
              okCallback: () => { dispatch(courseHomeAction.cancelAlert()) },
            }))
          } else {
            Alert.alert(courseData.title, '課程資訊已更新', [{ text: '收到' }])
          }
          if (getState().currentRouteName === 'CourseInfo') {
            dispatch(navAction.reloadPage({
              routeName: 'CourseInfo',
              currCourse: newCourseData,
            }))
          }
          break
        case 'REQUEST_COURSE_INFO':
          currCourseData = getState().currCourse
          if (data.timestamp < currCourseData.timestamp) {
            dataToSend = {
              messageType: 'COURSE_INFO_UPDATE',
              courseId: currCourseData.courseId,
              newCourseInfo: {
                title: currCourseData.title,
                classroom: currCourseData.classroom,
                website: currCourseData.website,
                year: currCourseData.year,
                semester: currCourseData.semester,
                weekday: currCourseData.weekday,
                time: currCourseData.time,
                timestamp: currCourseData.timestamp,
              },
            }
            dispatch(multiPeerAction.backend.sendData([senderId], dataToSend))
          }
          break
        case 'REQUEST_QUIZ_UPDATE':
          currCourseData = getState().currCourse
          quizHistory = getState().profile.isTeacher ? currCourseData.quizHistory : currCourseData.studentQuizHistory
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
            dispatch(multiPeerAction.backend.sendData([senderId], dataToSend))
          }
          break
        case 'RESPONSE_QUIZ_UPDATE':
          courseData = getState().courseMenu.courseList.find(item => item.courseId === data.courseId)
          data.newQuestions.forEach((q) => {
            courseData.studentQuizHistory.push({ ...q, senderId, answerState: 'unAnswered' })
          })
          if (getState().currentRouteName === 'CourseHome') {
            dispatch(courseHomeAction.alert({
              title: '隨堂測驗',
              message: '測驗題目已更新',
              okLabel: '了解',
              okCallback: () => { dispatch(courseHomeAction.cancelAlert()) },
            }))
          } else {
            Alert.alert('隨堂測驗', '測驗題目已更新', [{ text: '了解' }])
          }
          if (getState().currentRouteName === 'QuizHome') {
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

export default [navigationMiddleware, asyncFunctionMiddleware, messageMiddleware]
