import { createActions } from 'redux-actions'
import CourseItemData from '../components/CourseItemData'

/*  if you call nav.openDrawer()
    the returned action will be
    {
      type: 'nav/openDrawer',
      payload: null,
    }

*/

const { nav } = createActions({
  nav: {
    openDrawer: () => null,
    closeDrawer: () => null,
    editProfile: () => null,
    classMenu: () => null,
    course: () => null,
    channels: () => null,
    searchPage: () => null,
    addNewCourse: () => null,
    onlinePeerList: () => null,
    course: () => null,
    enterFeature: id => CourseItemData[id].routeName,
  },
})

export default nav
