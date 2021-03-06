import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  View,
  Text,
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
import Button from '../../components/Button'

const mapStateToProps = state => ({
  status: state.account.status,
  courseName: state.course.courseName,
  course: state.course,
  classMenu: state.classMenu,
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
    const courseData = classMenu.classList.find(item => item.title === courseName)
    const hashID = getHash({
      courseName,
      timestampRightNow,
      questionIndex: courseData.quizHistory.length,
    }).toString()
    courseData.quizHistory.push({ ...this.state, questionID: hashID, releaseTime: timestampRightNow })
    classListAction.modify(courseData, courseName)

    let keysInThisCourse = []
    if (typeof multiPeer.courses[courseName] !== 'undefined') {
      keysInThisCourse = Object.keys(multiPeer.courses[courseName])
    }
    const keysOnline = keysInThisCourse.filter(it =>
      multiPeer.peers[it].online && multiPeer.peers[it].info.course === courseName)
    const data = {
      messageType: 'QUESTION_DEBUT',
      courseName,
      questionID: hashID,
      questionType: this.state.questionType,
      questionState: this.state.questionState,
      releaseTime: timestampRightNow,
      options: [
        this.state.rightAns,
        this.state.wrongAns1,
        this.state.wrongAns2,
        this.state.wrongAns3,
      ],
    }

    const randIndex = Math.floor(Math.random() * Math.floor(4))
    const tmpStr = data.options[randIndex]
    data.options[randIndex] = this.state.rightAns
    data.options[0] = tmpStr
    this.props.multiPeerAction.sendData(keysOnline, data)

    this.props.navAction.historyRecord()
  }

  render() {
    const questionType = '單選題'
    const submit = '發佈問題'
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
          <View style={styles.singlesubmitCon}></View>
          <Button label={submit} onPress={this.onPressSubmit}/>
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
  multiPeerAction: PropTypes.shape({
    sendData: PropTypes.func.isRequired,
  }).isRequired,
  classMenu: PropTypes.object.isRequired,
  courseName: PropTypes.string.isRequired,
  course: PropTypes.object.isRequired,
  classList: PropTypes.array.isRequired,
  classListAction: PropTypes.object.isRequired,
  status: PropTypes.string.isRequired,
  multiPeer: PropTypes.shape({
    courses: PropTypes.object.isRequired,
    peers: PropTypes.object.isRequired,
  }).isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(Single)
