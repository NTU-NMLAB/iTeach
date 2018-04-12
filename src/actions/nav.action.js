import { createActions } from 'redux-actions'

const { nav } = createActions({
  nav: {
    openDrawer: () => null,
    closeDrawer: () => null,
    editProfile: () => null,
    classMenu: () => null,
    channels: () => null,
  },
})

export default nav
