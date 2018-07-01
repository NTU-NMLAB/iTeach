import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text } from 'react-native'
import CircleCheckBox, { LABEL_POSITION } from 'react-native-circle-checkbox'
import PropTypes from 'prop-types'
import CloseImage from '../../../asset/close.png'
import styles from '../styles/Quiz.style'
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


class SingleAnswerPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      check1: false,
      check2: false,
      check3: false,
      check4: false,
    }
    this.click1 = this.click1.bind(this)
    this.click2 = this.click2.bind(this)
    this.click3 = this.click3.bind(this)
    this.click4 = this.click4.bind(this)
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
  onPressSubmit = () => {
    const { quizData } = this.props.navigation.state.params
    const dataToSave = { courseId: quizData.courseId, questionID: quizData.questionID }
    switch (quizData.answerState) {
    case 'Checked':
      return
    case 'unAnswered':
      dataToSave.answerState = 'Answered'
      dataToSave.answer = []
      for (let it = 1; it < 5; it += 1) if (this.state[`check${it}`]) dataToSave.answer.push(it - 1)
      this.props.quizItemAction.update(dataToSave)
      break
    default:
    }
    this.props.quizItemAction.answer(dataToSave, quizData.senderUserId)
    this.props.navAction.onExit()
  }
  click1 = () => {
    const { quizData } = this.props.navigation.state.params
    if (quizData.answerState !== 'unAnswered') return
    this.setState({
      check1: true,
      check2: false,
      check3: false,
      check4: false,
    })
  }

  click2 = () => {
    const { quizData } = this.props.navigation.state.params
    if (quizData.answerState !== 'unAnswered') return
    this.setState({
      check1: false,
      check2: true,
      check3: false,
      check4: false,
    })
  }

  click3 = () => {
    const { quizData } = this.props.navigation.state.params
    if (quizData.answerState !== 'unAnswered') return
    this.setState({
      check1: false,
      check2: false,
      check3: true,
      check4: false,
    })
  }

  click4 = () => {
    const { quizData } = this.props.navigation.state.params
    if (quizData.answerState !== 'unAnswered') return
    this.setState({
      check1: false,
      check2: false,
      check3: false,
      check4: true,
    })
  }
  render() {
    const title = '單選題'
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
          <View style={styles.singleAnswer}>
            <CircleCheckBox
              checked={ this.state.check1 }
              onToggle={ this.click1 }
              labelPosition={LABEL_POSITION.RIGHT}
              label=" "
              outerColor="#3A8FB7"
              innerColor="#3A8FB7"
            />
            <Text style={styles.text}>
              { quizData.options[0] }
            </Text>
          </View>
          <View style={styles.singleAnswer}>
            <CircleCheckBox
              checked={ this.state.check2 }
              onToggle={ this.click2 }
              labelPosition={LABEL_POSITION.RIGHT}
              label=" "
              outerColor="#3A8FB7"
              innerColor="#3A8FB7"
            />
            <Text style={styles.text}>
              { quizData.options[1] }
            </Text>
          </View>
          <View style={styles.singleAnswer}>
            <CircleCheckBox
              checked={ this.state.check3 }
              onToggle={ this.click3 }
              labelPosition={LABEL_POSITION.RIGHT}
              label=" "
              outerColor="#3A8FB7"
              innerColor="#3A8FB7"
            />
            <Text style={styles.text}>
              { quizData.options[2] }
            </Text>
          </View>
          <View style={styles.singleAnswer}>
            <CircleCheckBox
              checked={ this.state.check4}
              onToggle={ this.click4 }
              labelPosition={LABEL_POSITION.RIGHT}
              label=" "
              outerColor="#3A8FB7"
              innerColor="#3A8FB7"
            />
            <Text style={styles.text}>
              { quizData.options[3] }
            </Text>
          </View>
          <View style={styles.singlesubmitCon}></View>
          <Button label={submit} onPress={this.onPressSubmit} invalid={invalidPress}/>
        </View>
      </View>
    )
  }
}

SingleAnswerPage.propTypes = {
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

export default connect(undefined, mapDispatchToProps)(SingleAnswerPage)
