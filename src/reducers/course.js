import { NavigationActions } from 'react-navigation'
import RootNavigator from '../navigator/RootNavigator'

const initialState = {
  courseName: '',
}

const reducerMap = {
  set: (state, action) => {
    if (action.payload) {
      const nav = RootNavigator.router.getStateForAction(NavigationActions.navigate({ routeName: 'Course' }), state.nav)
      return { ...state, nav, course: action.payload }
    }
    return state
  },
}

export default { reducerMap, initialState }
