import {
  AsyncStorage,
  Alert,
} from 'react-native'
import { createActions } from 'redux-actions'
import classQuizAction from './classQuiz.action'

const { addTrueFalse } = createActions({
  addTrueFalse: {
    save: truefalseData => (async (dispatch) => {
      dispatch(classQuizAction.classList.add(truefalseData))
    }),

  },
})

export default addTrueFalse
