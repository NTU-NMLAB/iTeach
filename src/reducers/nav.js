import { NavigationActions } from 'react-navigation'
import RootNavigator from '../navigator/RootNavigator'

const initialState = RootNavigator.router.getStateForAction(RootNavigator.router.getActionForPathAndParams('Register'))

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
  singleAnswerPage: (state, action) => ({
    ...state,
    nav: RootNavigator.router.getStateForAction(NavigationActions.navigate({ routeName: 'SingleAnswerPage', params: { quizData: action.payload } }), state.nav),
  }),
  multiAnswerPage: (state, action) => ({
    ...state,
    nav: RootNavigator.router.getStateForAction(NavigationActions.navigate({ routeName: 'MultiAnswerPage', params: { quizData: action.payload } }), state.nav),
  }),
  trueFalseAnswerPage: (state, action) => ({
    ...state,
    nav: RootNavigator.router.getStateForAction(NavigationActions.navigate({ routeName: 'TrueFalseAnswerPage', params: { quizData: action.payload } }), state.nav),
  }),
  shortDescriptionAnswerPage: (state, action) => ({
    ...state,
    nav: RootNavigator.router.getStateForAction(NavigationActions.navigate({ routeName: 'ShortDescriptionAnswerPage', params: { quizData: action.payload } }), state.nav),
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
