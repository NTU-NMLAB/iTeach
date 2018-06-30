import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableHighlight,
} from 'react-native'
import PropTypes from 'prop-types'
import styles from './styles/QuizTeacherHistoryItem.style'

class TeacherHistoryItem extends Component {
  render() {
    const {
      type,
      description,
      time,
      correctRate,
      onPress,
    } = this.props
    return (
      <TouchableHighlight onPress={() => onPress()} underlayColor='white'>
        <View style={styles.historyItemContainer} onPress = {() => { onPress() }}>
          <View style={styles.correctRateContainer}>
            <Text style={styles.correctRateText}>
              答對率{'\n'}
              <Text style={styles.correctRate}>
                {correctRate}{'\n'}
              </Text>
              %{'\n'}
            </Text>
          </View>
          <View style={styles.questionContainer}>
            <Text>
              <Text style={styles.questionType}>
                {type}{'\n'}
              </Text>
              <Text style={styles.questionDescription}>
                { description.length > 20 ? `${description.substring(0, 19)}...` : description }{'\n'}
              </Text>
              <Text style={styles.questionTime}>
                {'\n'}{time}{'\n'}
              </Text>
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    )
  }
}

TeacherHistoryItem.propTypes = {
  type: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  correctRate: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
}

export default TeacherHistoryItem
