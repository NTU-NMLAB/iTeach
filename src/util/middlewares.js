import { Alert } from 'react-native'
import { createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers'
// import drawLotsAction from '../actions/drawLots.action'
// import Background from '../components/Background'

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
          Alert.alert(
            data.releaseTime,
            data.questionType,
            [
              { text: '前往答題', onPress: () => { /* TBD */ } },
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
