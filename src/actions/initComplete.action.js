import { createActions } from 'redux-actions'
import classMenuAction from './classMenu.action'

const { initComplete } = createActions({
  initComplete: () => (dispatch) => {
    dispatch(classMenuAction.classList.get())
  },
})

export default initComplete
