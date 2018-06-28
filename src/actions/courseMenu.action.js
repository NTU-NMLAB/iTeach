import {
  AsyncStorage,
  Alert,
} from 'react-native'
import { createActions } from 'redux-actions'
import navAction from '../actions/nav.action'
import currCourseAction from './currCourse.action'

const { courseMenu } = createActions({
  courseMenu: {
    classList: {
      set: classList => classList,
      add: classItem => (async (dispatch, getState) => {
        let success = false
        const { classList } = getState().courseMenu
        classList.splice(0, 0, { ...classItem, quizHistory: [] })
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
          dispatch(courseMenu.classList.set(classList))
          dispatch(navAction.courseMenu())
        }
      }),
      get: () => (async (dispatch) => {
        const classList = JSON.parse(await AsyncStorage.getItem('iTeachStore:Class'))
        if (classList) {
          if (classList.length > 0) {
            dispatch(courseMenu.classList.set(classList))
          }
        }
      }),
      modify: courseData => (async (dispatch, getState) => {
        let success = false
        let { classList } = getState().courseMenu
        classList = classList.filter(item => item.courseId !== courseData.courseId)
        classList.splice(0, 0, courseData)
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
          dispatch(courseMenu.classList.set(classList))
          if (getState().currCourse.courseId === courseData.courseId) {
            dispatch(currCourseAction.setData(courseData))
          }
        }
      }),
      delete: courseId => (async (dispatch, getState) => {
        let success = false
        let { classList } = getState().courseMenu
        classList = classList.filter(item => item.courseId !== courseId)
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
          dispatch(courseMenu.classList.set(classList))
        }
      }),
    },
  },
})

export default courseMenu
