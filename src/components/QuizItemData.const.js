import yesNo from '../../asset/icon/yesNo.png'
import singleChoice from '../../asset/icon/singleChoice.png'
import multipleChoice from '../../asset/icon/multipleChoice.png'
import simple from '../../asset/icon/simple.png'
import history from '../../asset/icon/history.png'

const QuizItemData = [
  {
    id: 0,
    title: '是非題',
    imgSrc: yesNo,
    user: 'teacher',
    questionType: 'TrueFalse',
  },
  {
    id: 1,
    title: '單選題',
    imgSrc: singleChoice,
    user: 'teacher',
    questionType: 'Single',
  },
  {
    id: 2,
    title: '多選題',
    imgSrc: multipleChoice,
    user: 'teacher',
    questionType: 'Multi',
  },
  {
    id: 3,
    title: '簡答題',
    imgSrc: simple,
    user: 'teacher',
    questionType: 'ShortDescription',
  },
  {
    id: 4,
    title: '歷史紀錄',
    imgSrc: history,
    user: 'teacher student',
    routeName: 'HistoryRecord',
  },
]

export default QuizItemData
