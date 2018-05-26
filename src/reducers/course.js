import { NavigationActions } from 'react-navigation'
import RootNavigator from '../navigator/RootNavigator'

const initialState = {
  courseName: '',
}

const reducerMap = {
  setName: (state, action) => {
    const { index, routes } = state.nav
    if (routes[index].key !== 'Course') {
      const nav = RootNavigator.router.getStateForAction(NavigationActions.navigate({ routeName: 'Course' }), state.nav)
      return { ...state, nav, course: { courseName: action.payload } }
    }
    return { ...state, course: { courseName: action.payload } }
  },
}

export default { reducerMap, initialState }
