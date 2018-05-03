import QuizItemData from '../components/QuizItemData'

const initialState = {
  quizItem: QuizItemData,
}

const reducerMap = {
  setName: (state, action) => {
    const menu = QuizItemData.filter(item => item.id === action.payload)[0]
    const menuState = menu.id === 1 ? [{
      id: menu.id,
      title: menu.title,
      imgSrc: menu.imgSrc,
      user: menu.user,
    }] : [{
      id: action.payload,
      title: menu.title,
      imgSrc: menu.imgSrc,
      user: menu.user,
    }]
    const newState = state.quizItem.quizItem.slice(0, action.payload)
      .concat(
        menuState,
        state.quiItem.quizItem.slice(action.payload + 1),
      )
    return {
      ...state,
      quizItem: {
        quizItem: newState,
      },
    }
  },
}

export default { reducerMap, initialState }
