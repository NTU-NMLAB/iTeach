import {
  AsyncStorage,
  Alert,
} from 'react-native'
import { createActions } from 'redux-actions'
import initCompleteAction from './initComplete.action'

/*  In order to create an action with createActions
    you may call account.set(data)
    the returned action will be in the following format:
    {
      type: 'account/set',
      payload: data
    }
*/

const { account } = createActions({
  account: {
    // set data to store
    // do not call this function directedly
    set: accountData => accountData,

    // save data to storage
    save: accountData => (async (dispatch) => {
      let success = false
      await AsyncStorage.setItem('iTeachStore:Account', JSON.stringify(accountData), (error) => {
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
        dispatch(account.set(accountData))
      }
    }),

    // get data from storage
    get: () => (async (dispatch) => {
      const accountData = JSON.parse(await AsyncStorage.getItem('iTeachStore:Account'))
      dispatch(account.set(accountData))
      dispatch(initCompleteAction())
    }),
  },
})

export default account
