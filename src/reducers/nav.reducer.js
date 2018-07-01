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
    currentRouteName: 'EditProfile',
  }),
  courseMenu: state => ({
    ...state,
    nav: RootNavigator.router.getStateForAction(NavigationActions.navigate({ routeName: 'CourseMenu' }), state.nav),
    currentRouteName: 'CourseMenu',
  }),
  courseHome: state => ({
    ...state,
    nav: RootNavigator.router.getStateForAction(NavigationActions.navigate({ routeName: 'CourseHome', params: { currCourseData: state.currCourse } }), state.nav),
    currentRouteName: 'CourseHome',
  }),
  courseSearch: state => ({
    ...state,
    nav: RootNavigator.router.getStateForAction(NavigationActions.navigate({ routeName: 'CourseSearch' }), state.nav),
    currentRouteName: 'CourseSearch',
  }),
  addCourse: state => ({
    ...state,
    nav: RootNavigator.router.getStateForAction(NavigationActions.navigate({ routeName: 'AddCourse' }), state.nav),
    currentRouteName: 'AddCourse',
  }),
  editCourseInfo: state => ({
    ...state,
    nav: RootNavigator.router.getStateForAction(NavigationActions.navigate({ routeName: 'EditCourseInfo', params: { currCourseData: state.currCourse } }), state.nav),
    currentRouteName: 'EditCourseInfo',
  }),
  onlinePeerList: state => ({
    ...state,
    nav: RootNavigator.router.getStateForAction(NavigationActions.navigate({ routeName: 'OnlinePeerList', params: { currCourseData: state.currCourse } }), state.nav),
    currentRouteName: 'OnlinePeerList',
  }),
  quizMainPage: state => ({
    ...state,
    nav: RootNavigator.router.getStateForAction(NavigationActions.navigate({ routeName: 'QuizHome', params: { currCourseData: state.currCourse } }), state.nav),
    currentRouteName: 'QuizHome',
  }),
  quizResultPage: (state, action) => ({
    ...state,
    nav: RootNavigator.router.getStateForAction(NavigationActions.navigate({ routeName: 'QuestionResult', params: { currQuestion: action.payload } }), state.nav),
    currentRouteName: 'QuestionResult',
  }),
  historyRecord: state => ({
    ...state,
    nav: RootNavigator.router.getStateForAction(NavigationActions.navigate({ routeName: 'HistoryRecord', params: { currCourseData: state.currCourse } }), state.nav),
    currentRouteName: 'HistoryRecord',
  }),
  singleAnswerPage: (state, action) => ({
    ...state,
    nav: RootNavigator.router.getStateForAction(NavigationActions.navigate({ routeName: 'SingleAnswerPage', params: { quizData: action.payload } }), state.nav),
    currentRouteName: 'SingleAnswerPage',
  }),
  multiAnswerPage: (state, action) => ({
    ...state,
    nav: RootNavigator.router.getStateForAction(NavigationActions.navigate({ routeName: 'MultiAnswerPage', params: { quizData: action.payload, currCourseData: state.currCourse } }), state.nav),
    currentRouteName: 'MultiAnswerPage',
  }),
  trueFalseAnswerPage: (state, action) => ({
    ...state,
    nav: RootNavigator.router.getStateForAction(NavigationActions.navigate({ routeName: 'TrueFalseAnswerPage', params: { quizData: action.payload, currCourseData: state.currCourse } }), state.nav),
    currentRouteName: 'TrueFalseAnswerPage',
  }),
  shortDescriptionAnswerPage: (state, action) => ({
    ...state,
    nav: RootNavigator.router.getStateForAction(NavigationActions.navigate({ routeName: 'ShortDescriptionAnswerPage', params: { quizData: action.payload, currCourseData: state.currCourse } }), state.nav),
    currentRouteName: 'ShortDescriptionAnswerPage',
  }),
  enterFeature: (state, action) => {
    const nav = RootNavigator.router.getStateForAction(
      NavigationActions.navigate({ routeName: action.payload, params: { currCourseData: state.currCourse } }),
      state.nav,
    )
    return { ...state, nav, currentRouteName: action.payload }
  },
  draw: (state, action) => {
    const actionAllSpace = (action.payload === '')
    const drawAction = ((actionAllSpace) ? state.drawLots.drawAction : action.payload)
    const nav = ((actionAllSpace)
      ? state.nav
      : RootNavigator.router.getStateForAction(NavigationActions.navigate({ routeName: 'DrawFinish', params: { currCourseData: state.currCourse } }), state.nav)
    )

    return {
      ...state,
      nav,
      drawLots: {
        ...state.drawLots,
        drawAction,
        actionAllSpace,
      },
      currentRouteName: 'DrawFinish',
    }
  },
  backToDraw: state => ({
    ...state,
    nav: RootNavigator.router.getStateForAction(NavigationActions.navigate({ routeName: 'DrawLots', params: { currCourseData: state.currCourse } }), state.nav),
    drawLots: {
      ...state.drawLots,
      afterDraw: true,
    },
    currentRouteName: 'DrawLots',
  }),
  questionCreate: (state, action) => {
    const nav = RootNavigator.router.getStateForAction(
      NavigationActions.navigate({
        routeName: 'QuestionCreate',
        params: {
          quizItemId: action.payload.quizItemId,
          quizData: action.payload.quizData,
          currCourseData: state.currCourse,
        },
      }),
      state.nav,
    )
    return { ...state, nav, currentRouteName: 'QuestionCreate' }
  },
  reloadPage: (state, action) => {
    const nav = RootNavigator.router.getStateForAction(
      NavigationActions.navigate({
        routeName: action.payload.routeName,
        params: {
          currCourseData: action.payload.currCourse,
        },
      }),
      state.nav,
    )
    return {
      ...state,
      nav,
      currCourse: action.payload.currCourse,
    }
  },
}

export default { initialState, reducerMap }
