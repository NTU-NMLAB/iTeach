import { handleActions } from 'redux-actions'
import nav from './nav.reducer'
import course from './course.reducer'
import courseItem from './courseItem.reducer'
import classMenu from './classMenu.reducer'
import profile from './profile.reducer'
import RootNavigator from '../navigator/RootNavigator'
import onlinePeerList from './onlinePeerList.reducer'
import multiPeer from '../submodule/react-native-multipeer/reducers/MultiPeer.reducer'
import drawLots from './drawLots.reducer'
import quizItem from './quizItem.reducer'
import quiz from './quiz.reducer'

// define states
const initialState = {
  nav: nav.initialState,
  classMenu: classMenu.initialState,
  course: course.initialState,
  courseItem: courseItem.initialState,
  profile: profile.initialState,
  onlinePeerList: onlinePeerList.initialState,
  multiPeer: multiPeer.initialState,
  drawLots: drawLots.initialState,
  quizItem: quizItem.initialState,
  quiz: quiz.initialState,
  initComplete: false,
}

// define reducers
const reducerMap = {
  nav: nav.reducerMap,
  classMenu: classMenu.reducerMap,
  course: course.reducerMap,
  courseItem: courseItem.reducerMap,
  profile: profile.reducerMap,
  onlinePeerList: onlinePeerList.reducerMap,
  multiPeer: multiPeer.reducerMap,
  drawLots: drawLots.reducerMap,
  quizItem: quizItem.reducerMap,
  quiz: quiz.reducerMap,
  editCourseInfo: state => state,
  initComplete: state => ({ ...state, initComplete: true }),
}

export default (state, action) => {
  // the function handleActions is similar to combineReducers
  let newState = handleActions(reducerMap, initialState)(state, action)
  // solve the navigation problem of react navigation
  if (action.type.startsWith('Navigation/')) {
    newState = { ...newState, nav: RootNavigator.router.getStateForAction(action, newState.nav) }
  }
  return newState
}

