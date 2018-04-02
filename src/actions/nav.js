import { NavigationActions } from 'react-navigation'

const nav = {
  openDrawer: () => NavigationActions.navigate({ routeName: 'DrawerOpen' }),
  editProfile: () => NavigationActions.navigate({ routeName: 'EditProfile' }),
}

export default nav
