import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, FlatList } from 'react-native'
import PropTypes from 'prop-types'
import CloseImage from '../../../asset/close.png'
import styles from '../styles/Quiz.styles'
import navAction from '../../actions/nav.action'
import quizItemAction from '../../actions/quizItem.action'
import classMenuAction from '../../actions/classMenu.action'
import QuizItem from '../../components/QuizItem'
import QuizItemData from '../../components/QuizItemData'
import Appbar from '../../components/Appbar'
import StudentHistoryItem from '../../components/StudentHistoryItem'
import mockStudentQuizHistory from '../../../asset/mockStudentQuizHistory.json'

const mapStateToProps = state => ({
  status: state.account.status,
  courseName: state.course.courseName,
  classMenu: state.classMenu,
  course: state.course,
  ...state,
})

const mapDispatchToProps = dispatch => ({
  navAction: {
    openDrawer: () => { dispatch(navAction.openDrawer()) },
    onExit: () => { dispatch(navAction.course()) },
    enterQuestion: (id) => { dispatch(navAction.enterQuestion(id)) },
    studentAnswerPage: () => { dispatch(navAction.studentAnswerPage()) },
  },
  quizItemAction: {
    setName: (id) => {
      dispatch(quizItemAction.setName(id))
    },
  },
  classListAction: {
    modify: (classItem) => {
      dispatch(classMenuAction.classList.modify(classItem))
    },
  },
})


class Quiz extends Component {
  iconOnPress(id) {
    this.props.quizItemAction.setName(id)
    this.props.navAction.enterQuestion(id)
  }

  historyOnPress() {
  }

  render() {
    const courseData =
      this.props.classMenu.classList.filter(item => item.title === this.props.courseName)[0]
    if (courseData.quizHistory === undefined) {
      courseData.quizHistory = mockStudentQuizHistory.Questions
      this.props.classListAction.modify(courseData)
    }
    return (
      <View style={styles.container}>
        <Appbar title={'隨堂測驗'} withDrawer
          rightIcon={CloseImage}
          onRightPress={this.props.navAction.onExit}/>
        { (this.props.status === 'teacher') ? (
          <View style={styles.itemContainer}>
            {QuizItemData.filter(item => item.user.includes(this.props.status))
              .map(item => (
                <QuizItem
                  key={item.id} id={item.id}
                  title={item.title[0]}
                  imgSrc={item.imgSrc[0]}
                  onPress={this.iconOnPress.bind(this)}/>
              ))
            }
          </View>
        ) : (
          <View style={styles.listContainer}>
            <FlatList
              style={styles.list}
              data={[...courseData.quizHistory].reverse()}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <StudentHistoryItem
                  type={item.questionType}
                  description={item.questionState}
                  time={item.releaseTime}
                  answerState={item.answerState.toString()}
                  onPress={this.historyOnPress.bind(this)}
                />
              )}
            />
          </View>
        )}
      </View>
    )
  }
}

Quiz.propTypes = {
  navAction: PropTypes.shape({
    openDrawer: PropTypes.func.isRequired,
    onExit: PropTypes.func.isRequired,
    enterQuestion: PropTypes.func.isRequired,
    studentAnswerPage: PropTypes.func.isRequired,
  }).isRequired,
  quizItemAction: PropTypes.shape({
    setName: PropTypes.func.isRequired,
  }).isRequired,
  course: PropTypes.object.isRequired,
  quizItem: PropTypes.object,
  status: PropTypes.string.isRequired,
  classMenu: PropTypes.object.isRequired,
  courseName: PropTypes.string.isRequired,
  classListAction: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz)
