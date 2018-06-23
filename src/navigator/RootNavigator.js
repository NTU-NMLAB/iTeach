import { DrawerNavigator, SwitchNavigator } from 'react-navigation'
import Register from '../pages/Register'
import Course from '../pages/Course'
import ClassMenu from '../pages/ClassMenu'
import EditProfile from '../pages/EditProfile'
import DrawerContainer from '../pages/DrawerContainer'
import SearchPage from '../pages/SearchPage'
import AddNewCourse from '../pages/AddNewCourse'
import OnlinePeerList from '../pages/OnlinePeerList'
import CourseInfo from '../pages/CourseInfo'
import DrawLots from '../pages/DrawLots'
import DrawFinish from '../pages/DrawLotsFinish'
import UploadFile from '../pages/UploadFile'
import DownloadFile from '../pages/DownloadFile'
import Quiz from '../pages/Quiz/Quiz'
import QuestionResult from '../pages/Quiz/QuestionResult'
import Single from '../pages/Quiz/Single'
import Multi from '../pages/Quiz/Multi'
import TrueFalse from '../pages/Quiz/TrueFalse'
import ShortDescription from '../pages/Quiz/ShortDescription'
import HistoryRecord from '../pages/Quiz/HistoryRecord'
import ChangeCourseInfo from '../pages/ChangeCourseInfo'
import SingleAnswerPage from '../pages/Quiz/SingleAnswerPage'
import MultiAnswerPage from '../pages/Quiz/MultiAnswerPage'
import TrueFalseAnswerPage from '../pages/Quiz/TrueFalseAnswerPage'
import ShortDescriptionAnswerPage from '../pages/Quiz/ShortDescriptionAnswerPage'

export default SwitchNavigator({
  Register: {
    screen: Register,
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
  UploadFile: {
    screen: UploadFile,
  },
  DownloadFile: {
    screen: DownloadFile,
  },
  Pages: DrawerNavigator({
    EditProfile: {
      screen: EditProfile, // Page for 修改個人資料
    },
    ClassMenu: {
      screen: ClassMenu,
    },
    Course: {
      screen: Course,
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
    QuestionResult: {
      screen: QuestionResult,
    },
    DrawLots: {
      screen: DrawLots, // Page for 隨機抽籤
    },
    DrawFinish: {
      screen: DrawFinish, // Page for 隨機抽籤完成
    },
    CourseInfo: {
      screen: CourseInfo,
    },
    OnlinePeerList: {
      screen: OnlinePeerList,
    },
    SingleAnswerPage: {
      screen: SingleAnswerPage,
    },
    MultiAnswerPage: {
      screen: MultiAnswerPage,
    },
    TrueFalseAnswerPage: {
      screen: TrueFalseAnswerPage,
    },
    ShortDescriptionAnswerPage: {
      screen: ShortDescriptionAnswerPage,
    },
    UploadFile: {
      screen: UploadFile,
    },
    DownloadFile: { // Page for 檔案下載
      screen: DownloadFile,
    },
  }, {
    contentComponent: DrawerContainer,
    drawerWidth: 300,
    drawerPosition: 'left',
  }),
}, {
  initialRouteName: 'Register',
})
