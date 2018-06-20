import { Alert } from 'react-native'
import { createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers'
// import drawLotsAction from '../actions/drawLots.action'
// import Background from '../components/Background'
import classMenuAction from '../actions/classMenu.action'
import navAction from '../actions/nav.action'

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
      let courseData
      if (action.type === 'multiPeer/backend/onDataReceived') {
        const { data } = action.payload
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
          courseData = getState().classMenu.classList.find(item => item.title === data.courseName)
          courseData.studentQuizHistory.push({ ...data, answerState: 'unAnswered' })
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
                    dispatch(navAction.singleAnswerPage(data))
                    break
                  case '多選題':
                    dispatch(navAction.multiAnswerPage(data))
                    break
                  case '是非題':
                    dispatch(navAction.trueFalseAnswerPage(data))
                    break
                  case '簡答題':
                    dispatch(navAction.shortDescriptionAnswerPage(data))
                    break
                  default:
                  }
                },
              },
              { text: '收到' },
            ],
          )
          break
        default:
        }
      }
      return next(action)
    }
  )
)

export default [navigationMiddleware, asyncFunctionMiddleware, messageMiddleware]
