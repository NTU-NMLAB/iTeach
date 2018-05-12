import { createActions } from 'redux-actions'

const { drawLots } = createActions({
  drawLots: {
    initialize: () => null,
    setDrawCount: countIn => countIn,
    setDrawAction: actionIn => actionIn,
    handleCountTooLarge: () => null,
    handleActionAllSpace: () => null,
  },
})

export default drawLots
