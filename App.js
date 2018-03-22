import { DrawerNavigator, SwitchNavigator } from 'react-navigation'
import Login from './src/pages/Login'
import Home from './src/pages/Home'
import Edit from './src/pages/Edit'
import Channels from './src/pages/Channels'
import DrawerContainer from './src/pages/DrawerContainer'

const App = SwitchNavigator({
  Login: {
    screen: Login,
  },
  Pages: DrawerNavigator(
    {
      Edit: {
        screen: Edit, // Page for 修改個人資料
      },
      Channels: {
        screen: Channels, // Page for 切換頻道
      },
      Home: {
        screen: Home,
      },
    },
    {
      contentComponent: DrawerContainer,
      drawerWidth: 300,
      drawerPosition: 'left',
    },
  ),
})

export default App
