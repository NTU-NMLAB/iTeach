import { handleActions } from 'redux-actions'
import nav from './nav'
import course from './course'
import classMenu from './classMenu'
import account from './account'
import RootNavigator from '../navigator/RootNavigator'

const initialState = {
  nav: nav.initialState,
  classMenu: classMenu.initialState,
  course: course.initialState,
  account: account.initialState,
  initComplete: false,
}

const reducerMap = {
  nav: nav.reducerMap,
  course: course.reducerMap,
  classMenu: classMenu.reducerMap,
  account: account.reducerMap,
  initComplete: state => ({ ...state, initComplete: true }),
}

export default (state, action) => {
  let newState = handleActions(reducerMap, initialState)(state, action)
  if (action.type.startsWith('Navigation/')) {
    newState = { ...newState, nav: RootNavigator.router.getStateForAction(action, newState.nav) }
  }
  return newState
}
