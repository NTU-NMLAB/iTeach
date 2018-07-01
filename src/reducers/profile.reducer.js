const initialState = {
  isTeacher: false,
  username: '',
  email: '',
}

const reducerMap = {
  set: (state, action) => {
    if (action.payload) {
      return { ...state, profile: action.payload }
    }
    return state
  },
}

export default { initialState, reducerMap }
