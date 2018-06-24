import { createActions } from 'redux-actions'

const { currCourse } = createActions({
  currCourse: {
    setData: courseData => courseData,
  },
})

export default currCourse
