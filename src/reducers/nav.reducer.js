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
  courseHome: state => ({
    ...state,
    nav: RootNavigator.router.getStateForAction(NavigationActions.navigate({ routeName: 'CourseHome', params: { currCourseData: state.currCourse } }), state.nav),
  }),
  courseSearch: state => ({
    ...state,
    nav: RootNavigator.router.getStateForAction(NavigationActions.navigate({ routeName: 'CourseSearch' }), state.nav),
  }),
  addCourse: state => ({
    ...state,
    nav: RootNavigator.router.getStateForAction(NavigationActions.navigate({ routeName: 'AddCourse' }), state.nav),
  }),
  editCourseInfo: state => ({
    ...state,
    nav: RootNavigator.router.getStateForAction(NavigationActions.navigate({ routeName: 'EditCourseInfo', params: { currCourseData: state.currCourse } }), state.nav),
  }),
  onlinePeerList: state => ({
    ...state,
    nav: RootNavigator.router.getStateForAction(NavigationActions.navigate({ routeName: 'OnlinePeerList', params: { currCourseData: state.currCourse } }), state.nav),
  }),
  quizMainPage: state => ({
    ...state,
    nav: RootNavigator.router.getStateForAction(NavigationActions.navigate({ routeName: 'Quiz', params: { currCourseData: state.currCourse } }), state.nav),
  }),
  quizResultPage: state => ({
    ...state,
    nav: RootNavigator.router.getStateForAction(NavigationActions.navigate({ routeName: 'QuestionResult', params: { currCourseData: state.currCourse } }), state.nav),
  }),
  historyRecord: state => ({
    ...state,
    nav: RootNavigator.router.getStateForAction(NavigationActions.navigate({ routeName: 'HistoryRecord', params: { currCourseData: state.currCourse } }), state.nav),
  }),
  singleAnswerPage: (state, action) => ({
    ...state,
    nav: RootNavigator.router.getStateForAction(NavigationActions.navigate({ routeName: 'SingleAnswerPage', params: { quizData: action.payload } }), state.nav),
  }),
  multiAnswerPage: (state, action) => ({
    ...state,
    nav: RootNavigator.router.getStateForAction(NavigationActions.navigate({ routeName: 'MultiAnswerPage', params: { quizData: action.payload, currCourseData: state.currCourse } }), state.nav),
  }),
  trueFalseAnswerPage: (state, action) => ({
    ...state,
    nav: RootNavigator.router.getStateForAction(NavigationActions.navigate({ routeName: 'TrueFalseAnswerPage', params: { quizData: action.payload, currCourseData: state.currCourse } }), state.nav),
  }),
  shortDescriptionAnswerPage: (state, action) => ({
    ...state,
    nav: RootNavigator.router.getStateForAction(NavigationActions.navigate({ routeName: 'ShortDescriptionAnswerPage', params: { quizData: action.payload, currCourseData: state.currCourse } }), state.nav),
  }),
  enterFeature: (state, action) => {
    const nav = RootNavigator.router.getStateForAction(
      NavigationActions.navigate({ routeName: action.payload, params: { currCourseData: state.currCourse } }),
      state.nav,
    )
    return { ...state, nav }
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
    }
  },
  backToDraw: state => ({
    ...state,
    nav: RootNavigator.router.getStateForAction(NavigationActions.navigate({ routeName: 'DrawLots', params: { currCourseData: state.currCourse } }), state.nav),
    drawLots: {
      ...state.drawLots,
      afterDraw: true,
    },
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
    return { ...state, nav }
  },
}

export default { initialState, reducerMap }
