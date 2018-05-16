const initialState = {
  classList: [],
}

const reducerMap = {
  classList: {
    set: (state, action) => {
      if (action.payload) {
        return {
          ...state,
          classMenu: {
            ...state.classMenu,
            classList: action.payload,
          },
        }
      }
      return state
    },
  },
}

export default { reducerMap, initialState }
