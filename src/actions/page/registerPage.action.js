import { createActions } from 'redux-actions'
import profileAction from '../profile.action'
import navAction from '../nav.action'


const { registerPage } = createActions({
  registerPage: {
    confirm: profileData => (dispatch) => {
      dispatch(profileAction.save(profileData))
      dispatch(navAction.courseMenu())
    },
  },
})

export default registerPage
