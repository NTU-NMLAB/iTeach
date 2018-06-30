import { createActions } from 'redux-actions'
import navAction from './nav.action'
import multiPeerAction from './multiPeer.action'

const { courseHome } = createActions({
  courseHome: {
    toggleItem: id => id,
    alert: info => info,
    cancelAlert: () => null,
    exit: () => (dispatch, getState) => {
      const { profile } = getState()
      const { items } = getState().courseHome
      if (profile.isTeacher && items[1].isOn) {
        dispatch(courseHome.toggleItem(1))
        dispatch(multiPeerAction.teacher.stopRelease())
      }
      dispatch(multiPeerAction[profile.isTeacher ? 'teacher' : 'student'].exitCourse())
      dispatch(navAction.courseMenu())
    },
    clickItem: id => (dispatch, getState) => {
      const {
        multiPeer,
        currCourse,
        profile,
      } = getState()
      const { items } = getState().courseHome
      switch (id) {
      case 1:
        if (items[1].onclick) {
          dispatch(multiPeerAction.teacher.stopRelease())
        } else {
          dispatch(multiPeerAction.teacher.startRelease())
        }
        break
      case 2:
        if (!profile.isTeacher) {
          dispatch(multiPeerAction.student.requestCourseInfo())
        }
        break
      case 5:
        if (typeof multiPeer.courses[currCourse.courseId] === 'undefined') {
          dispatch(courseHome.alert({
            title: '警告',
            message: '在線名單沒有任何同學',
            okCallback: () => { dispatch(courseHome.cancelAlert()) },
          }))
          return
        }
        break
      default:
      }
      dispatch(courseHome.toggleItem(id))
      dispatch(navAction.enterFeature(id))
    },
  },
})

export default courseHome
