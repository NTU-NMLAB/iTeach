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
    return Object.keys(this.props.multiPeer.peersStatus)
      .filter(userId => this.props.multiPeer.peersStatus[userId].connected === true)
      .map(userId => this.props.multiPeer.peersInfo[userId])
  }
  getOfflinePeerList() {
    const { currCourseData } = this.props.navigation.state.params
    return currCourseData.userIds
      .filter(userId => !(userId in this.props.multiPeer.peersStatus) || !this.props.multiPeer.peersStatus[userId].connected)
      .map(userId => this.props.multiPeer.peersInfo[userId])
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
            keyExtractor={item => item.username}
            renderItem={({ item }) => (
              <OnlineListItem
                title={item.username}
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
            keyExtractor={item => item.username}
            renderItem={({ item }) => (
              <OnlineListItem
                title={item.username}
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
  multiPeer: PropTypes.shape({
    peersStatus: PropTypes.object.isRequired,
    peersInfo: PropTypes.object.isRequired,
  }).isRequired,
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
