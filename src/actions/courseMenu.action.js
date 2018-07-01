import {
  AsyncStorage,
  Alert,
} from 'react-native'
import { createActions } from 'redux-actions'
import navAction from '../actions/nav.action'
import currCourseAction from './currCourse.action'

const { courseMenu } = createActions({
  courseMenu: {
    courseList: {
      set: courseList => courseList,
      add: classItem => (async (dispatch, getState) => {
        let success = false
        const { courseList } = getState().courseMenu
        courseList.splice(0, 0, { ...classItem, quizHistory: [], userIds: [] })
        await AsyncStorage.setItem('iTeachStore:Class', JSON.stringify(courseList), (error) => {
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
          dispatch(courseMenu.courseList.set(courseList))
          dispatch(navAction.courseMenu())
        }
      }),
      get: () => (async (dispatch) => {
        const courseList = JSON.parse(await AsyncStorage.getItem('iTeachStore:Class'))
        if (courseList) {
          if (courseList.length > 0) {
            dispatch(courseMenu.courseList.set(courseList))
          }
        }
      }),
      modify: courseData => (async (dispatch, getState) => {
        let success = false
        let { courseList } = getState().courseMenu
        courseList = courseList.filter(item => item.courseId !== courseData.courseId)
        courseList.splice(0, 0, courseData)
        await AsyncStorage.setItem('iTeachStore:Class', JSON.stringify(courseList), (error) => {
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
          dispatch(courseMenu.courseList.set(courseList))
          if (getState().currCourse.courseId === courseData.courseId) {
            dispatch(currCourseAction.setData(courseData))
          }
        }
      }),
      delete: courseId => (async (dispatch, getState) => {
        let success = false
        let { courseList } = getState().courseMenu
        courseList = courseList.filter(item => item.courseId !== courseId)
        await AsyncStorage.setItem('iTeachStore:Class', JSON.stringify(courseList), (error) => {
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
          dispatch(courseMenu.courseList.set(courseList))
        }
      }),
    },
  },
})

export default courseMenu
