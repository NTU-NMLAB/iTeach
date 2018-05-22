import {
  AsyncStorage,
  Alert,
} from 'react-native'
import { createActions } from 'redux-actions'
import navAction from '../actions/nav.action'

const { classQuiz } = createActions({
  classQuiz: {
    classList: {
      set: classList => classList,
      add: classItem => (async (dispatch, getState) => {
        const { classList } = getState
        dispatch(classQuiz.classList.set(classList))
        dispatch(navAction.historyRecord())
      }),
    },
  },
})

export default classQuiz
