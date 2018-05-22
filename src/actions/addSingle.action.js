import {
  AsyncStorage,
  Alert,
} from 'react-native'
import { createActions } from 'redux-actions'
import classQuizAction from './classQuiz.action'

const { addSingle } = createActions({
  addSingle: {
    save: singleData => (async (dispatch) => {
      dispatch(classQuizAction.classList.add(singleData))
    }),

  },
})

export default addSingle
