import {
  AsyncStorage,
  Alert,
} from 'react-native'
import { createActions } from 'redux-actions'
import initCompleteAction from './initComplete.action'

const { courseInfo } = createActions({
  courseInfo: {
    // set data to store
    // do not call this function directedly
    set: courseData => courseData,

    // save data to storage
    save: courseData => (async (dispatch) => {
      let success = false
      await AsyncStorage.setItem('iTeachStore:Course', JSON.stringify(courseData), (error) => {
        if (error) {
          Alert.alert(
            '加入課程錯誤',
            [{ text: 'OK' }],
          )
        } else {
          success = true
        }
      })
      if (success) {
        // dispatch(courseInfo.set(courseData))
      }
    }),

    // get data from storage
    get: () => (async (dispatch) => {
      const courseData = JSON.parse(await AsyncStorage.getItem('iTeachStore:Course'))
      dispatch(courseInfo.set(courseData))
      dispatch(initCompleteAction())
    }),
  },
})

export default courseInfo
