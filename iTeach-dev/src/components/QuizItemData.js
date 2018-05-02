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

const QuizItemData = [
  {
    id: 0,
    title: ['是非題'],
    imgSrc: [onlineList],
    user: 'teacher',
    routeName: '',
  },
  {
    id: 1,
    title: ['單選題'],
    imgSrc: [share],
    user: 'teacher',
    routeName: '',
  },
  {
    id: 2,
    title: ['多選題'],
    imgSrc: [info],
    user: 'teacher',
    routeName: '',
  },
  {
    id: 3,
    title: ['簡答題'],
    imgSrc: [test],
    user: 'teacher',
    routeName: '',
  },
  {
    id: 4,
    title: ['歷史紀錄'],
    imgSrc: [rollCall],
    user: 'teacher student',
    routeName: '',
  },
]

export default QuizItemData
