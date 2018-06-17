import { NavigationActions } from 'react-navigation'
import RootNavigator from '../navigator/RootNavigator'

const initialState = {
  courseName: '',
}

const reducerMap = {
  setName: (state, action) => {
    const nav = RootNavigator.router.getStateForAction(NavigationActions.navigate({ routeName: 'Quiz' }), state.nav)
    return { ...state, nav, course: action.payload }
  },
}

export default { reducerMap, initialState }
