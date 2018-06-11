import { NavigationActions } from 'react-navigation'
import RootNavigator from '../navigator/RootNavigator'

const initialState = RootNavigator.router.getStateForAction(RootNavigator.router.getActionForPathAndParams('Login'))

const reducerMap = {
  openDrawer: state => ({
    ...state,
    nav: RootNavigator.router.getStateForAction(NavigationActions.navigate({ routeName: 'DrawerOpen' }), state.nav),
  }),
  closeDrawer: state => ({
    ...state,
    nav: RootNavigator.router.getStateForAction(NavigationActions.navigate({ routeName: 'DrawerClose' }), state.nav),
  }),
  editProfile: state => ({
    ...state,
    nav: RootNavigator.router.getStateForAction(NavigationActions.navigate({ routeName: 'EditProfile' }), state.nav),
  }),
  channels: state => ({
    ...state,
    nav: RootNavigator.router.getStateForAction(NavigationActions.navigate({ routeName: 'Channels' }), state.nav),
  }),
  classMenu: state => ({
    ...state,
    nav: RootNavigator.router.getStateForAction(NavigationActions.navigate({ routeName: 'ClassMenu' }), state.nav),
  }),
  course: state => ({
    ...state,
    nav: RootNavigator.router.getStateForAction(NavigationActions.navigate({ routeName: 'Course' }), state.nav),
  }),
  searchPage: state => ({
    ...state,
    nav: RootNavigator.router.getStateForAction(NavigationActions.navigate({ routeName: 'SearchPage' }), state.nav),
  }),
  addNewCourse: state => ({
    ...state,
    nav: RootNavigator.router.getStateForAction(NavigationActions.navigate({ routeName: 'AddNewCourse' }), state.nav),
  }),
  changeCourseInfo: state => ({
    ...state,
    nav: RootNavigator.router.getStateForAction(NavigationActions.navigate({ routeName: 'ChangeCourseInfo' }), state.nav),
  }),
  onlinePeerList: state => ({
    ...state,
    nav: RootNavigator.router.getStateForAction(NavigationActions.navigate({ routeName: 'OnlinePeerList' }), state.nav),
  }),
  quizMainPage: state => ({
    ...state,
    nav: RootNavigator.router.getStateForAction(NavigationActions.navigate({ routeName: 'Quiz' }), state.nav),
  }),
  quizResultPage: state => ({
    ...state,
    nav: RootNavigator.router.getStateForAction(NavigationActions.navigate({ routeName: 'QuestionResult' }), state.nav),
  }),
  historyRecord: state => ({
    ...state,
    nav: RootNavigator.router.getStateForAction(NavigationActions.navigate({ routeName: 'HistoryRecord' }), state.nav),
  }),
  singleAnswerPage: state => ({
    ...state,
    nav: RootNavigator.router.getStateForAction(NavigationActions.navigate({ routeName: 'SingleAnswerPage' }), state.nav),
  }),
  multiAnswerPage: state => ({
    ...state,
    nav: RootNavigator.router.getStateForAction(NavigationActions.navigate({ routeName: 'MultiAnswerPage' }), state.nav),
  }),
  trueFalseAnswerPage: state => ({
    ...state,
    nav: RootNavigator.router.getStateForAction(NavigationActions.navigate({ routeName: 'TrueFalseAnswerPage' }), state.nav),
  }),
  shortDescriptionAnswerPage: state => ({
    ...state,
    nav: RootNavigator.router.getStateForAction(NavigationActions.navigate({ routeName: 'ShortDescriptionAnswerPage' }), state.nav),
  }),
  enterFeature: (state, action) => {
    const nav = RootNavigator.router.getStateForAction(
      NavigationActions.navigate({ routeName: action.payload }),
      state.nav,
    )
    return { ...state, nav }
  },
  draw: (state, action) => {
    const actionAllSpace = (action.payload === '')
    const drawAction = ((actionAllSpace) ? state.drawLots.drawAction : action.payload)
    const nav = ((actionAllSpace)
      ? state.nav
      : RootNavigator.router.getStateForAction(NavigationActions.navigate({ routeName: 'DrawFinish' }), state.nav)
    )

    return {
      ...state,
      nav,
      drawLots: {
        ...state.drawLots,
        drawAction,
        actionAllSpace,
      },
    }
  },
  backToDraw: state => ({
    ...state,
    nav: RootNavigator.router.getStateForAction(NavigationActions.navigate({ routeName: 'DrawLots' }), state.nav),
    drawLots: {
      ...state.drawLots,
      afterDraw: true,
    },
  }),
  enterQuestion: (state, action) => {
    const nav = RootNavigator.router.getStateForAction(
      NavigationActions.navigate({ routeName: action.payload }),
      state.nav,
    )
    return { ...state, nav }
  },
}

export default { initialState, reducerMap }
