import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Image,
  Text,
  TouchableHighlight,
  View,
  FlatList,
  Alert,
} from 'react-native'
import PropTypes from 'prop-types'
import CloseImage from '../../asset/close.png'
import styles from './styles/OnlinePeerList.styles'
import navAction from '../actions/nav.action'
import OnlineListItem from '../components/OnlineListItem'

const mapStateToProps = state => ({
  status: state.account.status,
  multiPeer: state.multiPeer,
  courseName: state.course.courseName,
  ...state,
})

const mapDispatchToProps = dispatch => ({
  navAction: {
    openDrawer: () => { dispatch(navAction.openDrawer()) },
    onExit: () => {
      dispatch(navAction.course())
    },
  },
})

class OnlinePeerList extends Component {
  getOnlinePeerList() {
    return Object.keys(this.props.multiPeer.peers).map(i => this.props.multiPeer.peers[i]).filter(peer => peer.online === true && peer.info.course === this.props.courseName)
  }
  getOfflinePeerList() {
    return Object.keys(this.props.multiPeer.peers).map(i => this.props.multiPeer.peers[i]).filter((peer => (peer.online === false || !(peer.info.course === this.props.courseName)) && (this.props.multiPeer.courses[this.props.courseName] && peer.id in this.props.multiPeer.courses[this.props.courseName])))
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.titleBar}>
          <Text style={styles.title}>
            在線名單
          </Text>
          <TouchableHighlight style={styles.addSearchIconContainer} onPress={this.props.navAction.onExit} underlayColor='#3A8FB7'>
            <Image style={styles.addSearchIcon} source={CloseImage} />
          </TouchableHighlight>
        </View>
        <View style={styles.subtitleBar}>
          <Text style={styles.subtitle}>
            在線
          </Text>
        </View>
        <View style={styles.itemContainer}>
          <FlatList
            style={styles.list}
            data={this.getOnlinePeerList()}
            keyExtractor={item => item.info.username}
            renderItem={({ item }) => (
              <OnlineListItem
                title={item.info.username}
                color={'green'}
              />
            )}
          />
        </View>
        <View style={styles.subtitleBar}>
          <Text style={styles.subtitle}>
            離線
          </Text>
        </View>
        <View style={styles.itemContainer}>
          <FlatList
            style={styles.list}
            data={this.getOfflinePeerList()}
            keyExtractor={item => item.info.username}
            renderItem={({ item }) => (
              <OnlineListItem
                title={item.info.username}
                color={'grey'}
              />
            )}
          />
        </View>
      </View>
    )
  }
}

OnlinePeerList.propTypes = {
  navAction: PropTypes.shape({
    openDrawer: PropTypes.func.isRequired,
    onExit: PropTypes.func.isRequired,
  }).isRequired,
  status: PropTypes.string.isRequired,
  multiPeer: PropTypes.object.isRequired,
  courseName: PropTypes.string.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(OnlinePeerList)
