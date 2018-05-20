import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Text,
  View,
  Image,
  Alert,
} from 'react-native'
import PropTypes from 'prop-types'
import styles from './styles/DrawLotsFinish.styles'
import navAction from '../actions/nav.action'
import multiPeerAction from '../actions/multiPeer.action'
import CloseImage from '../../asset/close.png'
import OnlinePeerData from '../components/OnlinePeerData'
import Button from '../components/Button'
import Appbar from '../components/Appbar'

const mapStateToProps = state => ({
  drawLotsState: state.drawLots,
  multiPeerState: state.multiPeer,
})

const mapDispatchToProps = dispatch => ({
  navAction: {
    openDrawer: () => { dispatch(navAction.openDrawer()) },
    onExit: () => { dispatch(navAction.course()) },
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
    this.drawCore(this.props.drawLotsState.drawCount)
  }
  drawCore(countToDraw) {
    for (let it = 0; it < countToDraw; it += 1) {
      const chosenID = Math.floor(Math.random() * OnlinePeerData.length)
      const tmp = JSON.parse(JSON.stringify(OnlinePeerData[it]))
      OnlinePeerData[it] = JSON.parse(JSON.stringify(OnlinePeerData[chosenID]))
      OnlinePeerData[chosenID] = JSON.parse(JSON.stringify(tmp))
    }
  }
  send() {
    const keys = Object.keys(this.props.multiPeerState.peers)
    const data = {
      messageType: 'CHOSEN_ONE',
      textPop: this.props.drawLotsState.drawAction,
      // textPop: 'hail JS! long live REACT!',
      // arrHidden: ['test', 'if', true, 101, ['okay?']],
    }
  
    this.props.multiPeerAction.sendData(keys, data, () => {})
  }
  render() {
    const { drawLotsState } = this.props

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
                {OnlinePeerData.slice(0, drawLotsState.drawCount).map(it => (
                  <View key={it.user} style={styles.rowAvatar}>
                    <Image style={styles.AvatarContainer} source={it.imgSrc} />
                    <Text style={styles.name} numberOfLines={1}> {it.user}</Text>
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
  multiPeerState: PropTypes.object.isRequired,
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
