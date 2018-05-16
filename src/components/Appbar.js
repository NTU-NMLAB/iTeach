import React, { Component } from 'react'
import {
  View,
  TouchableHighlight,
  Text,
  Image,
} from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import styles from './styles/Header.styles'
import DrawerImage from '../../asset/drawer.png'
import navAction from '../actions/nav.action'

class Appbar extends Component {
  openDrawer = () => this.props.dispatch(navAction.openDrawer())

  render() {
    const {
      title,
      withDrawer,
      rightIcon,
      onRightPress,
    } = this.props
    return (
      <View style={styles.titleBar}>
        {
          withDrawer &&
          <TouchableHighlight style={styles.drawerIconContainer} onPress={this.openDrawer} underlayColor='#3A8FB7'>
            <Image style={styles.drawerIcon} source={DrawerImage} />
          </TouchableHighlight>
        }
        <Text style={styles.title}>
          {title}
        </Text>
        {
          rightIcon != null &&
          <TouchableHighlight style={styles.addSearchIconContainer} onPress={onRightPress} underlayColor='#3A8FB7'>
            <Image style={styles.addSearchIcon} source={rightIcon} />
          </TouchableHighlight>
        }
      </View>
    )
  }
}

Appbar.propTypes = {
  title: PropTypes.string.isRequired,
  withDrawer: PropTypes.bool,
  rightIcon: PropTypes.number,
  onRightPress: PropTypes.func,
  dispatch: PropTypes.func,
}
Appbar.defaultProps = {
  withDrawer: false,
  rightIcon: null,
}
export default connect()(Appbar)
