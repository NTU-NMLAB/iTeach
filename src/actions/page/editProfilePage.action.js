import { createActions } from 'redux-actions'
import profileAction from '../profile.action'
import navAction from '../nav.action'


const { editProfilePage } = createActions({
  editProfilePage: {
    confirm: profileData => (dispatch) => {
      dispatch(profileAction.save(profileData))
      dispatch(navAction.courseMenu())
    },
    cancel: () => (dispatch) => {
      dispatch(navAction.courseMenu())
    },
  },
})

export default editProfilePage
