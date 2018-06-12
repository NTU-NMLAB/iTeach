import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, Switch, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import CloseImage from '../../../asset/close.png'
import styles from '../styles/Question.styles'
import navAction from '../../actions/nav.action'
import Appbar from '../../components/Appbar'

const mapStateToProps = state => ({
  status: state.account.status,
  ...state,
})

const mapDispatchToProps = dispatch => ({
  navAction: {
    openDrawer: () => { dispatch(navAction.openDrawer()) },
    onExit: () => { dispatch(navAction.quizMainPage()) },
  },
})


class TrueFalseAnswerPage extends Component {
  constructor() {
    super()
    this.state = {
      value: true,
    }
    // this.onPressSubmit = this.onPressSubmit.bind(this)
  }

  render() {
    const title = '是非題'
    const submit = '提交'
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
              網多實驗課又涼又甜？
            </Text>
          </View>
          <View style={styles.truefalseAnswer}>
            <Text style={styles.text}>
              答案：   是  <Switch style={styles.switch} value={this.state.value}
                onValueChange={ value => this.setState({ value })} />  否
            </Text>
          </View>
          <TouchableOpacity
            style={styles.truefalsesubmitCon}
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

TrueFalseAnswerPage.propTypes = {
  navAction: PropTypes.shape({
    openDrawer: PropTypes.func.isRequired,
    onExit: PropTypes.func.isRequired,
  }).isRequired,
  status: PropTypes.string.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(TrueFalseAnswerPage)
