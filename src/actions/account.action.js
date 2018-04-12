import {
  AsyncStorage,
  Alert,
} from 'react-native'
import { createActions } from 'redux-actions'
import initCompleteAction from './initComplete.action'

const { account } = createActions({
  account: {
    set: accountData => accountData,
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
    get: () => (async (dispatch) => {
      const accountData = JSON.parse(await AsyncStorage.getItem('iTeachStore:Account'))
      dispatch(account.set(accountData))
      dispatch(initCompleteAction())
    }),
  },
})

export default account
