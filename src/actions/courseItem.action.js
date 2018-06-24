import { createActions } from 'redux-actions'

const { courseItem } = createActions({
  courseItem: {
    setName: id => id,
  },
})

export default courseItem
