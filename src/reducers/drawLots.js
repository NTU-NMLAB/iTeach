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
  setDrawCount: (state, action) => ({
    ...state,
    drawLots: {
      ...state.drawLots,
      drawCount: action.payload,
    },
  }),
  setDrawAction: (state, action) => ({
    ...state,
    drawLots: {
      ...state.drawLots,
      drawAction: action.payload,
    },
  }),
  draw: (state, action) => {
    if (action.payload === '') {
      return {
        ...state,
        drawLots: {
          ...state.drawLots,
          actionAllSpace: true,
        },
      }
    }
    return {
      ...state,
      drawLots: {
        ...state.drawLots,
        drawAction: action.payload,
        afterDraw: true,
      },
    }
  },
  handleActionAllSpace: state => ({
    ...state,
    drawLots: {
      ...state.drawLots,
      actionAllSpace: false,
    },
  }),
}

export default { reducerMap, initialState }
