import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import CloseImage from '../../../asset/close.png'
import styles from '../styles/Quiz.style'
import navAction from '../../actions/nav.action'
import Appbar from '../../components/Appbar.component'
import getTime from '../../util/getTime'
import multiPeerAction from '../../actions/multiPeer.action'
import getHash from '../../util/getHash'
import TrueFalseCreate from '../../components/QuizTrueFalseCreate.component'
import SingleCreate from '../../components/QuizSingleCreate.component'
import MultiCreate from '../../components/QuizMultiCreate.component'
import ShortDescriptionCreate from '../../components/QuizShortDescriptionCreate.component'
import QuizItemData from '../../components/QuizItemData.const'

const mapStateToProps = state => ({
  multiPeer: state.multiPeer, // will be removed soon
}) // will be removed soon

const mapDispatchToProps = dispatch => ({
  navAction: {
    onExit: () => { dispatch(navAction.quizMainPage()) },
    historyRecord: () => { dispatch(navAction.historyRecord()) },
  },
  multiPeerAction: {
    sendData: (recipients, data) => {
      dispatch(multiPeerAction.backend.sendData(recipients, data, () => {}))
    },
  }, // will be removed soon
})

class QuestionCreate extends Component {
  constructor(props) {
    super(props)
    this.state = {
      questionState: '',
      trueFalse: { value: true },
      single: {
        rightAns: '', wrongAns1: '', wrongAns2: '', wrongAns3: '',
      },
      multi: {
        ans1State: '', ans2State: '', ans3State: '', ans4State: '', ans5State: '', check1: false, check2: false, check3: false, check4: false, check5: false,
      },
    }
  }
  onPressSubmit = () => {
    const {
      multiPeer,
    } = this.props
    const {
      quizItemId,
      quizData,
      currCourseData,
    } = { ...this.props.navigation.state.params }
    const timestampRightNow = getTime()
    const hashID = getHash({
      title: currCourseData.title,
      timestampRightNow,
      questionIndex: currCourseData.quizHistory.length,
    }).toString()
    currCourseData.quizHistory.push({
      ...this.state,
      questionType: QuizItemData[quizItemId].title,
      questionID: hashID,
      releaseTime: timestampRightNow,
      studentAnswers: [],
      quizItemId,
    })
    quizData.courseListModify(currCourseData)


    const peerIdsOnline = currCourseData.userIds
      .filter(userId => (userId in multiPeer.peersStatus) && multiPeer.peersStatus[userId].connected)
      .map(userId => multiPeer.peersStatus[userId].currPeerId)

    const data = {
      messageType: 'QUESTION_DEBUT',
      courseId: currCourseData.courseId,
      questionID: hashID,
      questionType: QuizItemData[quizItemId].title,
      questionState: this.state.questionState,
      releaseTime: timestampRightNow,
    }
    let randIndex = 0
    let tmpStr = ''
    let tmpOptions = []
    switch (quizItemId) {
    case 1: // Single
      tmpOptions = [
        this.state.single.rightAns,
        this.state.single.wrongAns1,
        this.state.single.wrongAns2,
        this.state.single.wrongAns3,
      ]
      randIndex = Math.floor(Math.random() * Math.floor(4))
      tmpStr = tmpOptions[randIndex]
      tmpOptions[randIndex] = this.state.single.rightAns
      tmpOptions[0] = tmpStr
      data.options = tmpOptions
      break
    case 2: // Multi
      data.options = [
        this.state.multi.ans1State,
        this.state.multi.ans2State,
        this.state.multi.ans3State,
        this.state.multi.ans4State,
        this.state.multi.ans5State,
      ]
      break
    default:
      break
    }
    this.props.multiPeerAction.sendData(peerIdsOnline, data)

    this.props.navAction.historyRecord()
  }

