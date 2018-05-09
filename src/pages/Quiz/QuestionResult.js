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
    onExit: () => { dispatch(navAction.enterQuestion(4)) },
  },
})


class Stat extends Component {
  render() {
    const title = '統計結果'
    return (
      <View style={styles.container}>
        <Appbar title={title}
          rightIcon={CloseImage}
          onRightPress={this.props.navAction.onExit}/>
        <View style={styles.textContainer}>
          <Text style={styles.text}>
            歡迎進入統計結果
          </Text>
        </View>
      </View>
    )
  }
}

Stat.propTypes = {
  navAction: PropTypes.shape({
    openDrawer: PropTypes.func.isRequired,
    onExit: PropTypes.func.isRequired,
  }).isRequired,
  status: PropTypes.string.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(Stat)
