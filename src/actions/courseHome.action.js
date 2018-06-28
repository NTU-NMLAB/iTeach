import { createActions } from 'redux-actions'
import navAction from './nav.action'
import multiPeerAction from './multiPeer.action'
import drawLotsAction from './drawLots.action'

const { courseHome } = createActions({
  courseHome: {
    setName: id => id,
    exit: () => (dispatch, getState) => {
      const { profile } = getState()
      const { items } = getState().courseHome
      if (profile.isTeacher && items[1].onclick) {
        dispatch(courseHome.setName(1))
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
        if (profile.isTeacher) {
          if (items[1].onclick) {
            dispatch(multiPeerAction.teacher.stopRelease())
          } else {
            dispatch(multiPeerAction.teacher.startRelease())
          }
        }
        break
      case 5:
        if (typeof multiPeer.courses[currCourse.courseId] === 'undefined') {
          dispatch(drawLotsAction.setNoStudent())
          return
        }
        break
      default:
      }
      dispatch(courseHome.setName(id))
      dispatch(navAction.enterFeature(id))
    },
    handleNoStudent: () => (dispatch) => {
      dispatch(drawLotsAction.handleNoStudent())
    },
  },
})

export default courseHome