  renderDumbComponent() {
    const { quizItemId } = this.props.navigation.state.params
    switch (quizItemId) {
    case 0: // TrueFalse
      return <TrueFalseCreate
        questionState={this.state.questionState}
        answerValue={this.state.trueFalse.value}
        onChangeCallbacks={{
          questionState: (questionState) => { this.setState({ questionState }) },
          answerValue: (value) => {
            this.setState({ trueFalse: { ...this.state.trueFalse, value } })
          },
        }}
        onPressSubmit={this.onPressSubmit}
      />
    case 1: // Single
      return <SingleCreate
        questionState={this.state.questionState}
        answerOptions={this.state.single}
        onChangeCallbacks={{
          questionState: (questionState) => { this.setState({ questionState }) },
          rightAns: (rightAns) => {
            this.setState({ single: { ...this.state.single, rightAns } })
          },
          wrongAns1: (wrongAns1) => {
            this.setState({ single: { ...this.state.single, wrongAns1 } })
          },
          wrongAns2: (wrongAns2) => {
            this.setState({ single: { ...this.state.single, wrongAns2 } })
          },
          wrongAns3: (wrongAns3) => {
            this.setState({ single: { ...this.state.single, wrongAns3 } })
          },
        }}
        onPressSubmit={this.onPressSubmit}
      />
    case 2: // Multi
      return <MultiCreate
        questionState={this.state.questionState}
        answerOptions={this.state.multi}
        onChangeCallbacks={{
          questionState: (questionState) => { this.setState({ questionState }) },
          ans1State: (ans1State) => {
            this.setState({ multi: { ...this.state.multi, ans1State } })
          },
          ans2State: (ans2State) => {
            this.setState({ multi: { ...this.state.multi, ans2State } })
          },
          ans3State: (ans3State) => {
            this.setState({ multi: { ...this.state.multi, ans3State } })
          },
          ans4State: (ans4State) => {
            this.setState({ multi: { ...this.state.multi, ans4State } })
          },
          ans5State: (ans5State) => {
            this.setState({ multi: { ...this.state.multi, ans5State } })
          },
        }}
        onClickCallbacks={{
          ans1Check: () => {
            this.setState({ multi: { ...this.state.multi, check1: !this.state.multi.check1 } })
          },
          ans2Check: () => {
            this.setState({ multi: { ...this.state.multi, check2: !this.state.multi.check2 } })
          },
          ans3Check: () => {
            this.setState({ multi: { ...this.state.multi, check3: !this.state.multi.check3 } })
          },
          ans4Check: () => {
            this.setState({ multi: { ...this.state.multi, check4: !this.state.multi.check4 } })
          },
          ans5Check: () => {
            this.setState({ multi: { ...this.state.multi, check5: !this.state.multi.check5 } })
          },
        }}
        onPressSubmit={this.onPressSubmit}
      />
    case 3: // ShortDescription
    default:
      return <ShortDescriptionCreate
        title={this.props.navigation.state.params.currCourseData.title}
      />
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Appbar title={QuizItemData[this.props.navigation.state.params.quizItemId].title} withDrawer
          rightIcon={CloseImage}
          onRightPress={this.props.navAction.onExit}/>
        { this.renderDumbComponent() }
      </View>
    )
  }
}

QuestionCreate.propTypes = {
  navAction: PropTypes.shape({
    onExit: PropTypes.func.isRequired,
    historyRecord: PropTypes.func.isRequired,
  }).isRequired,
  navigation: PropTypes.shape({
    state: PropTypes.shape({
      params: PropTypes.shape({
        quizItemId: PropTypes.number.isRequired,
        quizData: PropTypes.object.isRequired,
        currCourseData: PropTypes.object.isRequired,
      }),
    }),
  }),
  multiPeer: PropTypes.shape({
    peersStatus: PropTypes.object.isRequired,
  }).isRequired,
  multiPeerAction: PropTypes.shape({
    sendData: PropTypes.func.isRequired,
  }).isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionCreate)
