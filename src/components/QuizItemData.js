import onlineList from '../../asset/icon/onlineList.png'
import share from '../../asset/icon/share.png'
import info from '../../asset/icon/info.png'
import test from '../../asset/icon/test.png'
import rollCall from '../../asset/icon/rollCall.png'

const QuizItemData = [
  {
    id: 0,
    title: ['是非題'],
    imgSrc: [onlineList],
    user: 'teacher',
    routeName: 'TrueFalse',
  },
  {
    id: 1,
    title: ['單選題'],
    imgSrc: [share],
    user: 'teacher',
    routeName: 'Single',
  },
  {
    id: 2,
    title: ['多選題'],
    imgSrc: [info],
    user: 'teacher',
    routeName: 'Multi',
  },
  {
    id: 3,
    title: ['簡答題'],
    imgSrc: [test],
    user: 'teacher',
    routeName: 'ShortDescription',
  },
  {
    id: 4,
    title: ['歷史紀錄'],
    imgSrc: [rollCall],
    user: 'teacher student',
    routeName: 'HistoryRecord',
  },
]

export default QuizItemData
