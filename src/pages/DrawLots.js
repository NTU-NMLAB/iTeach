import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Text,
  View,
  TextInput,
  Modal,
} from 'react-native'
import { Picker } from 'react-native-picker-dropdown'
import PropTypes from 'prop-types'
import styles from './styles/DrawLots.styles'
import navAction from '../actions/nav.action'
import drawLots from '../actions/drawLots.action'
import CloseImage from '../../asset/close.png'
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
    draw: (actionIn) => { dispatch(navAction.draw(actionIn)) },
  },
  drawLots: {
    initialize: () => { dispatch(drawLots.initialize()) },
    setDrawCount: (countIn) => { dispatch(drawLots.setDrawCount(countIn)) },
    setDrawAction: (actionIn) => { dispatch(drawLots.setDrawAction(actionIn)) },
    handleActionAllSpace: () => { dispatch(drawLots.handleActionAllSpace()) },
    handleCountTooLarge: () => { dispatch(drawLots.handleCountTooLarge()) },
  },
})

class DrawLots extends Component {
  constructor(props) {
    super(props)
    const fromDrawLotsFinish = this.props.drawLotsState.afterDraw
    const originalCount = this.props.drawLotsState.drawCount
    const originalAction = this.props.drawLotsState.drawAction

    this.props.drawLots.initialize()
    if (fromDrawLotsFinish) {
      this.props.drawLots.setDrawCount(originalCount)
      this.props.drawLots.setDrawAction(originalAction)
    }
  }
  alertForCount(signalIn) {
    if (!signalIn) return null
    return (
      <View style={styles.insideAlert}>
        <Text style={styles.alertTitle}>警告</Text>
        <Text style={styles.alertText}>在線同學少於設定數量</Text>
        <View style={styles.alertButton}>
          <Button label="OK" onPress={this.props.drawLots.handleCountTooLarge}/>
        </View>
      </View>
    )
  }
  alertForAction(signalIn) {
    if (!signalIn) return null
    return (
      <View style={styles.insideAlert}>
        <Text style={styles.alertTitle}>警告</Text>
        <Text style={styles.alertText}>輸入動作不得全為空格</Text>
        <View style={styles.alertButton}>
          <Button label="OK" onPress={this.props.drawLots.handleActionAllSpace}/>
        </View>
      </View>
    )
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
            <Text style={styles.text}>請</Text>
            <Picker
              style={styles.picker}
              textStyle={styles.pickerText}
              selectedValue={drawLotsState.drawCount}
              onValueChange={this.props.drawLots.setDrawCount}>
              {['1', '2', '3', '4', '5', '6'].map(it => (
                <Picker.Item key={it} value={it} label={it} />
              ))}
            </Picker>
            <Text style={styles.text}>位同學</Text>
            <TextInput
              style={styles.input}
              onChangeText={this.props.drawLots.setDrawAction}
              placeholder="回答問題"
              value={drawLotsState.drawAction}
            />
          </View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={drawLotsState.actionAllSpace || drawLotsState.countTooLarge}>
            <View style={styles.outsideAlert}>
              {this.alertForCount(drawLotsState.countTooLarge)}
              {this.alertForAction(drawLotsState.actionAllSpace)}
            </View>
          </Modal>
          <View style={styles.buttonContainer}>
            <Button label='抽籤' onPress={() => {
              this.props.navAction.draw(drawLotsState.drawAction)
            }}/>
          </View>
        </View>
      </View>
    )
  }
}

// .propTypes  ~= constructor
// course : proptypes.string,isRequired --> course 「必須」是string
DrawLots.propTypes = {
  drawLotsState: PropTypes.shape({
    drawCount: PropTypes.string.isRequired,
    drawAction: PropTypes.string.isRequired,
    afterDraw: PropTypes.bool.isRequired,
    actionAllSpace: PropTypes.bool.isRequired,
    countTooLarge: PropTypes.bool.isRequired,
  }).isRequired,
  navAction: PropTypes.shape({
    openDrawer: PropTypes.func.isRequired,
    onExit: PropTypes.func.isRequired,
    draw: PropTypes.func.isRequired,
  }).isRequired,
  drawLots: PropTypes.shape({
    initialize: PropTypes.func.isRequired,
    setDrawCount: PropTypes.func.isRequired,
    setDrawAction: PropTypes.func.isRequired,
    handleActionAllSpace: PropTypes.func.isRequired,
    handleCountTooLarge: PropTypes.func.isRequired,
  }).isRequired,
}
//  connect react component & redux store
export default connect(mapStateToProps, mapDispatchToProps)(DrawLots)

