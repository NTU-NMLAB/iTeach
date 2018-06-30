import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Image,
  Text,
  TouchableHighlight,
  View,
  FlatList,
} from 'react-native'
import PropTypes from 'prop-types'
import CloseImage from '../../asset/close.png'
import styles from './styles/OnlinePeerList.style'
import navAction from '../actions/nav.action'
import OnlineListItem from '../components/OnlineListItem.component'

const mapStateToProps = state => ({
  multiPeer: state.multiPeer,
  isTeacher: state.profile.isTeacher,
})

const mapDispatchToProps = dispatch => ({
  navAction: {
    openDrawer: () => { dispatch(navAction.openDrawer()) },
    onExit: () => {
      dispatch(navAction.courseHome())
    },
  },
})

class OnlinePeerList extends Component {
  constructor() {
    super()
    this.getOnlinePeerList = this.getOnlinePeerList.bind(this)
    this.getOfflinePeerList = this.getOfflinePeerList.bind(this)
  }
  getOnlinePeerList() {
    const { currCourseData } = this.props.navigation.state.params
    return Object.keys(this.props.multiPeer.peers)
      .map(i => this.props.multiPeer.peers[i])
      .filter(peer => peer.connected === true && peer.info.currCourseId === currCourseData.courseId)
  }
  getOfflinePeerList() {
    const { currCourseData } = this.props.navigation.state.params
    console.log(this.props)
    return Object.keys(this.props.multiPeer.peers)
      .map(i => this.props.multiPeer.peers[i])
      .filter((peer => (peer.connected === false || !(peer.info.currCourseId === currCourseData.courseId)) &&
        (!this.props.isTeacher || (this.props.multiPeer.courses[currCourseData.courseId] &&
          peer.id in this.props.multiPeer.courses[currCourseData.courseId]))))
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
  multiPeer: PropTypes.object.isRequired,
  isTeacher: PropTypes.bool.isRequired,
  navigation: PropTypes.shape({
    state: PropTypes.shape({
      params: PropTypes.shape({
        currCourseData: PropTypes.object.isRequired,
      }),
    }),
  }),
}

export default connect(mapStateToProps, mapDispatchToProps)(OnlinePeerList)
