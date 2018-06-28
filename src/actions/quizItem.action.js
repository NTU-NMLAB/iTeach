import { Alert } from 'react-native'
import { createActions } from 'redux-actions'
import courseMenuAction from './courseMenu.action'
import multiPeerAction from './multiPeer.action'

const { quizItem } = createActions({
  quizItem: {
    update: reply => ((dispatch, getState) => {
      const classItem = getState().courseMenu.classList
        .find(item => item.courseId === reply.courseId)
      const target = classItem.studentQuizHistory
        .findIndex(item => item.questionID === reply.questionID)
      classItem.studentQuizHistory[target] = {
        ...classItem.studentQuizHistory[target],
        ...reply,
      }
      dispatch(courseMenuAction.classList.modify(classItem))
    }),
    answer: (reply, toWhom) => ((dispatch, getState) => {
      const { peers } = getState().multiPeer
      const timeOut = (reply.answerState === 'Answered') ? 1000 : 5000
      if ((!peers[toWhom].online) || (peers[toWhom].info.currCourseId !== reply.courseId)) {
        Alert.alert(
          '教師離線',
          '請於教師上線時提交！',
          [{ text: 'OK' }],
        )
        return
      }

      const classItem = getState().courseMenu.classList
        .find(item => item.courseId === reply.courseId)
      const targetContent = classItem.studentQuizHistory
        .find(item => item.questionID === reply.questionID)
      const replyToSend = { messageType: 'ANSWER_BACK', ...reply }
      if (reply.answerState !== 'Answered') replyToSend.answer = targetContent.answer
      if (targetContent.questionType === '是非題') replyToSend.answer.map(item => item.toString())
      else replyToSend.answer = replyToSend.answer.map(item => targetContent.options[item])
      dispatch(multiPeerAction.backend.sendData([toWhom], replyToSend))

      setTimeout(() => {
        const courseData = getState().courseMenu.classList
          .find(item => item.courseId === reply.courseId)
        const targetToCheck = courseData.studentQuizHistory
          .find(item => item.questionID === reply.questionID)
        if (targetToCheck.answerState !== 'Checked') {
          const replyAgain = { ...reply, answerState: undefined }
          Alert.alert(
            '傳送失敗',
            '回應等待時間過長！',
            [
              { text: '重送', onPress: () => { dispatch(quizItem.answer(replyAgain, toWhom)) } },
              { text: '稍後再試' },
            ],
          )
        }
      }, timeOut)
    }),
  },
})

export default quizItem
