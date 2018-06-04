import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  View,
  Text,
  Switch,
  TouchableOpacity,
  TextInput,
} from 'react-native'
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
  classMenu: state.classMenu,
  course: state.course,
  classList: state.classMenu.classList,
})

const mapDispatchToProps = dispatch => ({
  navAction: {
    openDrawer: () => { dispatch(navAction.openDrawer()) },
    onExit: () => { dispatch(navAction.quizMainPage()) },
    historyRecord: () => { dispatch(navAction.historyRecord()) },
  },
  classListAction: {
    modify: (classItem, title) => {
      dispatch(classMenuAction.classList.modify(classItem, title))
    },
  },
})


class TrueFalse extends Component {
  constructor() {
    super()
    this.state = {
      questionType: '是非題',
      questionState: '',
      value: true,
      releaseTime: '',
      correctRate: 0,
    }
    this.onPressSubmit = this.onPressSubmit.bind(this)
  }
  onPressSubmit = () => {
    const courseData =
      this.props.classMenu.classList.filter(item => item.title === this.props.courseName)[0]
    if (typeof courseData.quizHistory === 'undefined') {
      courseData.quizHistory = [this.state]
    } else {
      courseData.quizHistory.push(this.state)
    }
    courseData.quizHistory[courseData.quizHistory.length - 1].releaseTime = getTime()
    this.props.classListAction.modify(courseData, this.props.courseName)
    this.props.navAction.historyRecord()
  }

  render() {
    const questionType = '是非題'
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
              value={this.state.questionState}
              placeholder='題目敘述'
            />
          </View>
          <View style={styles.truefalseAnswer}>
            <Text style={styles.text}>
              正確答案：   是  <Switch style={styles.switch} value={this.state.value}
                onValueChange={ value => this.setState({ value })} />  否
            </Text>
          </View>
          <TouchableOpacity
            style={styles.truefalsesubmitCon}
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

TrueFalse.propTypes = {
  navAction: PropTypes.shape({
    openDrawer: PropTypes.func.isRequired,
    onExit: PropTypes.func.isRequired,
    historyRecord: PropTypes.func.isRequired,

  }).isRequired,
  classMenu: PropTypes.object.isRequired,
  courseName: PropTypes.string.isRequired,
  classList: PropTypes.array.isRequired,
  course: PropTypes.object.isRequired,
  status: PropTypes.string.isRequired,
  classListAction: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(TrueFalse)
