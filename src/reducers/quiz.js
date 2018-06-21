const initialState = {
  teacherACKs: [],
}

const reducerMap = {
  catchTeacherACK: (state, action) => {
    state.quiz.teacherACKs.push(action.payload)
    return state
  },
}

export default { reducerMap, initialState }
