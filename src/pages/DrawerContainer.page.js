import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Text, View } from 'react-native'
import styles from './styles/DrawerContainer.style'
import navAction from '../actions/nav.action'

const mapStateToProps = state => ({
  username: state.profile.username,
})

const mapDispatchToProps = dispatch => ({
  nav: {
    courseMenu: () => { dispatch(navAction.courseMenu()) },
    editProfile: () => { dispatch(navAction.editProfile()) },
    closeDrawer: () => { dispatch(navAction.closeDrawer()) },
  },
})

class DrawerContainer extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <Text
            style={styles.usernameItem}>
            {this.props.username}
          </Text>
          <Text
            onPress={this.props.nav.courseMenu}
            style={styles.drawerItem}>
            課程選單
          </Text>
          <Text
            onPress={this.props.nav.editProfile}
            style={styles.drawerItem}>
            修改個人資料
          </Text>
        </View>
        <View style={styles.footerContainer}>
          <Text
            onPress={this.props.nav.closeDrawer}
            style={styles.drawerItem}>
            取消
          </Text>
        </View>
      </View>
    )
  }
}

DrawerContainer.propTypes = {
  nav: PropTypes.shape({
    courseMenu: PropTypes.func.isRequired,
    editProfile: PropTypes.func.isRequired,
    closeDrawer: PropTypes.func.isRequired,
  }).isRequired,
  username: PropTypes.string.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(DrawerContainer)
