import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, TouchableOpacity } from 'react-native'
import CircleCheckBox, { LABEL_POSITION } from 'react-native-circle-checkbox'
import PropTypes from 'prop-types'
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


class SingleAnswerPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      check1: false,
      check2: false,
      check3: false,
      check4: false
    }
    this.click1 = this.click1.bind(this)
    this.click2 = this.click2.bind(this)
    this.click3 = this.click3.bind(this)
    this.click4 = this.click4.bind(this)
    // this.onPressSubmit = this.onPressSubmit.bind(this)
  }
  // onPressSubmit = () => {
  //   const courseData =
  //     this.props.classMenu.classList.filter(item => item.title === this.props.courseName)[0]
  //   if (courseData.quizHistory === undefined) {
  //     courseData.quizHistory = [this.state]
  //   } else {
  //     courseData.quizHistory.push(this.state)
  //   }
  //   courseData.quizHistory[courseData.quizHistory.length - 1].releaseTime
  //     = getTime()
  //   this.props.classListAction.modify(courseData)
  //   this.props.navAction.historyRecord()
  // }
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
    const courseData =
      this.props.classMenu.classList.filter(item => item.title === this.props.courseName)[0]
    const data = courseData.studentQuizHistory.filter(item => item.questionType === title)
    const rdata = data[data.length - 1]
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
              { rdata.questionState }
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
              { rdata.options[0].description }
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
              { rdata.options[1].description }
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
              { rdata.options[2].description }
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
              { rdata.options[3].description }
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
    openDrawer: PropTypes.func.isRequired,
    onExit: PropTypes.func.isRequired,
  }).isRequired,
  status: PropTypes.string.isRequired,
  classMenu: PropTypes.object.isRequired,
  courseName: PropTypes.string.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleAnswerPage)
