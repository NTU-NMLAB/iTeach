import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, TouchableOpacity } from 'react-native'
import CircleCheckBox, { LABEL_POSITION } from 'react-native-circle-checkbox'
import PropTypes from 'prop-types'
import CloseImage from '../../../asset/close.png'
import styles from '../styles/Question.styles'
import navAction from '../../actions/nav.action'
import Appbar from '../../components/Appbar'

const mapDispatchToProps = dispatch => ({
  navAction: {
    onExit: () => { dispatch(navAction.quizMainPage()) },
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
  click1 = () => {
    if (this.state.check1 === true) {
      this.setState({
        check1: true,
      })
    } else if (this.state.check2 === true) {
      this.setState({
        check1: true,
        check2: false,
      })
    } else if (this.state.check3 === true) {
      this.setState({
        check1: true,
        check3: false,
      })
    } else if (this.state.check4 === true) {
      this.setState({
        check1: true,
        check4: false,
      })
    } else {
      this.setState({
        check1: true,
      })
    }
  }

  click2 = () => {
    if (this.state.check1 === true) {
      this.setState({
        check1: false,
        check2: true,
      })
    } else if (this.state.check2 === true) {
      this.setState({
        check2: true,
      })
    } else if (this.state.check3 === true) {
      this.setState({
        check2: true,
        check3: false,
      })
    } else if (this.state.check4 === true) {
      this.setState({
        check2: true,
        check4: false,
      })
    } else {
      this.setState({
        check2: true,
      })
    }
  }

  click3 = () => {
    if (this.state.check1 === true) {
      this.setState({
        check1: false,
        check3: true,
      })
    } else if (this.state.check2 === true) {
      this.setState({
        check3: true,
        check2: false,
      })
    } else if (this.state.check3 === true) {
      this.setState({
        check3: true,
      })
    } else if (this.state.check4 === true) {
      this.setState({
        check3: true,
        check4: false,
      })
    } else {
      this.setState({
        check3: true,
      })
    }
  }

  click4 = () => {
    if (this.state.check1 === true) {
      this.setState({
        check1: false,
        check4: true,
      })
    } else if (this.state.check2 === true) {
      this.setState({
        check4: true,
        check2: false,
      })
    } else if (this.state.check3 === true) {
      this.setState({
        check4: true,
        check3: false,
      })
    } else if (this.state.check4 === true) {
      this.setState({
        check4: true,
      })
    } else {
      this.setState({
        check4: true,
      })
    }
  }
  render() {
    const title = '單選題'
    const submit = '提交'
    const { quizData } = { ...this.props.navigation.state.params }
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

SingleAnswerPage.propTypes = {
  navAction: PropTypes.shape({
    onExit: PropTypes.func.isRequired,
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
