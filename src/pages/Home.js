import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Image,
  Text,
  TouchableHighlight,
  View,
} from 'react-native'
import PropTypes from 'prop-types'
import DrawerImage from '../../asset/drawer.png'
import styles from './styles/Home.styles'
import nav from '../actions/nav'


const mapStateToProps = state => ({
  nav: state.nav,
})
const mapDispatchToProps = dispatch => ({
  openDrawer: () => {
    dispatch(nav.openDrawer())
  },
  editProfile: () => {
    dispatch(nav.editProfile())
  },
})

class Home extends Component {
  constructor(props) {
    super(props)
    this.openDrawer = this.openDrawer.bind(this)
    this.onPress = this.onPress.bind(this)
  }

  onPress = () => {
    this.props.editProfile()
  }

  static navigationOptions = {
    drawerLabel: '主頁',
  }

  openDrawer() {
    // this.props.navigation.navigate('DrawerOpen')
    this.props.openDrawer()
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.titleBar}>
          <TouchableHighlight style={styles.drawerIconContainer} onPress={this.openDrawer} underlayColor='white'>
            <Image style={styles.drawerIcon} source={DrawerImage} />
          </TouchableHighlight>
          <Text style={styles.title}>
            主頁
          </Text>
        </View>
      </View>
    )
  }
}

Home.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  openDrawer: PropTypes.func.isRequired,
  editProfile: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
