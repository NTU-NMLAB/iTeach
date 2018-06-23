const initialState = {
  fileDesc: '',
}

const reducerMap = {
  initialize: state => ({
    ...state,
    fileUpload: {
      fileDesc: '',
    },
  }),
}

export default { reducerMap, initialState }
