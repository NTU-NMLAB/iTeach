import {Alert} from 'react-native'
import { createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers'

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
      if (typeof action === 'object' && action.type === 'ON_DATA_RECEIVED') {
        switch (action.data.messageType) {
        case 'CHOSEN_ONE':
          Alert.alert(
            'messageType',
            'CHOSEN ONE!',
            [{ text: 'OK' }],
          )
          break
        case 'REQUEST_INFO':
          Alert.alert(
            'messageType',
            'REQUEST!',
            [{ text: 'OK' }],
          )
          break
        case 'RETURN_INFO':
          Alert.alert(
            'messageType',
            'RETURN!',
            [{ text: 'OK' }],
          )
          break
        default:
          Alert.alert(
            'messageType',
            'DEFAULT!',
            [{ text: 'OK' }],
          )
          break
        }
      } else if (action.type === 'multiPeer/backend/onDataReceived') {
        if (action.payload.data.messageType === 'CHOSEN_ONE') {
          Alert.alert(
            '您被老師抽到要',
            action.payload.data.textPop,
            [{ text: 'OK' }],
          )
        }
      }
      /*
      else if (typeof action === 'object' && action.type === 'multiPeer/backend/sendData') {
        const keys = Object.keys(action)
        Alert.alert(
          'action property',
          JSON.stringify(keys),
          [{ text: 'OK' }],
        )
        // action has only 1 property 'type'
        switch (action.data.messageType) {
        case 'CHOSEN_ONE':
          Alert.alert(
            'messageType',
            'CHOSEN ONE!',
            [{ text: 'OK' }],
          )
          break
        default:
          Alert.alert(
            'messageType',
            'DEFAULT!',
            [{ text: 'OK' }],
          )
          break
        }
      }
      */
      /*
      Alert.alert(
        'messageMiddleware',
        JSON.stringify(action),
        [{ text: 'OK' }],
      )
      */
      return next(action)
    }
  )
)

export default [navigationMiddleware, asyncFunctionMiddleware, messageMiddleware]
