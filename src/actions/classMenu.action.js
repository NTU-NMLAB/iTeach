import {
  AsyncStorage,
  Alert,
} from 'react-native'
import { createActions } from 'redux-actions'
import navAction from '../actions/nav.action'

const { classMenu } = createActions({
  classMenu: {
    classList: {
      set: classList => classList,
      add: classItem => (async (dispatch, getState) => {
        let success = false
        const { classList } = getState().classMenu
        classList.splice(0, 0, classItem)
        await AsyncStorage.setItem('iTeachStore:Class', JSON.stringify(classList), (error) => {
          if (error) {
            Alert.alert(
              '課程更新錯誤',
              [{ text: 'OK' }],
            )
          } else {
            success = true
          }
        })
        if (success) {
          dispatch(classMenu.classList.set(classList))
          dispatch(navAction.classMenu())
        }
      }),
      get: () => (async (dispatch) => {
        const classList = JSON.parse(await AsyncStorage.getItem('iTeachStore:Class'))
        if (classList) {
          if (classList.length > 0) {
            dispatch(classMenu.classList.set(classList))
          }
        }
      }),
      modify: classItem => (async (dispatch, getState) => {
        let success = false
        let { classList } = getState().classMenu
        classList = classList.filter(item => item.title !== classItem.title)
        classList.splice(0, 0, classItem)
        await AsyncStorage.setItem('iTeachStore:Class', JSON.stringify(classList), (error) => {
          if (error) {
            Alert.alert(
              '課程更新錯誤',
              [{ text: 'OK' }],
            )
          } else {
            success = true
          }
        })
        if (success) {
          dispatch(classMenu.classList.set(classList))
        }
      }),
      delete: title => (async (dispatch, getState) => {
        let success = false
        let { classList } = getState().classMenu
        classList = classList.filter(item => item.title !== title)
        await AsyncStorage.setItem('iTeachStore:Class', JSON.stringify(classList), (error) => {
          if (error) {
            Alert.alert(
              '課程更新錯誤',
              [{ text: 'OK' }],
            )
          } else {
            success = true
          }
        })
        if (success) {
          dispatch(classMenu.classList.set(classList))
        }
      }),
    },
  },
})

export default classMenu
