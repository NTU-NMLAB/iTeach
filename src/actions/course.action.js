import { createActions } from 'redux-actions'

const { course } = createActions({
  course: {
    setName: title => title,
    setQuizTime: time => time,
  },
})

export default course
