import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, FlatList, Text } from 'react-native'
import PropTypes from 'prop-types'
import CloseImage from '../../../asset/close.png'
import styles from '../styles/HistoryRecord.style'
import navAction from '../../actions/nav.action'
import Appbar from '../../components/Appbar.component'
import TeacherHistoryItem from '../../components/QuizTeacherHistoryItem.component'
// import mockQuizHistory from '../../../asset/mockQuizHistory.json'

const mapDispatchToProps = dispatch => ({
  navAction: {
    openDrawer: () => { dispatch(navAction.openDrawer()) },
    onExit: () => { dispatch(navAction.quizMainPage()) },
    getResult: (questionItem) => { dispatch(navAction.quizResultPage(questionItem)) },
  },
})

class HistoryRecord extends Component {
  HistoryOnPress(item) {
    this.props.navAction.getResult(item)
  }
  getCorrectRate(item) {
    if (item.studentAnswers.length === 0) {
      return 0
    }
    let checkMulti
    switch (item.quizItemId) {
    case 0:
      return item.studentAnswers.filter(student => student.answer === item.trueFalse.value).length * (100 / item.studentAnswers.length)
    case 1:
      return item.studentAnswers.filter(student => student.answer === item.single.rightAns).length * (100 / item.studentAnswers.length)
    case 2:
      checkMulti = (student) => {
        return (
          item.multi.check1 === student.answer.includes(0)
          && item.multi.check2 === student.answer.includes(1)
          && item.multi.check3 === student.answer.includes(2)
          && item.multi.check4 === student.answer.includes(3)
          && item.multi.check5 === student.answer.includes(4)
        )
      }
      return item.studentAnswers.filter(checkMulti).length * (100 / item.studentAnswers.length)
    default:
      return 0
    }
  }
  render() {
    const questionType = '歷史紀錄'
    const { currCourseData } = this.props.navigation.state.params
    return (
      <View style={styles.container}>
        <Appbar title={questionType} withDrawer
          rightIcon={CloseImage}
          onRightPress={this.props.navAction.onExit}/>
        { (currCourseData.quizHistory.length === 0) ? (
          <View style={styles.textContainer}>
            <Text style={styles.text}>
              目前歷史紀錄是空的QQ
            </Text>
          </View>
        ) : (
          <View style={styles.listContainer}>
            <FlatList
              style={styles.list}
              data={[...currCourseData.quizHistory].reverse()}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TeacherHistoryItem
                  type={item.questionType}
                  description={item.questionState}
                  time={item.releaseTime}
                  correctRate={ this.getCorrectRate(item).toFixed(0).toString() }
                  onPress={this.HistoryOnPress.bind(this, item) }
                />
              )}
            />
          </View>
        )}
      </View>
    )
  }
}

HistoryRecord.propTypes = {
  navAction: PropTypes.shape({
    openDrawer: PropTypes.func.isRequired,
    onExit: PropTypes.func.isRequired,
    getResult: PropTypes.func.isRequired,
  }).isRequired,
  navigation: PropTypes.shape({
    state: PropTypes.shape({
      params: PropTypes.shape({
        currCourseData: PropTypes.object.isRequired,
      }),
    }),
  }),
}

export default connect(undefined, mapDispatchToProps)(HistoryRecord)
