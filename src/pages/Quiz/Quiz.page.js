import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, FlatList } from 'react-native'
import PropTypes from 'prop-types'
import CloseImage from '../../../asset/close.png'
import styles from '../styles/Quiz.style'
import navAction from '../../actions/nav.action'
import quizItemAction from '../../actions/quizItem.action'
import classMenuAction from '../../actions/classMenu.action'
import QuizItem from '../../components/QuizItem.component'
import QuizItemData from '../../components/QuizItemData.const'
import Appbar from '../../components/Appbar.component'
import StudentHistoryItem from '../../components/StudentHistoryItem.component'

const mapStateToProps = state => ({
  isTeacher: state.profile.isTeacher,
  courseName: state.course.courseName,
  classList: state.classMenu.classList,
})

const mapDispatchToProps = dispatch => ({
  navAction: {
    openDrawer: () => { dispatch(navAction.openDrawer()) },
    onExit: () => { dispatch(navAction.course()) },
    enterQuestion: (id) => { dispatch(navAction.enterQuestion(id)) },
    singleAnswerPage: (quizData) => { dispatch(navAction.singleAnswerPage(quizData)) },
    multiAnswerPage: (quizData) => { dispatch(navAction.multiAnswerPage(quizData)) },
    trueFalseAnswerPage: (quizData) => { dispatch(navAction.trueFalseAnswerPage(quizData)) },
    shortDescriptionAnswerPage: (quizData) => { dispatch(navAction.shortDescriptionAnswerPage(quizData)) },
  },
  quizItemAction: {
    setName: (id) => {
      dispatch(quizItemAction.setName(id))
    },
  },
  classListAction: {
    modify: (classItem) => {
      dispatch(classMenuAction.classList.modify(classItem, classItem.title))
    },
  },
})


class Quiz extends Component {
  constructor() {
    super()
    this.iconOnPress = this.iconOnPress.bind(this)
    this.historyOnPress = this.historyOnPress.bind(this)
  }

  iconOnPress(id) {
    this.props.quizItemAction.setName(id)
    this.props.navAction.enterQuestion(id)
  }

  historyOnPress = (questionID) => {
    const courseData =
      this.props.classList.find(item => item.title === this.props.courseName)
    const quizData =
      courseData.studentQuizHistory.find(item => item.questionID === questionID)
    switch (quizData.questionType) {
    case '單選題':
      this.props.navAction.singleAnswerPage(quizData)
      break
    case '多選題':
      this.props.navAction.multiAnswerPage(quizData)
      break
    case '是非題':
      this.props.navAction.trueFalseAnswerPage(quizData)
      break
    case '簡答題':
      this.props.navAction.shortDescriptionAnswerPage(quizData)
      break
    default:
    }
  }

  render() {
    const courseData =
      this.props.classList.find(item => item.title === this.props.courseName)
    return (
      <View style={styles.container}>
        <Appbar title={'隨堂測驗'} withDrawer
          rightIcon={CloseImage}
          onRightPress={this.props.navAction.onExit}/>
        { (this.props.isTeacher === true) ? (
          <View style={styles.itemContainer}>
            {QuizItemData.filter(item => item.user.includes('teacher'))
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
              data={[...courseData.studentQuizHistory].reverse()}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <StudentHistoryItem
                  type={item.questionType}
                  description={item.questionState}
                  time={item.releaseTime}
                  answerState={item.answerState}
                  onPress={ () => { this.historyOnPress(item.questionID) } }
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
    singleAnswerPage: PropTypes.func.isRequired,
    multiAnswerPage: PropTypes.func.isRequired,
    trueFalseAnswerPage: PropTypes.func.isRequired,
    shortDescriptionAnswerPage: PropTypes.func.isRequired,
  }).isRequired,
  quizItemAction: PropTypes.shape({
    setName: PropTypes.func.isRequired,
  }).isRequired,
  quizItem: PropTypes.object,
  isTeacher: PropTypes.bool.isRequired,
  classList: PropTypes.array.isRequired,
  courseName: PropTypes.string.isRequired,
  classListAction: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz)
