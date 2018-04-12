import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableHighlight,
  Image,
} from 'react-native'
import PropTypes from 'prop-types'
import DrawerImage from '../../asset/drawer.png'
import styles from './styles/ClassMenu.styles'

export default class Channels extends Component {
  constructor(props) {
    super(props)
    this.openDrawer = this.openDrawer.bind(this)
  }

  openDrawer() {
    this.props.navigation.navigate('DrawerOpen')
  }

  render() {
    return <View style={styles.container}>
      <View style={styles.titleBar}>
        <TouchableHighlight style={styles.drawerIconContainer} onPress={this.openDrawer} underlayColor='#3A8FB7'>
          <Image style={styles.drawerIcon} source={DrawerImage} />
        </TouchableHighlight>
        <Text style={styles.title}>
          切換頻道的頁面
        </Text>
      </View>
    </View>
  }
}

Channels.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
}
