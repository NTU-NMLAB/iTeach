import { createActions } from 'redux-actions'

const { courseItem } = createActions({
  courseItem: {
    setName: courseName => courseName,
  },
})

export default courseItem
