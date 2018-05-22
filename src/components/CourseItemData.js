import onlineList from '../../asset/icon/onlineList.png'
import share from '../../asset/icon/share.png'
import unShare from '../../asset/icon/unShare.png'
import info from '../../asset/icon/info.png'
import test from '../../asset/icon/test.png'
import rollCall from '../../asset/icon/rollCall.png'
import random from '../../asset/icon/random.png'
import question from '../../asset/icon/question.png'
import upload from '../../asset/icon/upload.png'
import download from '../../asset/icon/download.png'
import forum from '../../asset/icon/forum.png'

const CourseItemData = [
  {
    id: 0,
    title: ['在線名單'],
    imgSrc: [onlineList],
    user: 'teacher student',
    routeName: 'OnlinePeerList',
  },
  {
    id: 1,
    title: ['發布課程', '停止發佈'],
    imgSrc: [share, unShare],
    user: 'teacher',
    onclick: false,
    routeName: '',
  },
  {
    id: 2,
    title: ['課程資訊'],
    imgSrc: [info],
    user: 'teacher student',
    routeName: 'CourseInfo',
  },
  {
    id: 3,
    title: ['隨堂測驗'],
    imgSrc: [test],
    user: 'teacher student',
    routeName: 'Quiz',
  },
  {
    id: 4,
    title: ['點名'],
    imgSrc: [rollCall],
    user: 'teacher',
    routeName: '',
  },
  {
    id: 5,
    title: ['隨機抽籤'],
    imgSrc: [random],
    user: 'teacher',
    routeName: '',
  },
  {
    id: 6,
    title: ['學生發問'],
    imgSrc: [question],
    user: 'teacher student',
    routeName: '',
  },
  {
    id: 7,
    title: ['檔案上傳'],
    imgSrc: [upload],
    user: 'teacher',
    routeName: '',
  },
  {
    id: 8,
    title: ['檔案下載'],
    imgSrc: [download],
    user: 'student',
    routeName: '',
  },
  {
    id: 9,
    title: ['討論區'],
    imgSrc: [forum],
    user: 'teacher student',
    routeName: '',
  },
]

export default CourseItemData
