import { DrawerNavigator, SwitchNavigator } from 'react-navigation'
import Register from '../pages/Register.page'
import Course from '../pages/Course.page'
import ClassMenu from '../pages/ClassMenu.page'
import EditProfile from '../pages/EditProfile.page'
import DrawerContainer from '../pages/DrawerContainer.page'
import SearchPage from '../pages/Search.page'
import AddNewCourse from '../pages/AddNewCourse.page'
import OnlinePeerList from '../pages/OnlinePeerList.page'
import CourseInfo from '../pages/CourseInfo.page'
import DrawLots from '../pages/DrawLots.page'
import DrawFinish from '../pages/DrawLotsFinish.page'
import UploadFile from '../pages/UploadFile.page'
import DownloadFile from '../pages/DownloadFile.page'
import Quiz from '../pages/Quiz/Quiz.page'
import QuestionResult from '../pages/Quiz/QuestionResult.page'
import Single from '../pages/Quiz/Single.page'
import Multi from '../pages/Quiz/Multi.page'
import TrueFalse from '../pages/Quiz/TrueFalse.page'
import ShortDescription from '../pages/Quiz/ShortDescription.page'
import HistoryRecord from '../pages/Quiz/HistoryRecord.page'
import ChangeCourseInfo from '../pages/ChangeCourseInfo.page'
import SingleAnswerPage from '../pages/Quiz/SingleAnswer.page'
import MultiAnswerPage from '../pages/Quiz/MultiAnswer.page'
import TrueFalseAnswerPage from '../pages/Quiz/TrueFalseAnswer.page'
import ShortDescriptionAnswerPage from '../pages/Quiz/ShortDescriptionAnswer.page'

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
