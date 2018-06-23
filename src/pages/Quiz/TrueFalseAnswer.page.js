import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, Switch } from 'react-native'
import PropTypes from 'prop-types'
import CloseImage from '../../../asset/close.png'
import styles from '../styles/Question.style'
import navAction from '../../actions/nav.action'
import Appbar from '../../components/Appbar.component'
import quizItemAction from '../../actions/quizItem.action'
import Button from '../../components/Button.component'

const mapDispatchToProps = dispatch => ({
  navAction: {
    onExit: () => { dispatch(navAction.quizMainPage()) },
  },
  quizItemAction: {
    update: (reply) => { dispatch(quizItemAction.update(reply)) },
    answer: (reply, toWhom) => { dispatch(quizItemAction.answer(reply, toWhom)) },
  },
})


class TrueFalseAnswerPage extends Component {
  constructor() {
    super()
    this.state = { value: true }
  }
  componentDidMount() {
    let stateDraft = {}
    const { quizData } = this.props.navigation.state.params
    if (quizData.answerState !== 'unAnswered') stateDraft = { value: quizData.answer[0] }
    this.setState(stateDraft)
  }

  onPressSubmit = () => {
    const { quizData } = this.props.navigation.state.params
    const dataToSave = { courseName: quizData.courseName, questionID: quizData.questionID }
    switch (quizData.answerState) {
    case 'Checked':
      return
    case 'unAnswered':
      dataToSave.answerState = 'Answered'
      dataToSave.answer = []
      dataToSave.answer.push(this.state.value)
      this.props.quizItemAction.update(dataToSave)
      break
    default:
    }
    this.props.quizItemAction.answer(dataToSave, quizData.senderId)
    this.props.navAction.onExit()
  }
  render() {
    const title = '是非題'
    const { quizData } = { ...this.props.navigation.state.params }
    const submit = (quizData.answerState === 'unAnswered') ? '提交答案' : '重新送出'
    const invalidPress = (quizData.answerState === 'Checked')
    return (
      <View style={styles.container}>
        <Appbar title={title} withDrawer
          rightIcon={CloseImage}
          onRightPress={this.props.navAction.onExit}/>
        <View style={styles.listContainer}>
          <View style={styles.questionTitle}>
            <Text style={styles.text}>
              題目內容：
            </Text>
          </View>
          <View style={styles.questionContext}>
            <Text style={styles.text}>
              { quizData.questionState }
            </Text>
          </View>
          <View style={styles.truefalseAnswer}>
            <Text style={styles.text}>
              答案：   否  <Switch style={styles.switch} value={this.state.value}
                onValueChange={ (value) => {
                  if (quizData.answerState === 'unAnswered') this.setState({ value })
                }} />  是
            </Text>
          </View>
          <View style={styles.truefalsesubmitCon}></View>
          <View style={styles.truefalsesubmitCon}>
            <Button label={submit} onPress={this.onPressSubmit} invalid={invalidPress}/>
          </View>
        </View>
      </View>
    )
  }
}

TrueFalseAnswerPage.propTypes = {
  navAction: PropTypes.shape({
    onExit: PropTypes.func.isRequired,
  }).isRequired,
  quizItemAction: PropTypes.shape({
    update: PropTypes.func.isRequired,
    answer: PropTypes.func.isRequired,
  }).isRequired,
  navigation: PropTypes.shape({
    state: PropTypes.shape({
      params: PropTypes.shape({
        quizData: PropTypes.object.isRequired,
      }),
    }),
  }),
}

export default connect(undefined, mapDispatchToProps)(TrueFalseAnswerPage)
