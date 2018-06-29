import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text } from 'react-native'
import PropTypes from 'prop-types'
import CloseImage from '../../../asset/close.png'
import styles from '../styles/Quiz.style'
import navAction from '../../actions/nav.action'
import Appbar from '../../components/Appbar.component'
import QuizStatItem from '../../components/QuizStatItem.component'

const mapDispatchToProps = dispatch => ({
  navAction: {
    openDrawer: () => { dispatch(navAction.openDrawer()) },
    onExit: () => { dispatch(navAction.historyRecord()) },
  },
})


class QuestionResult extends Component {
  renderStats(currQuestion) {
    if (typeof currQuestion.studentAnswers === 'undefined'
    || currQuestion.studentAnswers.length === 0) {
      return <Text style={styles.text}>
      目前沒有學生作答
      </Text>
    }
    let trueStudents
    let falseStudents
    const singleStudents = [[], [], [], []]
    const multiStudents = [[], [], [], [], []]
    switch (currQuestion.quizItemId) {
    case 0: // TrueFalse
      trueStudents = currQuestion.studentAnswers.filter(student => student.answer)
      falseStudents = currQuestion.studentAnswers.filter(student => !student.answer)
      return <View style={styles.statsContainer}>
        <QuizStatItem
          label='是'
          ratio={trueStudents.length / currQuestion.studentAnswers.length}
          correct={currQuestion.trueFalse.answer}
          userList={trueStudents}
        />
        <QuizStatItem
          label='否'
          ratio={falseStudents.length / currQuestion.studentAnswers.length}
          correct={!currQuestion.trueFalse.answer}
          userList={falseStudents}
        />
      </View>
    case 1: // Single
      singleStudents[0] = currQuestion.studentAnswers.filter(student => student.answer === currQuestion.single.rightAns)
      singleStudents[1] = currQuestion.studentAnswers.filter(student => student.answer === currQuestion.single.wrongAns1)
      singleStudents[2] = currQuestion.studentAnswers.filter(student => student.answer === currQuestion.single.wrongAns2)
      singleStudents[3] = currQuestion.studentAnswers.filter(student => student.answer === currQuestion.single.wrongAns3)
      return <View style={styles.statsContainer}>
        <QuizStatItem
          label={currQuestion.single.rightAns}
          ratio={singleStudents[0].length / currQuestion.studentAnswers.length}
          correct={true}
          userList={singleStudents[0]}
        />
        <QuizStatItem
          label={currQuestion.single.wrongAns1}
          ratio={singleStudents[1].length / currQuestion.studentAnswers.length}
          correct={false}
          userList={singleStudents[1]}
        />
        <QuizStatItem
          label={currQuestion.single.wrongAns2}
          ratio={singleStudents[2].length / currQuestion.studentAnswers.length}
          correct={false}
          userList={singleStudents[2]}
        />
        <QuizStatItem
          label={currQuestion.single.wrongAns3}
          ratio={singleStudents[3].length / currQuestion.studentAnswers.length}
          correct={false}
          userList={singleStudents[3]}
        />
      </View>
    case 2: // Multi
      for (let it = 0; it < 5; it += 1) {
        multiStudents[it] = currQuestion.studentAnswers.filter(student => student.answer.includes(it))
      }
      return <View style={styles.statsContainer}>
        <QuizStatItem
          label={currQuestion.multi.ans1State}
          ratio={multiStudents[0].length / currQuestion.studentAnswers.length}
          correct={currQuestion.multi.check1}
          userList={multiStudents[0]}
        />
        <QuizStatItem
          label={currQuestion.multi.ans2State}
          ratio={multiStudents[1].length / currQuestion.studentAnswers.length}
          correct={currQuestion.multi.check2}
          userList={multiStudents[1]}
        />
        <QuizStatItem
          label={currQuestion.multi.ans3State}
          ratio={multiStudents[2].length / currQuestion.studentAnswers.length}
          correct={currQuestion.multi.check3}
          userList={multiStudents[2]}
        />
        <QuizStatItem
          label={currQuestion.multi.ans4State}
          ratio={multiStudents[3].length / currQuestion.studentAnswers.length}
          correct={currQuestion.multi.check4}
          userList={multiStudents[3]}
        />
        <QuizStatItem
          label={currQuestion.multi.ans5State}
          ratio={multiStudents[4].length / currQuestion.studentAnswers.length}
          correct={currQuestion.multi.check5}
          userList={multiStudents[4]}
        />
      </View>
    default:
      return <Text style={styles.text}>
      無法提供統計結果
      </Text>
    }
  }
  render() {
    const { currQuestion } = { ...this.props.navigation.state.params }
    return (
      <View style={styles.container}>
        <Appbar title={'統計結果'} withDrawer
          rightIcon={CloseImage}
          onRightPress={this.props.navAction.onExit}/>
        <View style={styles.listContainer}>
          <View style={styles.questionTitle}>
            <Text style={styles.text}>
              題目內容：
            </Text>
          </View>
          <View style={styles.questionContext}>
            <Text style={styles.text}>
              { currQuestion.questionState }
            </Text>
          </View>
          { this.renderStats(currQuestion) }
        </View>
      </View>
    )
  }
}

QuestionResult.propTypes = {
  navAction: PropTypes.shape({
    openDrawer: PropTypes.func.isRequired,
    onExit: PropTypes.func.isRequired,
  }).isRequired,
  navigation: PropTypes.shape({
    state: PropTypes.shape({
      params: PropTypes.shape({
        currQuestion: PropTypes.object.isRequired,
      }),
    }),
  }),
}

export default connect(undefined, mapDispatchToProps)(QuestionResult)
