import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  View,
  Text,
  Modal,
} from 'react-native'
import PropTypes from 'prop-types'
import styles from './styles/Background.styles'
import drawLotsAction from '../actions/drawLots.action'
import Button from './Button'

const mapStateToProps = state => ({
  drawLots: state.drawLots,
})

const mapDispatchToProps = dispatch => ({
  drawLotsAction: {
    handleChosen: () => { dispatch(drawLotsAction.handleChosen()) },
  },
})

class Background extends Component {
  alertForChosen(signalIn) {
    if (signalIn !== 1) return null
    return (
      <View style={styles.insideAlert}>
        <Text style={styles.alertTitle}>您被老師抽到要</Text>
        <Text style={styles.alertText}>{this.props.drawLots.assignedAction}</Text>
        <View style={styles.alertButton}>
          <Button label="OK" onPress={this.props.drawLotsAction.handleChosen}/>
        </View>
      </View>
    )
  }
  render() {
    return (
      <View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.props.drawLots.chosen === 1}>
          <View style={styles.outsideAlert}>
            {this.alertForChosen(this.props.drawLots.chosen)}
          </View>
        </Modal>
      </View>
    )
  }
}

Background.propTypes = {
  drawLotsAction: PropTypes.shape({
    handleChosen: PropTypes.func.isRequired,
  }).isRequired,
  drawLots: PropTypes.shape({
    assignedAction: PropTypes.string.isRequired,
    chosen: PropTypes.number.isRequired,
  }).isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(Background)
