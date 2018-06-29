import CourseItemData from '../components/CourseItemData.component'

const initialState = {
  items: CourseItemData,
  alertInfo: null,
}

const reducerMap = {
  setName: (state, action) => {
    const menu = CourseItemData.filter(item => item.id === action.payload)[0]
    const { onclick } = state.courseHome.items[menu.id]
    const menuState = menu.id === 1 ? [{
      id: menu.id,
      title: menu.title,
      imgSrc: menu.imgSrc,
      user: menu.user,
      onclick: !onclick,
    }] : [{
      id: action.payload,
      title: menu.title,
      imgSrc: menu.imgSrc,
      user: menu.user,
    }]
    const newState = state.courseHome.items.slice(0, action.payload)
      .concat(
        menuState,
        state.courseHome.items.slice(action.payload + 1),
      )

    // if (menu.id === 0) {
    //   const nav = RootNavigator.router.getStateForAction
    // (NavigationActions.navigate({ routeName: 'OnlinePeerList' }), state.nav)
    //   return {
    //     ...state,
    //     nav,
    //     courseHome: {
    //       items: newState,
    //     },
    //   }
    // }

    return {
      ...state,
      courseHome: {
        ...state.courseHome,
        items: newState,
      },
    }
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
