import { createActions } from 'redux-actions'

const { currCourse } = createActions({
  currCourse: {
    setData: courseData => courseData,
    setQuizHistory: quizHistory => quizHistory,
  },
})

export default currCourse
