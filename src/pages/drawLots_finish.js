import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Text,
  View,
} from 'react-native'
import PropTypes from 'prop-types'
import styles from './styles/DrawLots_finish.styles'
import navAction from '../actions/nav.action'
import drawLots from '../actions/drawLots.action'
import CloseImage from '../../asset/close.png'
import Button from '../components/Button'
import Appbar from '../components/Appbar'


const mapStateToProps = state => ({
  drawLotsState: state.drawLots,
})

const mapDispatchToProps = dispatch => ({
  navAction: {
    openDrawer: () => { dispatch(navAction.openDrawer()) },
    onExit: () => { dispatch(navAction.course()) },
    // 課程主畫面 而非 classMenu
  },
  drawLots: {
    setDrawCount: (countIn) => { dispatch(drawLots.setDrawCount(countIn)) },
    setDrawAction: (actionIn) => { dispatch(drawLots.setDrawAction(actionIn)) },
    draw: (actionIn) => { dispatch(drawLots.draw(actionIn)) },
    handleActionAllSpace: () => { dispatch(drawLots.handleActionAllSpace()) },
  },
})

// <Button label='抽籤' onPress : TODO/>
class DrawLots extends Component {
  render() {
    const { drawLotsState } = this.props
    return (
      <View style={styles.container}>
        <Appbar title='隨機抽籤' withDrawer
          rightIcon={CloseImage}
          onRightPress={this.props.navAction.onExit}/>
        <View style={styles.listContainer}>
          <View style={styles.rowContainer}>
            <Text style={styles.text}>請          {drawLotsState.drawCount} </Text>
            <Text style={styles.text}>       位同學</Text>
            <Text style={styles.text}>         {drawLotsState.drawAction}</Text>
          </View>
          <View style={styles.rowContainerBorder}>
            <Text style={styles.textBold}>抽籤結果</Text>
          </View>
          <View style={styles.buttonContainer}>
            <Button label='發佈' onPress={() => {
              this.props.drawLots.draw(drawLotsState.drawAction)
            }}/>
            <Button label='重抽' onPress={() => {
              this.props.drawLots.draw(drawLotsState.drawAction)
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
  }).isRequired,
  drawLots: PropTypes.shape({
    setDrawCount: PropTypes.func.isRequired,
    setDrawAction: PropTypes.func.isRequired,
    draw: PropTypes.func.isRequired,
    handleActionAllSpace: PropTypes.func.isRequired,
  }).isRequired,
}
//  connect react component & redux store
export default connect(mapStateToProps, mapDispatchToProps)(DrawLots)

