import {
  AsyncStorage,
  Alert,
} from 'react-native'
import { createActions } from 'redux-actions'
import classMenuAction from './classMenu.action'
import courseAction from './course.action'

const { addCourse } = createActions({
  addCourse: {
    // save data to storage and update state
    save: courseData => (async (dispatch) => {
      const courseDataToSave = { ...courseData }
      courseDataToSave.quizHistory = []

      let success = false
      await AsyncStorage.setItem('iTeachStore:Course', JSON.stringify(courseDataToSave), (error) => {
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
        // dispatch(courseInfo.set(courseDataToSave))
        dispatch(classMenuAction.classList.add(courseDataToSave))
      }
    }),
    update: (courseData, title) => (async (dispatch) => {
      // title is the title before change
      // new title is courseData.title
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
        dispatch(courseAction.setName(courseData.title))
        dispatch(classMenuAction.classList.modify(courseData, title))
      }
    }),
  },
})

export default addCourse
