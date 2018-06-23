import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  TouchableHighlight,
} from 'react-native'
import PropTypes from 'prop-types'
import styles from './styles/StudentHistoryItem.style'
import unAnswered from '../../asset/icon/unAnswered.png'
import Answered from '../../asset/icon/Answered.png'
import Checked from '../../asset/icon/Checked.png'

class StudentHistoryItem extends Component {
  render() {
    const {
      type,
      description,
      time,
      answerState,
      onPress,
    } = this.props
    return (
      <TouchableHighlight onPress={() => onPress()} underlayColor='white'>
        <View style={styles.historyItemContainer}>
          {answerState === 'unAnswered' &&
            <View style={styles.answerStateContainer}>
              <Text style={styles.answerStateText}>
                {'未作答'}{'\n'}
              </Text>
              <Image
                style={styles.icon}
                source={unAnswered} />
            </View>}
          {answerState === 'Answered' &&
            <View style={styles.answerStateContainer}>
              <Text style={styles.answerStateText}>
                {'已作答'}{'\n'}
              </Text>
              <Image
                style={styles.icon}
                source={Answered} />
            </View>}
          {answerState === 'Checked' &&
            <View style={styles.answerStateContainer}>
              <Text style={styles.answerStateText}>
                {'已批改'}{'\n'}
              </Text>
              <Image
                style={styles.icon}
                source={Checked} />
            </View>}
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

StudentHistoryItem.propTypes = {
  type: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  answerState: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
}

export default StudentHistoryItem
