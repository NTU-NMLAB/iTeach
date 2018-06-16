import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import CheckBox from 'react-native-check-box'
import CloseImage from '../../../asset/close.png'
import styles from '../styles/Question.styles'
import navAction from '../../actions/nav.action'
import Appbar from '../../components/Appbar'

const mapStateToProps = state => ({
  status: state.account.status,
  courseName: state.course.courseName,
  ...state,
})

const mapDispatchToProps = dispatch => ({
  navAction: {
    openDrawer: () => { dispatch(navAction.openDrawer()) },
    onExit: () => { dispatch(navAction.quizMainPage()) },
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
    // this.onPressSubmit = this.onPressSubmit.bind(this)
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
  render() {
    const title = '多選題'
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
          <View style={styles.multiAnswer}>
            <CheckBox isChecked={ this.state.check1 } checkBoxColor='#3A8FB7' onClick={ this.onClick1}/>
            <Text style={styles.textmulti}>
              { quizData.options[0].description }
            </Text>
          </View>
          <View style={styles.multiAnswer}>
            <CheckBox isChecked={ this.state.check2 } checkBoxColor='#3A8FB7' onClick={ this.onClick2}/>
            <Text style={styles.textmulti}>
              { quizData.options[1].description }
            </Text>
          </View>
          <View style={styles.multiAnswer}>
            <CheckBox isChecked={ this.state.check3 } checkBoxColor='#3A8FB7' onClick={ this.onClick3}/>
            <Text style={styles.textmulti}>
              { quizData.options[2].description }
            </Text>
          </View>
          <View style={styles.multiAnswer}>
            <CheckBox isChecked={ this.state.check4 } checkBoxColor='#3A8FB7' onClick={ this.onClick4}/>
            <Text style={styles.textmulti}>
              { quizData.options[3].description }
            </Text>
          </View>
          <View style={styles.multiAnswer}>
            <CheckBox isChecked={ this.state.check5 } checkBoxColor='#3A8FB7' onClick={ this.onClick5}/>
            <Text style={styles.textmulti}>
              { quizData.options[4].description }
            </Text>
          </View>
          <TouchableOpacity
            style={styles.multisubmitCon}
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

MultiAnswerPage.propTypes = {
  navAction: PropTypes.shape({
    openDrawer: PropTypes.func.isRequired,
    onExit: PropTypes.func.isRequired,
  }).isRequired,
  navigation: PropTypes.shape({
    state: PropTypes.shape({
      params: PropTypes.shape({
        quizData: PropTypes.object.isRequired,
      }),
    }),
  }),
  status: PropTypes.string.isRequired,
  classMenu: PropTypes.object.isRequired,
  courseName: PropTypes.string.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(MultiAnswerPage)
