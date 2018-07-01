import {
  AsyncStorage,
  Alert,
} from 'react-native'
import { createActions } from 'redux-actions'
import navAction from './nav.action'

/*  In order to create an action with createActions
    you may call profile.set(data)
    the returned action will be in the following format:
    {
      type: 'profile/set',
      payload: data
    }
*/

const { profile } = createActions({
  profile: {
    // set data to store
    // do not call this function directedly
    set: profileData => profileData,

    // save data to storage
    save: profileData => (async (dispatch) => {
      let success = false
      await AsyncStorage.setItem('iTeachStore:Profile', JSON.stringify(profileData), (error) => {
        if (error) {
          Alert.alert(
            '註冊錯誤',
            [{ text: 'OK' }],
          )
        } else {
          success = true
        }
      })
      if (success) {
        dispatch(profile.set(profileData))
      }
    }),

    // get data from storage
    init: () => (async (dispatch) => {
      const profileData = JSON.parse(await AsyncStorage.getItem('iTeachStore:Profile'))
      if (profileData) {
        dispatch(profile.set(profileData))
        dispatch(navAction.courseMenu())
      } else {
        dispatch(navAction.registerPage())
      }
    }),
  },
})

export default profile
