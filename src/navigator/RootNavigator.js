import { DrawerNavigator, SwitchNavigator } from 'react-navigation'
import Register from '../pages/Register.page'
import CourseHome from '../pages/CourseHome.page'
import ClassMenu from '../pages/ClassMenu.page'
import EditProfile from '../pages/EditProfile.page'
import DrawerContainer from '../pages/DrawerContainer.page'
import CourseSearch from '../pages/CourseSearch.page'
import AddCourse from '../pages/AddCourse.page'
import OnlinePeerList from '../pages/OnlinePeerList.page'
import CourseInfo from '../pages/CourseInfo.page'
import DrawLots from '../pages/DrawLots.page'
import DrawFinish from '../pages/DrawLotsFinish.page'
import FileUpload from '../pages/FileUpload.page'
import FileDownload from '../pages/FileDownload.page'
import Quiz from '../pages/Quiz/Quiz.page'
import QuestionResult from '../pages/Quiz/QuestionResult.page'
import Single from '../pages/Quiz/Single.page'
import Multi from '../pages/Quiz/Multi.page'
import TrueFalse from '../pages/Quiz/TrueFalse.page'
import ShortDescription from '../pages/Quiz/ShortDescription.page'
import HistoryRecord from '../pages/Quiz/HistoryRecord.page'
import EditCourseInfo from '../pages/EditCourseInfo.page'
import SingleAnswerPage from '../pages/Quiz/SingleAnswer.page'
import MultiAnswerPage from '../pages/Quiz/MultiAnswer.page'
import TrueFalseAnswerPage from '../pages/Quiz/TrueFalseAnswer.page'
import ShortDescriptionAnswerPage from '../pages/Quiz/ShortDescriptionAnswer.page'

export default SwitchNavigator({
  Register: {
    screen: Register,
  },
  CourseSearch: {
    screen: CourseSearch,
  },
  AddCourse: {
    screen: AddCourse,
  },
  EditCourseInfo: {
    screen: EditCourseInfo,
  },
  FileUpload: {
    screen: FileUpload,
  },
  FileDownload: {
    screen: FileDownload,
  },
  Pages: DrawerNavigator({
    EditProfile: {
      screen: EditProfile, // Page for 修改個人資料
    },
    ClassMenu: {
      screen: ClassMenu,
    },
    CourseHome: {
      screen: CourseHome,
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
    FileUpload: {
      screen: FileUpload,
    },
    FileDownload: {
      screen: FileDownload,
    },
  }, {
    contentComponent: DrawerContainer,
    drawerWidth: 300,
    drawerPosition: 'left',
  }),
}, {
  initialRouteName: 'Register',
})
