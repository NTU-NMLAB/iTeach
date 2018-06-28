const initialState = {
  currCourse: null,
}

const reducerMap = {
  setData: (state, action) => ({ ...state, currCourse: { ...action.payload } }),
}

export default { reducerMap, initialState }
