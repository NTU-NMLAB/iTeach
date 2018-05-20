import { createActions } from 'redux-actions'

const { course } = createActions({
  course: {
    setName: title => title,
  },
})

export default course
