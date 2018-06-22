import { Alert } from 'react-native'
import { createActions } from 'redux-actions'
import classMenuAction from './classMenu.action'
import multiPeerAction from './multiPeer.action'

const { quizItem } = createActions({
  quizItem: {
    setName: courseName => courseName,
    update: reply => ((dispatch, getState) => {
      const classItem = getState().classMenu.classList.find(it => it.title === reply.courseName)
      const target = classItem.studentQuizHistory.findIndex(it => it.questionID === reply.questionID)
      classItem.studentQuizHistory[target] = {
        ...classItem.studentQuizHistory[target],
        ...reply,
      }
      dispatch(classMenuAction.classList.modify(classItem, reply.courseName))
    }),
    answer: (reply, toWhom) => ((dispatch, getState) => {
      const { peers } = getState().multiPeer
      if ((!peers[toWhom].online) || (peers[toWhom].info.course !== reply.courseName)) {
        Alert.alert(
          '教師離線',
          '請於教師上線時提交！',
          [{ text: 'OK' }],
        )
        return
      }

      const classItem = getState().classMenu.classList.find(it => it.title === reply.courseName)
      const targetContent = classItem.studentQuizHistory.find(it => it.questionID === reply.questionID)
      const replyToSend = { messageType: 'ANSWER_BACK', ...reply }
      if (reply.answerState !== 'Answered') replyToSend.answer = targetContent.answer
      replyToSend.answer = replyToSend.answer.map(it => targetContent.options[it])
      dispatch(multiPeerAction.backend.sendData([toWhom], replyToSend))

      setTimeout(() => {
        const courseData = getState().classMenu.classList.find(it => it.title === reply.courseName)
        const targetToCheck = courseData.studentQuizHistory.find(it => it.questionID === reply.questionID)
        if (targetToCheck.answerState !== 'Checked') {
          Alert.alert(
            '傳送失敗',
            '回應等待時間過長！',
            [
              { text: '重送', onPress: () => { dispatch(quizItem.answer(reply, toWhom)) } },
              { text: '稍後再試' },
            ],
          )
        }
      }, 5000)
    }),
  },
})

export default quizItem
