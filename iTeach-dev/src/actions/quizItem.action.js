import { createActions } from 'redux-actions'

const { quizItem } = createActions({
  quizItem: {
    setName: courseName => courseName,
  },
})

export default quizItem
