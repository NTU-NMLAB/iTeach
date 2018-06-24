import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  View,
  Text,
  TextInput,
} from 'react-native'
import PropTypes from 'prop-types'
import CheckBox from 'react-native-check-box'
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


class Multi extends Component {
  constructor() {
    super()
    this.state = {
      questionType: '多選題',
      questionState: '',
      ans1State: '',
      ans2State: '',
      ans3State: '',
      ans4State: '',
      ans5State: '',
      check1: false,
      check2: false,
      check3: false,
      check4: false,
      check5: false,
      correctRate: 0,
    }
    this.onClick1 = this.onClick1.bind(this)
    this.onClick2 = this.onClick2.bind(this)
    this.onClick3 = this.onClick3.bind(this)
    this.onClick4 = this.onClick4.bind(this)
    this.onClick5 = this.onClick5.bind(this)
    this.onPressSubmit = this.onPressSubmit.bind(this)
  }
  onClick1 = () => {
    this.setState({
      check1: !this.state.check1,
    })
  }
  onClick2 = () => {
    this.setState({
      check2: !this.state.check2,
    })
  }
  onClick3 = () => {
    this.setState({
      check3: !this.state.check3,
    })
  }
  onClick4 = () => {
    this.setState({
      check4: !this.state.check4,
    })
  }
  onClick5 = () => {
    this.setState({
      check5: !this.state.check5,
    })
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
      options: [
        this.state.ans1State,
        this.state.ans2State,
        this.state.ans3State,
        this.state.ans4State,
        this.state.ans5State,
      ],
    }
    this.props.multiPeerAction.sendData(keysOnline, data)

    this.props.navAction.historyRecord()
  }


  render() {
    const questionType = '多選題'
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
          <View style={styles.multiAnswer}>
            <Text style={styles.text}>
              選項：
            </Text>
            <TextInput
              style={styles.singleInput}
              onChangeText={(ans1State) => { this.setState({ ans1State }) }}
              value={this.state.ans1State}
              placeholder='選項'
            />
            <Text style={styles.cbContainer}>
              正確？<CheckBox isChecked={this.state.check1} checkBoxColor='#3A8FB7' onClick={this.onClick1}/>
            </Text>
          </View>
          <View style={styles.multiAnswer}>
            <Text style={styles.text}>
              選項：
            </Text>
            <TextInput
              style={styles.singleInput}
              onChangeText={(ans2State) => { this.setState({ ans2State }) }}
              value={this.state.ans2State}
              placeholder='選項'
            />
            <Text style={styles.cbContainer}>
              正確？<CheckBox isChecked={this.state.check2} checkBoxColor='#3A8FB7' onClick={this.onClick2}/>
            </Text>
          </View>
          <View style={styles.multiAnswer}>
            <Text style={styles.text}>
              選項：
            </Text>
            <TextInput
              style={styles.singleInput}
              onChangeText={(ans3State) => { this.setState({ ans3State }) }}
              value={this.state.ans3State}
              placeholder='選項'
            />
            <Text style={styles.cbContainer}>
              正確？<CheckBox isChecked={this.state.check3} checkBoxColor='#3A8FB7' onClick={this.onClick3}/>
            </Text>
          </View>
          <View style={styles.multiAnswer}>
            <Text style={styles.text}>
              選項：
            </Text>
            <TextInput
              style={styles.singleInput}
              onChangeText={(ans4State) => { this.setState({ ans4State }) }}
              value={this.state.ans4State}
              placeholder='選項'
            />
            <Text style={styles.cbContainer}>
              正確？<CheckBox isChecked={this.state.check4} checkBoxColor='#3A8FB7' onClick={this.onClick4}/>
            </Text>
          </View>
          <View style={styles.multiAnswer}>
            <Text style={styles.text}>
              選項：
            </Text>
            <TextInput
              style={styles.singleInput}
              onChangeText={(ans5State) => { this.setState({ ans5State }) }}
              value={this.state.ans5State}
              placeholder='選項'
            />
            <Text style={styles.cbContainer}>
              正確？<CheckBox isChecked={this.state.check5} checkBoxColor='#3A8FB7' onClick={this.onClick5}/>
            </Text>
          </View>
          <View style={styles.multisubmitCon}></View>
          <Button label={submit} onPress={this.onPressSubmit}/>
        </View>
      </View>
    )
  }
}

Multi.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(Multi)
