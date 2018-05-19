const initialState = {
  drawCount: '1',
  drawAction: '',
  afterDraw: false,
  actionAllSpace: false,
  countTooLarge: false,
}

const reducerMap = {
  initialize: state => ({
    ...state,
    drawLots: {
      drawCount: '1',
      drawAction: '',
      afterDraw: false,
      actionAllSpace: false,
      countTooLarge: false,
    },
  }),
  setDrawCount: (state, action) => {
    const countTooLarge = (action.payload > 5)
    const drawCount = ((countTooLarge) ? state.drawLots.drawCount : action.payload)

    return ({
      ...state,
      drawLots: {
        ...state.drawLots,
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
}

export default { reducerMap, initialState }
