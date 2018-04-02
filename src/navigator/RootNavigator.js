import { DrawerNavigator, SwitchNavigator } from 'react-navigation'
import Login from '../pages/Login'
import Home from '../pages/Home'
import EditProfile from '../pages/EditProfile'
import Channels from '../pages/Channels'
import DrawerContainer from '../pages/DrawerContainer'

export default SwitchNavigator({
  Login: {
    screen: Login,
  },
  Pages: DrawerNavigator({
    EditProfile: {
      screen: EditProfile, // Page for 修改個人資料
    },
    Channels: {
      screen: Channels, // Page for 切換頻道
    },
    Home: {
      screen: Home,
    },
  }, {
    contentComponent: DrawerContainer,
    drawerWidth: 300,
    drawerPosition: 'left',
  }),
}, {
  initialRouteName: 'Login',
})
