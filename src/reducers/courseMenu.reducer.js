const initialState = {
  classList: [],
}

const reducerMap = {
  classList: {
    set: (state, action) => {
      if (action.payload) {
        return {
          ...state,
          courseMenu: {
            ...state.courseMenu,
            classList: action.payload,
          },
        }
      }
      return state
    },
  },
}

export default { reducerMap, initialState }
