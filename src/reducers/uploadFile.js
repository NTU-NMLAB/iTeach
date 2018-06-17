const initialState = {
  fileDesc: '',
}

const reducerMap = {
  initialize: state => ({
    ...state,
    uploadFile: {
      fileDesc: '',
    },
  }),
}

export default { reducerMap, initialState }
