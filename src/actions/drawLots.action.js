import { createActions } from 'redux-actions'

const { drawLots } = createActions({
  drawLots: {
    initialize: () => null,
    setDrawCount: countIn => countIn,
    setDrawAction: actionIn => actionIn,
    draw: (actionIn) => {
      if (actionIn === '') return '回答問題'
      return actionIn.trim()
    },
    handleActionAllSpace: () => null,
  },
})

export default drawLots
