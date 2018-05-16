import { handleActions } from 'redux-actions'
import nav from './nav'
import course from './course'
import courseItem from './courseItem'
import classMenu from './classMenu'
import account from './account'
import RootNavigator from '../navigator/RootNavigator'
import onlinePeerList from './onlinePeerList'
import drawLots from './drawLots'

// define states
const initialState = {
  nav: nav.initialState,
  classMenu: classMenu.initialState,
  course: course.initialState,
  courseItem: courseItem.initialState,
  account: account.initialState,
  onlinePeerList: onlinePeerList.initialState,
  drawLots: drawLots.initialState,
  initComplete: false,
}

// define reducers
const reducerMap = {
  nav: nav.reducerMap,
  classMenu: classMenu.reducerMap,
  course: course.reducerMap,
  courseItem: courseItem.reducerMap,
  account: account.reducerMap,
  onlinePeerList: onlinePeerList.reducerMap,
  drawLots: drawLots.reducerMap,
  addCourse: state => state,
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

