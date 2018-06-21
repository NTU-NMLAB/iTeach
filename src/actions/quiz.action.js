import { createActions } from 'redux-actions'

const { quiz } = createActions({
  quiz: {
    catchTeacherACK: questionID => questionID,
  },
})

export default quiz
