import { NavigationActions } from 'react-navigation'
import RootNavigator from '../navigator/RootNavigator'

const initialState = {
  courseName: '',
  quizTime: '',
}

const reducerMap = {
  setName: (state, action) => {
    const nav = RootNavigator.router.getStateForAction(NavigationActions.navigate({ routeName: 'Course' }), state.nav)
    return { ...state, nav, course: { ...state.course, courseName: action.payload } }
  },
  setQuizTime: (state, action) => {
    const nav = RootNavigator.router.getStateForAction(NavigationActions.navigate({ routeName: 'Course' }), state.nav)
    return { ...state, nav, course: { ...state.course, quizTime: action.payload } }
  },

}

export default { reducerMap, initialState }
