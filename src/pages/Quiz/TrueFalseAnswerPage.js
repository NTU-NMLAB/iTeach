import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text } from 'react-native'
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
  render() {
    const title = '是非題'
    return (
      <View style={styles.container}>
        <Appbar title={title} withDrawer
          rightIcon={CloseImage}
          onRightPress={this.props.navAction.onExit}/>
        <View style={styles.textContainer}>
          <Text style={styles.text}>
            歡迎進入是非題
          </Text>
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
