import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Text,
  View,
} from 'react-native'
import PropTypes from 'prop-types'
import styles from './styles/DrawLotsFinish.style'
import navAction from '../actions/nav.action'
import multiPeerAction from '../actions/multiPeer.action'
import CloseImage from '../../asset/close.png'
import Button from '../components/Button.component'
import Appbar from '../components/Appbar.component'

const mapStateToProps = state => ({
  drawLotsState: state.drawLots,
  multiPeerState: state.multiPeer,
})

const mapDispatchToProps = dispatch => ({
  navAction: {
    openDrawer: () => { dispatch(navAction.openDrawer()) },
    onExit: () => { dispatch(navAction.courseHome()) },
    backToDraw: () => { dispatch(navAction.backToDraw()) },
  },
  multiPeerAction: {
    sendData: (recipients, data, callback) => {
      dispatch(multiPeerAction.backend.sendData(recipients, data, callback))
    },
  },
})

class DrawLots extends Component {
  constructor(props) {
    super(props)
    this.drawCore()
  }
  drawCore() {
    const { drawLotsState, multiPeerState } = this.props
    const { currCourseData } = this.props.navigation.state.params
    this.userIdsAfterShuffle = currCourseData.userIds
      .filter(userId => (userId in multiPeerState.peersStatus) && multiPeerState.peersStatus[userId].connected)

    for (let it = 0; it < drawLotsState.drawCount; it += 1) {
      const chosenID = Math.floor(Math.random() * this.userIdsAfterShuffle.length)
      const tmp = this.userIdsAfterShuffle[it]
      this.userIdsAfterShuffle[it] = this.userIdsAfterShuffle[chosenID]
      this.userIdsAfterShuffle[chosenID] = tmp
    }
    this.userIdsAfterShuffle = this.userIdsAfterShuffle.slice(0, drawLotsState.drawCount)
  }
  checkOnlineForThisCourse(userId) {
    const { multiPeerState } = this.props
    if (!(userId in multiPeerState.peersStatus)) return false
    if (!multiPeerState.peersStatus[userId].connected) return false
    return true
  }
  send() {
    const peerIds = this.userIdsAfterShuffle
      .filter(this.checkOnlineForThisCourse.bind(this))
      .map(userId => this.props.multiPeerState.peersStatus[userId].currPeerId)
    const data = {
      messageType: 'CHOSEN_ONE',
      textPop: this.props.drawLotsState.drawAction,
    }

    this.props.multiPeerAction.sendData(peerIds, data, () => {})
  }
  render() {
    const { drawLotsState, multiPeerState } = this.props

    return (
      <View style={styles.container}>
        <Appbar title='隨機抽籤' withDrawer
          rightIcon={CloseImage}
          onRightPress={this.props.navAction.onExit}/>
        <View style={styles.listContainer}>
          <View style={styles.rowContainer}>
            <Text style={styles.text} numberOfLines={1}>
              請          {drawLotsState.drawCount}        位同學         {drawLotsState.drawAction}
            </Text>
          </View>
          <View style={styles.columnContainerBorder}>
            <Text style={styles.textBold}>抽籤結果</Text>
            <View style={styles.rowDrawLotsList}>
              <View style={styles.columnContainer}>
                {this.userIdsAfterShuffle.map(userId => (
                  <View key={userId} style={styles.rowAvatar}>
                    <View style={[styles.AvatarContainer, styles[(this.checkOnlineForThisCourse(userId) ? 'green' : 'grey')]]} />
                    <Text style={styles.name} numberOfLines={1}>
                      {`   ${multiPeerState.peersInfo[userId].username}`}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <Button label='發佈' onPress={this.send.bind(this)}/>
            <Button label='重抽' onPress={this.props.navAction.backToDraw}/>
          </View>
        </View>
      </View>
    )
  }
}

DrawLots.propTypes = {
  drawLotsState: PropTypes.shape({
    drawCount: PropTypes.string.isRequired,
    drawAction: PropTypes.string.isRequired,
  }).isRequired,
  multiPeerState: PropTypes.shape({
    peersStatus: PropTypes.object,
    peersInfo: PropTypes.object,
  }).isRequired,
  navAction: PropTypes.shape({
    openDrawer: PropTypes.func.isRequired,
    onExit: PropTypes.func.isRequired,
    backToDraw: PropTypes.func.isRequired,
  }).isRequired,
  multiPeerAction: PropTypes.shape({
    sendData: PropTypes.func.isRequired,
  }).isRequired,
  navigation: PropTypes.shape({
    state: PropTypes.shape({
      params: PropTypes.shape({
        currCourseData: PropTypes.object.isRequired,
      }),
    }),
  }),
}

export default connect(mapStateToProps, mapDispatchToProps)(DrawLots)
