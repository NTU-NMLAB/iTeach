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
  constructor(props) {
    super(props)
    this.state = {
      unrolled: [false, false, false, false, false],
    }
  }
  renderStats(currQuestion) {
    if (typeof currQuestion.studentAnswers === 'undefined'
    || currQuestion.studentAnswers.length === 0) {
      return <View style={styles.statsContainer}>
        <Text style={styles.text}>
          目前沒有學生作答
        </Text>
      </View>
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
          correct={currQuestion.trueFalse.value}
          userList={trueStudents}
          unrolled={this.state.unrolled[0]}
          onPress={() => this.setState({ unrolled: [!this.state.unrolled[0], false] })}
        />
        <QuizStatItem
          label='否'
          ratio={falseStudents.length / currQuestion.studentAnswers.length}
          correct={!currQuestion.trueFalse.value}
          userList={falseStudents}
          unrolled={this.state.unrolled[1]}
          onPress={() => this.setState({ unrolled: [false, !this.state.unrolled[1]] })}
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
          unrolled={this.state.unrolled[0]}
          onPress={() => this.setState({ unrolled: [!this.state.unrolled[0], false, false, false] })}
        />
        <QuizStatItem
          label={currQuestion.single.wrongAns1}
          ratio={singleStudents[1].length / currQuestion.studentAnswers.length}
          correct={false}
          userList={singleStudents[1]}
          unrolled={this.state.unrolled[1]}
          onPress={() => this.setState({ unrolled: [false, !this.state.unrolled[1], false, false] })}
        />
        <QuizStatItem
          label={currQuestion.single.wrongAns2}
          ratio={singleStudents[2].length / currQuestion.studentAnswers.length}
          correct={false}
          userList={singleStudents[2]}
          unrolled={this.state.unrolled[2]}
          onPress={() => this.setState({ unrolled: [false, false, !this.state.unrolled[2], false] })}
        />
        <QuizStatItem
          label={currQuestion.single.wrongAns3}
          ratio={singleStudents[3].length / currQuestion.studentAnswers.length}
          correct={false}
          userList={singleStudents[3]}
          unrolled={this.state.unrolled[3]}
          onPress={() => this.setState({ unrolled: [false, false, false, !this.state.unrolled[3]] })}
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
          unrolled={this.state.unrolled[0]}
          onPress={() => this.setState({ unrolled: [!this.state.unrolled[0], false, false, false, false] })}
        />
        <QuizStatItem
          label={currQuestion.multi.ans2State}
          ratio={multiStudents[1].length / currQuestion.studentAnswers.length}
          correct={currQuestion.multi.check2}
          userList={multiStudents[1]}
          unrolled={this.state.unrolled[1]}
          onPress={() => this.setState({ unrolled: [false, !this.state.unrolled[1], false, false, false] })}
        />
        <QuizStatItem
          label={currQuestion.multi.ans3State}
          ratio={multiStudents[2].length / currQuestion.studentAnswers.length}
          correct={currQuestion.multi.check3}
          userList={multiStudents[2]}
          unrolled={this.state.unrolled[2]}
          onPress={() => this.setState({ unrolled: [false, false, !this.state.unrolled[2], false, false] })}
        />
        <QuizStatItem
          label={currQuestion.multi.ans4State}
          ratio={multiStudents[3].length / currQuestion.studentAnswers.length}
          correct={currQuestion.multi.check4}
          userList={multiStudents[3]}
          unrolled={this.state.unrolled[3]}
          onPress={() => this.setState({ unrolled: [false, false, false, !this.state.unrolled[3], false] })}
        />
        <QuizStatItem
          label={currQuestion.multi.ans5State}
          ratio={multiStudents[4].length / currQuestion.studentAnswers.length}
          correct={currQuestion.multi.check5}
          userList={multiStudents[4]}
          unrolled={this.state.unrolled[4]}
          onPress={() => this.setState({ unrolled: [false, false, false, false, !this.state.unrolled[4]] })}
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
