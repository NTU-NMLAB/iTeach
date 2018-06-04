const initialState = {
  drawCount: '1',
  drawAction: '',
  assignedAction: '',
  afterDraw: false,
  actionAllSpace: false,
  countTooLarge: false,
  noStudent: false,
  chosen: 0,
}

const reducerMap = {
  initialize: state => ({
    ...state,
    drawLots: {
      drawCount: '1',
      drawAction: '',
      assignedAction: '',
      afterDraw: false,
      actionAllSpace: false,
      countTooLarge: false,
      noStudent: false,
      chosen: 0,
    },
  }),
  setDrawCount: (state, action) => {
    const { multiPeer, drawLots, course } = state
    const { payload } = action
    const countTooLarge = (payload > Object.keys(multiPeer.courses[course.courseName]).length)
    const drawCount = ((countTooLarge) ? drawLots.drawCount : payload)

    return ({
      ...state,
      drawLots: {
        ...drawLots,
        drawCount,
        countTooLarge,
      },
    })
  },
  setDrawAction: (state, action) => ({
    ...state,
    drawLots: {
      ...state.drawLots,
      drawAction: action.payload,
    },
  }),
  setNoStudent: state => ({
    ...state,
    drawLots: {
      ...state.drawLots,
      noStudent: true,
    },
  }),
  setChosen: (state, action) => ({
    ...state,
    drawLots: {
      ...state.drawLots,
      assignedAction: action.payload,
      chosen: 1,
    },
  }),
  handleCountTooLarge: state => ({
    ...state,
    drawLots: {
      ...state.drawLots,
      countTooLarge: false,
    },
  }),
  handleActionAllSpace: state => ({
    ...state,
    drawLots: {
      ...state.drawLots,
      actionAllSpace: false,
    },
  }),
  handleNoStudent: state => ({
    ...state,
    drawLots: {
      ...state.drawLots,
      noStudent: false,
    },
  }),
  handleChosen: state => ({
    ...state,
    drawLots: {
      ...state.drawLots,
      chosen: 2,
    },
  }),
}

export default { reducerMap, initialState }
