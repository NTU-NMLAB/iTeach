import { createActions } from 'redux-actions'
import CourseItemData from '../components/CourseItemData'
import QuizItemData from '../components/QuizItemData'

/*  if you call nav.openDrawer()
    the returned action will be
    {
      type: 'nav/openDrawer',
      payload: null,
    }

*/

const { nav } = createActions({
  nav: {
    openDrawer: () => null,
    closeDrawer: () => null,
    editProfile: () => null,
    classMenu: () => null,
    course: () => null,
    searchPage: () => null,
    addNewCourse: () => null,
    onlinePeerList: () => null,
    quizMainPage: () => null,
    quizResultPage: () => null,
    enterFeature: id => CourseItemData[id].routeName,
    draw: (actionIn) => {
      if (actionIn === '') return '回答問題'
      return actionIn.trim()
    },
    backToDraw: () => null,
    changeCourseInfo: () => null,
    historyRecord: () => null,
    uploadFile: () => null,
    downloadFile: () => null,
    enterQuestion: id => QuizItemData[id].routeName,
    singleAnswerPage: quizData => quizData,
    multiAnswerPage: quizData => quizData,
    trueFalseAnswerPage: quizData => quizData,
    shortDescriptionAnswerPage: quizData => quizData,
  },
})

export default nav
