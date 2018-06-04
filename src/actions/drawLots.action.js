import { createActions } from 'redux-actions'

const { drawLots } = createActions({
  drawLots: {
    initialize: () => null,
    setDrawCount: countIn => countIn,
    setDrawAction: actionIn => actionIn,
    setNoStudent: () => null,
    setChosen: actionIn => actionIn,
    handleCountTooLarge: () => null,
    handleActionAllSpace: () => null,
    handleNoStudent: () => null,
    handleChosen: () => null,
  },
})

export default drawLots
