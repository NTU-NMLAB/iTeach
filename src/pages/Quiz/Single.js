import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, TouchableOpacity } from 'react-native'
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


class Single extends Component {
  render() {
    const questionType = '單選題'
    const submit = '發布'
    return (
      <View style={styles.container}>
        <Appbar title={questionType}
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
              網多實驗課的實驗室位置？
            </Text>
          </View>
          <View style={styles.singleAnswer}>
            <Text style={styles.text}>
              正確選項： 電二137
            </Text>
          </View>
          <View style={styles.singleAnswer}>
            <Text style={styles.text}>
              錯誤選項： 電二138
            </Text>
          </View>
          <View style={styles.singleAnswer}>
            <Text style={styles.text}>
              錯誤選項： 電二136
            </Text>
          </View>
          <View style={styles.singleAnswer}>
            <Text style={styles.text}>
              錯誤選項： 電二135
            </Text>
          </View>
          <TouchableOpacity
            style={styles.singlesubmitCon}
            onPress={this.onPress}
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

Single.propTypes = {
  navAction: PropTypes.shape({
    openDrawer: PropTypes.func.isRequired,
    onExit: PropTypes.func.isRequired,
  }).isRequired,
  course: PropTypes.object.isRequired,
  quizItem: PropTypes.object,
  status: PropTypes.string.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(Single)
