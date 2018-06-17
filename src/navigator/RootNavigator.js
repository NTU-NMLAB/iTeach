import { DrawerNavigator, SwitchNavigator } from 'react-navigation'
import Login from '../pages/Login'
import Course from '../pages/Course'
import ClassMenu from '../pages/ClassMenu'
import EditProfile from '../pages/EditProfile'
import Channels from '../pages/Channels'
import DrawerContainer from '../pages/DrawerContainer'
import SearchPage from '../pages/SearchPage'
import AddNewCourse from '../pages/AddNewCourse'
import OnlinePeerList from '../pages/OnlinePeerList'
import CourseInfo from '../pages/CourseInfo'
import DrawLots from '../pages/DrawLots'
import DrawFinish from '../pages/DrawLotsFinish'
import Quiz from '../pages/Quiz/Quiz'
import SingleResult from '../pages/Quiz/SingleResult'
import MultiResult from '../pages/Quiz/MultiResult'
import TrueFalseResult from '../pages/Quiz/TrueFalseResult'
import Single from '../pages/Quiz/Single'
import Multi from '../pages/Quiz/Multi'
import TrueFalse from '../pages/Quiz/TrueFalse'
import ShortDescription from '../pages/Quiz/ShortDescription'
import HistoryRecord from '../pages/Quiz/HistoryRecord'
import ChangeCourseInfo from '../pages/ChangeCourseInfo'

export default SwitchNavigator({
  Login: {
    screen: Login,
  },
  Course: {
    screen: Course,
  },
  SearchPage: {
    screen: SearchPage,
  },
  AddNewCourse: {
    screen: AddNewCourse, // Page for 新增課程
  },
  ChangeCourseInfo: {
    screen: ChangeCourseInfo,
  },
  Quiz: {
    screen: Quiz,
  },
  Single: {
    screen: Single,
  },
  Multi: {
    screen: Multi,
  },
  TrueFalse: {
    screen: TrueFalse,
  },
  ShortDescription: {
    screen: ShortDescription,
  },
  HistoryRecord: {
    screen: HistoryRecord,
  },
  SingleResult: {
    screen: SingleResult,
  },
  MultiResult: {
    screen: MultiResult,
  },
  TrueFalseResult: {
    screen: TrueFalseResult,
  },
  Pages: DrawerNavigator({
    EditProfile: {
      screen: EditProfile, // Page for 修改個人資料
    },
    Channels: {
      screen: Channels, // Page for 切換頻道
    },
    ClassMenu: {
      screen: ClassMenu,
    },
    DrawLots: {
      screen: DrawLots, // Page for 隨機抽籤
    },
    DrawFinish: {
      screen: DrawFinish,
    },
    CourseInfo: {
      screen: CourseInfo,
    },
    OnlinePeerList: {
      screen: OnlinePeerList,
    },
  }, {
    contentComponent: DrawerContainer,
    drawerWidth: 300,
    drawerPosition: 'left',
  }),
}, {
  initialRouteName: 'Login',
})
