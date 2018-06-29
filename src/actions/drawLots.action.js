import { createActions } from 'redux-actions'

const { drawLots } = createActions({
  drawLots: {
    initialize: () => null,
    setDrawCount: (countIn, courseId) => ({ countIn, courseId }),
    setDrawAction: actionIn => actionIn,
    setChosen: actionIn => actionIn,
    handleCountTooLarge: () => null,
    handleActionAllSpace: () => null,
    handleChosen: () => null,
  },
})

export default drawLots
