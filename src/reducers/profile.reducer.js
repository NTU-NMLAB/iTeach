import { NavigationActions } from 'react-navigation'
import RootNavigator from '../navigator/RootNavigator'

const initialState = {
  isTeacher: false,
  username: '',
  email: '',
}

const reducerMap = {
  set: (state, action) => {
    if (action.payload) {
      const nav = RootNavigator.router.getStateForAction(NavigationActions.navigate({ routeName: 'ClassMenu' }), state.nav)
      return { ...state, nav, profile: action.payload }
    }
    return state
  },
}

export default { initialState, reducerMap }
