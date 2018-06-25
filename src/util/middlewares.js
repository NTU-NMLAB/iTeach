import { Alert } from 'react-native'
import { createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers'
import MultiPeerActions from '../actions/multiPeer.action'
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
        case 'REQUEST_INFO':
          dispatch(MultiPeerActions.backend.returnInfo(action.senderId, {
            name: getState().multipeer.selfName,
          }))
          break
        case 'RETURN_INFO':
          dispatch(MultiPeerActions.backend.onInfoUpdate(action.senderId, action.data.info))
          break
        case 'CHOSEN_ONE':
          Alert.alert(
            '您被老師抽到要',
            data.textPop,
            [{ text: 'OK' }],
          )
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
