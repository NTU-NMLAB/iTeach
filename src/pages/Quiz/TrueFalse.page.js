import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  View,
  Text,
  Switch,
  TextInput,
} from 'react-native'
import PropTypes from 'prop-types'
import CloseImage from '../../../asset/close.png'
import styles from '../styles/Question.style'
import navAction from '../../actions/nav.action'
import Appbar from '../../components/Appbar.component'
import classMenuAction from '../../actions/classMenu.action'
import getTime from '../../util/getTime'
import multiPeerAction from '../../actions/multiPeer.action'
import getHash from '../../util/getHash'
import Button from '../../components/Button.component'

const mapStateToProps = state => ({
  multiPeer: state.multiPeer,
})

const mapDispatchToProps = dispatch => ({
  navAction: {
    openDrawer: () => { dispatch(navAction.openDrawer()) },
    onExit: () => { dispatch(navAction.quizMainPage()) },
    historyRecord: () => { dispatch(navAction.historyRecord()) },
  },
  classListAction: {
    modify: (courseData) => {
      dispatch(classMenuAction.classList.modify(courseData))
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
      questionType: '是非題',
      questionState: '',
      value: true,
      correctRate: 0,
    }
    this.onPressSubmit = this.onPressSubmit.bind(this)
  }
  onPressSubmit = () => {
    const {
      classListAction,
      multiPeer,
    } = this.props
    const { currCourseData } = this.props.navigation.state.params
    const timestampRightNow = getTime()
    const hashID = getHash({
      courseId: currCourseData.courseId,
      timestampRightNow,
      questionIndex: currCourseData.quizHistory.length,
    }).toString()
    currCourseData.quizHistory.push({
      ...this.state,
      questionID: hashID,
      releaseTime: timestampRightNow,
    })
    classListAction.modify(currCourseData)

    let keysInThisCourse = []
    if (typeof multiPeer.courses[currCourseData.courseId] !== 'undefined') {
      keysInThisCourse = Object.keys(multiPeer.courses[currCourseData.courseId])
    }
    const keysOnline = keysInThisCourse.filter(it =>
      multiPeer.peers[it].online && multiPeer.peers[it].info.currCourseId === currCourseData.courseId)
    const data = {
      messageType: 'QUESTION_DEBUT',
      courseId: currCourseData.courseId,
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
          <View style={styles.truefalseAnswer}>
            <Text style={styles.text}>
              正確答案：   否  <Switch style={styles.switch} value={this.state.value}
                onValueChange={ value => this.setState({ value })} />  是
            </Text>
          </View>
          <View style={styles.truefalsesubmitCon}></View>
          <View style={styles.truefalsesubmitCon}>
            <Button label={submit} onPress={this.onPressSubmit}/>
          </View>
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
  classListAction: PropTypes.object.isRequired,
  multiPeer: PropTypes.shape({
    courses: PropTypes.object.isRequired,
    peers: PropTypes.object.isRequired,
  }).isRequired,
  navigation: PropTypes.shape({
    state: PropTypes.shape({
      params: PropTypes.shape({
        currCourseData: PropTypes.object.isRequired,
      }),
    }),
  }),
}

export default connect(mapStateToProps, mapDispatchToProps)(TrueFalse)
