import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text } from 'react-native'
import PropTypes from 'prop-types'
import CheckBox from 'react-native-check-box'
import CloseImage from '../../../asset/close.png'
import styles from '../styles/Question.styles'
import navAction from '../../actions/nav.action'
import quizItemAction from '../../actions/quizItem.action'
import Appbar from '../../components/Appbar'
import Button from '../../components/Button'

const mapDispatchToProps = dispatch => ({
  navAction: {
    onExit: () => { dispatch(navAction.quizMainPage()) },
  },
  quizItemAction: {
    update: (reply) => { dispatch(quizItemAction.update(reply)) },
    answer: (reply, toWhom) => { dispatch(quizItemAction.answer(reply, toWhom)) },
  },
})


class MultiAnswerPage extends Component {
  constructor() {
    super()
    this.state = {
      check1: false,
      check2: false,
      check3: false,
      check4: false,
      check5: false,
    }
    this.onClick1 = this.onClick1.bind(this)
    this.onClick2 = this.onClick2.bind(this)
    this.onClick3 = this.onClick3.bind(this)
    this.onClick4 = this.onClick4.bind(this)
    this.onClick5 = this.onClick5.bind(this)
  }

  componentDidMount() {
    const stateDraft = {}
    const { quizData } = this.props.navigation.state.params
    if (quizData.answerState !== 'unAnswered') {
      quizData.answer.forEach((it) => {
        stateDraft[`check${it + 1}`] = true
      })
    }
    this.setState(stateDraft)
  }

  onClick1 = () => {
    const { quizData } = this.props.navigation.state.params
    if (quizData.answerState !== 'unAnswered') return
    this.setState({
      check1: !this.state.check1,
    })
  }
  onClick2 = () => {
    const { quizData } = this.props.navigation.state.params
    if (quizData.answerState !== 'unAnswered') return
    this.setState({
      check2: !this.state.check2,
    })
  }
  onClick3 = () => {
    const { quizData } = this.props.navigation.state.params
    if (quizData.answerState !== 'unAnswered') return
    this.setState({
      check3: !this.state.check3,
    })
  }
  onClick4 = () => {
    const { quizData } = this.props.navigation.state.params
    if (quizData.answerState !== 'unAnswered') return
    this.setState({
      check4: !this.state.check4,
    })
  }
  onClick5 = () => {
    const { quizData } = this.props.navigation.state.params
    if (quizData.answerState !== 'unAnswered') return
    this.setState({
      check5: !this.state.check5,
    })
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
      for (let it = 1; it < 6; it += 1) if (this.state[`check${it}`]) dataToSave.answer.push(it - 1)
      this.props.quizItemAction.update(dataToSave)
      break
    default:
    }
    this.props.quizItemAction.answer(dataToSave, quizData.senderId)
    this.props.navAction.onExit()
  }
  render() {
    const title = '多選題'
    const { quizData } = this.props.navigation.state.params
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
          <View style={styles.multiAnswer}>
            <CheckBox isChecked={ this.state.check1 } checkBoxColor='#3A8FB7' onClick={ this.onClick1 }/>
            <Text style={styles.textmulti}>
              { quizData.options[0] }
            </Text>
          </View>
          <View style={styles.multiAnswer}>
            <CheckBox isChecked={ this.state.check2 } checkBoxColor='#3A8FB7' onClick={ this.onClick2 }/>
            <Text style={styles.textmulti}>
              { quizData.options[1] }
            </Text>
          </View>
          <View style={styles.multiAnswer}>
            <CheckBox isChecked={ this.state.check3 } checkBoxColor='#3A8FB7' onClick={ this.onClick3 }/>
            <Text style={styles.textmulti}>
              { quizData.options[2] }
            </Text>
          </View>
          <View style={styles.multiAnswer}>
            <CheckBox isChecked={ this.state.check4 } checkBoxColor='#3A8FB7' onClick={ this.onClick4 }/>
            <Text style={styles.textmulti}>
              { quizData.options[3] }
            </Text>
          </View>
          <View style={styles.multiAnswer}>
            <CheckBox isChecked={ this.state.check5 } checkBoxColor='#3A8FB7' onClick={ this.onClick5 }/>
            <Text style={styles.textmulti}>
              { quizData.options[4] }
            </Text>
          </View>
          <Button label={submit} onPress={this.onPressSubmit} invalid={invalidPress}/>
        </View>
      </View>
    )
  }
}

MultiAnswerPage.propTypes = {
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

export default connect(undefined, mapDispatchToProps)(MultiAnswerPage)
