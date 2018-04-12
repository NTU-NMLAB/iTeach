import { createActions } from 'redux-actions'

const { course } = createActions({
  course: {
    set: courseName => courseName,
    get: () => (dispatch, getState) => {
      const courseName = getState().course
      dispatch(course.set(courseName))
    },
    setName: title => dispatch => dispatch(course.set(title)),
  },
})

export default course
