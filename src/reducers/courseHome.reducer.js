import CourseItemData from '../components/CourseItemData.const'

const initialState = {
  items: CourseItemData.map(item => (
    Array.isArray(item.title) ?
      {
        ...item,
        title: item.title[0],
        imgSrc: item.imgSrc[0],
        isOn: false,
      } :
      item
  )),
  alertInfo: null,
}

const reducerMap = {
  toggleItem: (state, action) => {
    const oriItem = CourseItemData[action.payload]
    const stateItem = state.courseHome.items[action.payload]
    if (Array.isArray(oriItem.title)) {
      const newStateItem = {
        ...stateItem,
        title: stateItem.isOn ? oriItem.title[0] : oriItem.title[1],
        imgSrc: stateItem.isOn ? oriItem.imgSrc[0] : oriItem.imgSrc[1],
        isOn: !stateItem.isOn,
      }
      return {
        ...state,
        courseHome: {
          ...state.courseHome,
          items: [
            ...state.courseHome.items.slice(0, action.payload),
            newStateItem,
            ...state.courseHome.items.slice(action.payload + 1),
          ],
        },
      }
    }
    return state
  },
  alert: (state, action) => ({
    ...state,
    courseHome: {
      ...state.courseHome,
      alertInfo: action.payload,
    },
  }),
  cancelAlert: state => ({
    ...state,
    courseHome: {
      ...state.courseHome,
      alertInfo: null,
    },
  }),
}

export default { reducerMap, initialState }
