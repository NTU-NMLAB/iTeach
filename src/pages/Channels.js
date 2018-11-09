import React, { Component } from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import navAction from '../actions/nav.action'
import styles from './styles/ClassMenu.styles'
import Appbar from '../components/Appbar'

const mapDispatchToProps = dispatch => ({
  navAction: {
    openDrawer: () => { dispatch(navAction.openDrawer()) },
  },
})

class Channels extends Component {
  render() {
    return <View style={styles.container}>
      <Appbar title='切換頻道的頁面' withDrawer/>
    </View>
  }
}

Channels.propTypes = {
  navAction: PropTypes.shape({
    openDrawer: PropTypes.func.isRequired,
  }).isRequired,
}

export default connect(null, mapDispatchToProps)(Channels)
