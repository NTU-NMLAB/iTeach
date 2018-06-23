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
  courseState: state.course,
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
    const { drawLotsState, multiPeerState, courseState } = this.props
    this.keysAfterShuffle = Object.keys(multiPeerState.courses[courseState.courseName])

    for (let it = 0; it < drawLotsState.drawCount; it += 1) {
      const chosenID = Math.floor(Math.random() * this.keysAfterShuffle.length)
      const tmp = this.keysAfterShuffle[it]
      this.keysAfterShuffle[it] = this.keysAfterShuffle[chosenID]
      this.keysAfterShuffle[chosenID] = tmp
    }
    this.keysAfterShuffle = this.keysAfterShuffle.slice(0, drawLotsState.drawCount)
  }
  checkOnlineForThisCourse(it) {
    const { multiPeerState, courseState } = this.props
    if (!multiPeerState.peers[it].online) return false
    return multiPeerState.peers[it].info.course === courseState.courseName
  }
  send() {
    const keys = this.keysAfterShuffle.filter(this.checkOnlineForThisCourse.bind(this))
    const data = {
      messageType: 'CHOSEN_ONE',
      textPop: this.props.drawLotsState.drawAction,
    }

    this.props.multiPeerAction.sendData(keys, data, () => {})
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
                {this.keysAfterShuffle.map(it => (
                  <View key={it} style={styles.rowAvatar}>
                    <View style={[styles.AvatarContainer, styles[(this.checkOnlineForThisCourse(it) ? 'green' : 'grey')]]} />
                    <Text style={styles.name} numberOfLines={1}>
                      {`   ${multiPeerState.peers[it].info.username}`}
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
    courses: PropTypes.object.isRequired,
    peers: PropTypes.object.isRequired,
  }).isRequired,
  courseState: PropTypes.shape({
    courseName: PropTypes.string.isRequired,
  }).isRequired,
  navAction: PropTypes.shape({
    openDrawer: PropTypes.func.isRequired,
    onExit: PropTypes.func.isRequired,
    backToDraw: PropTypes.func.isRequired,
  }).isRequired,
  multiPeerAction: PropTypes.shape({
    sendData: PropTypes.func.isRequired,
  }).isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(DrawLots)
