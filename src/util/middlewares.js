import { Alert } from 'react-native'
import { createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers'
// import drawLotsAction from '../actions/drawLots.action'
// import Background fro../components/Background.componentund'
import courseMenuAction from '../actions/courseMenu.action'
import navAction from '../actions/nav.action'
import multiPeerAction from '../actions/multiPeer.action'
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
        let dataToSave
        let dataToSend
        const { data, senderId } = action.payload

        switch (data.messageType) {
        case 'CHOSEN_ONE':
          // dispatch(drawLotsAction.setChosen(data.textPop))
          Alert.alert(
            '您被老師抽到要',
            data.textPop,
            [{ text: 'OK' }],
          )
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
          Alert.alert(
            dataToSave.questionType,
            `Quiz: ${dataToSave.questionState}\n\nAns: ${JSON.stringify(data.answer)}`,
            [{ text: `from: ${getState().multiPeer.peers[senderId].info.username}` }],
          )
          dataToSave.studentAnswers.push({
            studentName: getState().multiPeer.peers[senderId].info.username,
            answer: data.answer,
          })
          courseData.quizHistory[courseData.quizHistory.findIndex(it => it.questionID === data.questionID)] = dataToSave
          dispatch(courseMenuAction.courseList.modify(courseData))
          break
        case 'ACK_BACK':
          courseData = getState().courseMenu.courseList.find(item => item.courseId === data.courseId)
          dataToSave = courseData.studentQuizHistory.findIndex(it => it.questionID === data.questionID)
          courseData.studentQuizHistory[dataToSave].answerState = 'Checked'
          dispatch(courseMenuAction.courseList.modify(courseData))
          break
        case 'COURSE_INFO_UPDATE':
          courseData = getState().courseMenu.courseList.find(item => item.courseId === data.courseId)
          newCourseData = Object.assign({}, courseData, data.newCourseInfo)
          dispatch(courseMenuAction.courseList.modify(newCourseData))
          break
        case 'REQUEST_COURSE_INFO':
          if (data.timestamp < getState().currCourse.timestamp) {
            dataToSend = {
              messageType: 'COURSE_INFO_UPDATE',
              courseId: getState().currCourse.courseId,
              newCourseInfo: {
                title: getState().currCourse.title,
                classroom: getState().currCourse.classroom,
                website: getState().currCourse.website,
                year: getState().currCourse.year,
                semester: getState().currCourse.semester,
                weekday: getState().currCourse.weekday,
                time: getState().currCourse.time,
                timestamp: getState().currCourse.timestamp,
              },
            }
            dispatch(multiPeerAction.backend.sendData([senderId], dataToSend))
          }
          break
        default:
        }
      }
      return next(action)
    }
  )
)

export default [navigationMiddleware, asyncFunctionMiddleware, messageMiddleware]
