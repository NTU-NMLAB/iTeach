import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import PropTypes from 'prop-types'
import CloseImage from '../../../asset/close.png'
import styles from '../styles/Question.styles'
import navAction from '../../actions/nav.action'
import Appbar from '../../components/Appbar'
import classMenuAction from '../../actions/classMenu.action'
import getTime from '../../util/getTime'

const mapStateToProps = state => ({
  status: state.account.status,
  courseName: state.course.courseName,
  course: state.course,
  classMenu: state.classMenu,
  classList: state.classMenu.classList,
})

const mapDispatchToProps = dispatch => ({
  navAction: {
    openDrawer: () => { dispatch(navAction.openDrawer()) },
    onExit: () => { dispatch(navAction.quizMainPage()) },
    historyRecord: () => { dispatch(navAction.historyRecord()) },
  },
  classListAction: {
    modify: (classItem) => {
      dispatch(classMenuAction.classList.modify(classItem))
    },
  },
})

class Single extends Component {
  constructor(props) {
    super(props)
    this.state = {
      questionType: '單選題',
      questionState: '',
      rightAns: '',
      wrongAns1: '',
      wrongAns2: '',
      wrongAns3: '',
      releaseTime: '',
      correctRate: 0,
    }
    this.onPressSubmit = this.onPressSubmit.bind(this)
  }
  onPressSubmit = () => {
    const courseData =
      this.props.classMenu.classList.filter(item => item.title === this.props.courseName)[0]
    if (courseData.quizHistory === undefined) {
      courseData.quizHistory = [this.state]
    } else {
      courseData.quizHistory.push(this.state)
    }
    courseData.quizHistory[courseData.quizHistory.length - 1].releaseTime
      = getTime()
    this.props.classListAction.modify(courseData)
    this.props.navAction.historyRecord()
  }

  render() {
    const questionType = '單選題'
    const submit = '發布'
    return (
      <View style={styles.container}>
        <Appbar title={questionType} withDrawer
          rightIcon={CloseImage}
          onRightPress={this.props.navAction.onExit}/>
        <View style={styles.listContainer}>
          <View style={styles.questionTitle}>
            <Text style={styles.text}>
              題目內容：
            </Text>
          </View>
          <View style={styles.questionContext}>
            <TextInput
              style={styles.text}
              onChangeText={(questionState) => { this.setState({ questionState }) }}
              value={this.state.questionStatement}
              placeholder='題目敘述'
            />
          </View>
          <View style={styles.singleAnswer}>
            <Text style={styles.text}>
              正確選項：
            </Text>
            <TextInput
              style={styles.singleInput}
              onChangeText={(rightAns) => { this.setState({ rightAns }) }}
              value={this.state.rightAns}
              placeholder='正確答案'
            />
          </View>
          <View style={styles.singleAnswer}>
            <Text style={styles.text}>
              錯誤選項：
            </Text>
            <TextInput
              style={styles.singleInput}
              onChangeText={(wrongAns1) => { this.setState({ wrongAns1 }) }}
              value={this.state.wrongAns1}
              placeholder='錯誤答案'
            />
          </View>
          <View style={styles.singleAnswer}>
            <Text style={styles.text}>
              錯誤選項：
            </Text>
            <TextInput
              style={styles.singleInput}
              onChangeText={(wrongAns2) => { this.setState({ wrongAns2 }) }}
              value={this.state.wrongAns2}
              placeholder='錯誤答案'
            />
          </View>
          <View style={styles.singleAnswer}>
            <Text style={styles.text}>
              錯誤選項：
            </Text>
            <TextInput
              style={styles.singleInput}
              onChangeText={(wrongAns3) => { this.setState({ wrongAns3 }) }}
              value={this.state.wrongAns3}
              placeholder='錯誤答案'
            />
          </View>
          <TouchableOpacity
            style={styles.singlesubmitCon}
            onPress={this.onPressSubmit}
          >
            <Text style={styles.submit}>
              {submit}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

Single.propTypes = {
  navAction: PropTypes.shape({
    openDrawer: PropTypes.func.isRequired,
    onExit: PropTypes.func.isRequired,
    historyRecord: PropTypes.func.isRequired,
  }).isRequired,
  classMenu: PropTypes.object.isRequired,
  courseName: PropTypes.string.isRequired,
  course: PropTypes.object.isRequired,
  classList: PropTypes.array.isRequired,
  classListAction: PropTypes.object.isRequired,
  status: PropTypes.string.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(Single)
