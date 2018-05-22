import {
  AsyncStorage,
  Alert,
} from 'react-native'
import { createActions } from 'redux-actions'
import classQuizAction from './classQuiz.action'

const { addMulti } = createActions({
  addMulti: {
    save: multiData => (async (dispatch) => {
      dispatch(classQuizAction.classList.add(multiData))
    }),

  },
})

export default addMulti
