const initialState = {
  currCourse: null,
}

const reducerMap = {
  setData: (state, action) => ({ ...state, currCourse: { ...action.payload } }),
  setQuizHistory: (state, action) => ({
    ...state,
    currCourse: {
      ...state.currCourse,
      quizHistory: action.payload,
    },
  }),
}

export default { reducerMap, initialState }
