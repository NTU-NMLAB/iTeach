import { Alert } from 'react-native'
import { createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers'
import drawLotsAction from '../actions/drawLots.action'
import Background from '../components/Background'

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
        if (data.messageType === 'CHOSEN_ONE') {
          // dispatch(drawLotsAction.setChosen(data.textPop))
          Alert.alert(
            '您被老師抽到要',
            data.textPop,
            [{ text: 'OK' }],
          )
        }
      }
      return next(action)
    }
  )
)

export default [navigationMiddleware, asyncFunctionMiddleware, messageMiddleware]
