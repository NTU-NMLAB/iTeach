const initialState = {
  courseList: [],
}

const reducerMap = {
  courseList: {
    set: (state, action) => {
      if (action.payload) {
        return {
          ...state,
          courseMenu: {
            ...state.courseMenu,
            courseList: action.payload,
          },
        }
      }
      return state
    },
  },
}

export default { reducerMap, initialState }
