import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, FlatList } from 'react-native'
import PropTypes from 'prop-types'
import CloseImage from '../../../asset/close.png'
import styles from '../styles/Quiz.style'
import navAction from '../../actions/nav.action'
import courseMenuAction from '../../actions/courseMenu.action'
import QuizItem from '../../components/QuizItem.component'
import QuizItemData from '../../components/QuizItemData.const'
import Appbar from '../../components/Appbar.component'
import StudentHistoryItem from '../../components/StudentHistoryItem.component'

const mapStateToProps = state => ({
  isTeacher: state.profile.isTeacher,
})

const mapDispatchToProps = dispatch => ({
  navAction: {
    openDrawer: () => { dispatch(navAction.openDrawer()) },
    onExit: () => { dispatch(navAction.courseHome()) },
    enterQuestionCreate: (id, quizData) => {
      dispatch(navAction.questionCreate(id, quizData))
    },
    enterHistoryRecord: () => { dispatch(navAction.historyRecord()) },
    singleAnswerPage: (quizData) => { dispatch(navAction.singleAnswerPage(quizData)) },
    multiAnswerPage: (quizData) => { dispatch(navAction.multiAnswerPage(quizData)) },
    trueFalseAnswerPage: (quizData) => { dispatch(navAction.trueFalseAnswerPage(quizData)) },
    shortDescriptionAnswerPage: (quizData) => { dispatch(navAction.shortDescriptionAnswerPage(quizData)) },
  },
  classListAction: {
    modify: (courseData) => {
      dispatch(courseMenuAction.classList.modify(courseData))
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
    switch (id) {
    case 0: // TrueFalse
    case 1: // Single
    case 2: // Multi
    case 3: // ShortDescription
      this.props.navAction.enterQuestionCreate(id, {
        classListModify: this.props.classListAction.modify,
      })
      break
    case 4: // HistoryRecord
    default:
      this.props.navAction.enterHistoryRecord()
    }
  }

  historyOnPress = (questionID) => {
    const { currCourseData } = this.props.navigation.state.params
    const quizData =
      currCourseData.studentQuizHistory.find(item => item.questionID === questionID)
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
    const { currCourseData } = this.props.navigation.state.params
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
                  title={item.title}
                  imgSrc={item.imgSrc}
                  onPress={this.iconOnPress.bind(this)}/>
              ))
            }
          </View>
        ) : (
          <View style={styles.listContainer}>
            <FlatList
              style={styles.list}
              data={[...currCourseData.studentQuizHistory].reverse()}
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
    enterQuestionCreate: PropTypes.func.isRequired,
    enterHistoryRecord: PropTypes.func.isRequired,
    singleAnswerPage: PropTypes.func.isRequired,
    multiAnswerPage: PropTypes.func.isRequired,
    trueFalseAnswerPage: PropTypes.func.isRequired,
    shortDescriptionAnswerPage: PropTypes.func.isRequired,
  }).isRequired,
  classListAction: PropTypes.object.isRequired,
  isTeacher: PropTypes.bool.isRequired,
  navigation: PropTypes.shape({
    state: PropTypes.shape({
      params: PropTypes.shape({
        currCourseData: PropTypes.object.isRequired,
      }),
    }),
  }),
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz)
