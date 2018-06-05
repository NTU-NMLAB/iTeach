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
import multiPeerAction from '../../actions/multiPeer.action'
import getHash from '../../util/getHash'

const mapStateToProps = state => ({
  status: state.account.status,
  courseName: state.course.courseName,
  classMenu: state.classMenu,
  course: state.course,
  classList: state.classMenu.classList,
  multiPeer: state.multiPeer,
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
  multiPeerAction: {
    sendData: (recipients, data) => {
      dispatch(multiPeerAction.backend.sendData(recipients, data, () => {}))
    },
  },
})


class TrueFalse extends Component {
  constructor() {
    super()
    this.state = {
      questionID: '',
      questionType: '是非題',
      questionState: '',
      value: true,
      releaseTime: '',
      correctRate: 0,
    }
    this.onPressSubmit = this.onPressSubmit.bind(this)
  }
  onPressSubmit = () => {
    const {
      classMenu,
      courseName,
      classListAction,
      multiPeer,
    } = this.props

    const timestampRightNow = getTime()
    const courseData = classMenu.classList.filter(item => item.title === courseName)[0]
    if (typeof courseData.quizHistory === 'undefined') courseData.quizHistory = []
    const hashID = getHash({
      courseName,
      timestampRightNow,
      questionIndex: courseData.quizHistory.length,
    }).toString()
    this.setState({ questionID: hashID, releaseTime: timestampRightNow })
    courseData.quizHistory.push(this.state)
    classListAction.modify(courseData, courseName)

    const keysInThisCourse = Object.keys(multiPeer.courses[courseName])
    const keysOnline = keysInThisCourse.filter(it =>
      multiPeer.peers[it].online && multiPeer.peers[it].info.course === courseName)
    const data = {
      messageType: 'QUESTION_DEBUT',
      courseName,
      questionID: hashID,
      questionType: this.state.questionType,
      questionState: this.state.questionState,
      releaseTime: timestampRightNow,
    }
    this.props.multiPeerAction.sendData(keysOnline, data)

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
  multiPeerAction: PropTypes.shape({
    sendData: PropTypes.func.isRequired,
  }).isRequired,
  classMenu: PropTypes.object.isRequired,
  courseName: PropTypes.string.isRequired,
  classList: PropTypes.array.isRequired,
  course: PropTypes.object.isRequired,
  status: PropTypes.string.isRequired,
  classListAction: PropTypes.object.isRequired,
  multiPeer: PropTypes.shape({
    courses: PropTypes.object.isRequired,
    peers: PropTypes.object.isRequired,
  }).isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(TrueFalse)
