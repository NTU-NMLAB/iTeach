const initialState = {
  courseName: '',
}

const reducerMap = {
  setName: (state, action) => ({ ...state, course: { courseName: action.payload } }),
}

export default { reducerMap, initialState }
