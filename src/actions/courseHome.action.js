import { createActions } from 'redux-actions'
import navAction from './nav.action'
import multiPeerAction from './multiPeer.action'
import currCourseAction from './currCourse.action'

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
        dispatch(multiPeerAction.common.updateOwnStatus('STOP_RELEASE'))
      }
      dispatch(multiPeerAction[profile.isTeacher ? 'teacher' : 'student'].exitCourse())
      dispatch(navAction.courseMenu())
      dispatch(currCourseAction.setData(null))
    },
    clickItem: id => (dispatch, getState) => {
      const {
        multiPeer,
        profile,
      } = getState()
      const { items } = getState().courseHome
      switch (id) {
      case 1:
        if (items[1].isOn) {
          dispatch(multiPeerAction.common.updateOwnStatus('STOP_RELEASE'))
        } else {
          dispatch(multiPeerAction.common.updateOwnStatus('START_RELEASE'))
        }
        break
      case 2:
        if (!profile.isTeacher) {
          dispatch(multiPeerAction.student.requestCourseInfo())
        }
        break
      case 3:
        if (!profile.isTeacher) {
          dispatch(multiPeerAction.student.requestQuizUpdate())
        }
        break
      case 5:
        if (Object.keys(multiPeer.peersStatus).length === 0) {
          dispatch(courseHome.alert({
            title: '警告',
            message: '在線名單沒有任何同學',
            okLabel: 'OK',
            okCallback: () => { dispatch(courseHome.cancelAlert()) },
          }))
          return
        }
        break
      case 4:
      case 6:
      case 9:
        dispatch(courseHome.alert({
          title: '提示',
          message: '此功能開發中，敬請期待！',
          okLabel: 'OK',
          okCallback: () => { dispatch(courseHome.cancelAlert()) },
        }))
        return
      default:
        break
      }
      dispatch(courseHome.toggleItem(id))
      dispatch(navAction.enterFeature(id))
    },
  },
})

export default courseHome
