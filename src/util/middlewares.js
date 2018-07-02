import { Alert } from 'react-native'
import { createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers'
// import drawLotsAction from '../actions/drawLots.action'
// import Background from '../components/Background'
import classMenuAction from '../actions/classMenu.action'
import navAction from '../actions/nav.action'
import multiPeerAction from '../actions/multiPeer.action'
import multiPeer from '../actions/multiPeer.action';
// import quizAction from '../actions/quiz.action'
import { AsyncStorage } from 'react-native'

// Get Quiz History from local storage
_retriveQuizHistory = async(state) => {
  const val = JSON.parse(await AsyncStorage.getItem('iTeachStore:Class'))
  if (val) {
    quizHistory = (state.account.status === "teacher")? val[0].quizHistory : val[0].studentQuizHistory
    return quizHistory
  }
}

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
      if (action.type === "multiPeer/backend/onPeerFoundSet"
          && getState().account.status === "student"
          && action.payload.peer.info.identity === "teacher" 
      ){
        data = action.payload
        _retriveQuizHistory(getState()).then((quizHistory) => {
          dataToSend = { 
            messageType: 'CHECK_QUIZ', 
            lastData: (quizHistory.length)? quizHistory[quizHistory.length - 1] : "0"
          }
          dispatch(multiPeerAction.backend.sendData([data.peer], dataToSend))
        })
      }
      if (action.type === 'multiPeer/backend/onDataReceived') {
        let courseData
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
          courseData = getState().classMenu.classList.find(item => item.title === data.courseName)
          courseData.studentQuizHistory.push(dataToSave)
          dispatch(classMenuAction.classList.modify(courseData, data.courseName))
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
          dataToSend = { messageType: 'ACK_BACK', questionID: data.questionID, courseName: data.courseName }
          dispatch(multiPeerAction.backend.sendData([senderId], dataToSend))
          dataToSave = getState().classMenu.classList.find(it => it.title === data.courseName)
          dataToSave = dataToSave.quizHistory.find(it => it.questionID === data.questionID)
          Alert.alert(
            dataToSave.questionType,
            `Quiz: ${dataToSave.questionState}\n\nAns: ${JSON.stringify(data.answer)}`,
            [{ text: `from: ${getState().multiPeer.peers[senderId].info.username}` }],
          )
          break
        case 'ACK_BACK':
          courseData = getState().classMenu.classList.find(it => it.title === data.courseName)
          dataToSave = courseData.studentQuizHistory.findIndex(it => it.questionID === data.questionID)
          courseData.studentQuizHistory[dataToSave].answerState = 'Checked'
          dispatch(classMenuAction.classList.modify(courseData, data.courseName))
          break
        case 'CHECK_QUIZ':
          lastData = data.lastData
          _retriveQuizHistory(getState()).then((quizHistory) => {
            if (quizHistory.length != 0) {
              if (quizHistory[quizHistory.length - 1].questionID != lastData.questionID){
                /*Alert.alert(
                  "Warning",
                  "Detected Async. Question state, resending",
                  [{text: "OK"}]
                )*/
                courseName = getState().course.courseName
                const resendQuizData = {
                  messageType: 'QUESTION_DEBUT',
                  courseName,
                  questionID: quizHistory[quizHistory.length - 1].questionID,
                  questionType: quizHistory[quizHistory.length - 1].questionType,
                  questionState: quizHistory[quizHistory.length - 1].questionState,
                  releaseTime: quizHistory[quizHistory.length - 1].releaseTime
                }
                Alert.alert(
                  "Student didn't receive this question.",
                  JSON.stringify(resendQuizData),
                  [{
                    text : "Resend",
                    onPress: () => {
                      dispatch(multiPeerAction.backend.sendData([senderId], resendQuizData))
                    }
                  }]
                )
              } 
            }
          })
          //break
        default:
        }
      }
      return next(action)
    }
  )
)

export default [navigationMiddleware, asyncFunctionMiddleware, messageMiddleware]
