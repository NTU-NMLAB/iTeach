import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native'
import PropTypes from 'prop-types'
import styles from './styles/QuizStatItem.style'

const QuizStatItem = (props) => {
  const {
    label,
    ratio,
    correct,
    userList,
  } = props
  return (
    <View style={styles.statItemContainer}>
      <View style={styles.labelContainer}>
        <Text style={correct ? styles.correctText : styles.normalText}>
          { label }
        </Text>
      </View>
      <TouchableOpacity style={styles.ratioContainer}
        onPress={() => { alert(JSON.stringify(userList)) }}
      >
        <View style={[correct ? styles.correctBar : styles.normalBar, { flex: ratio }]}/>
        <Text style={correct ? styles.correctText : styles.normalText}>
          { Math.round(ratio * 100).toString()}%
        </Text>
      </TouchableOpacity>
    </View>
  )
}

QuizStatItem.propTypes = {
  label: PropTypes.string.isRequired,
  ratio: PropTypes.number.isRequired,
  correct: PropTypes.bool.isRequired,
  userList: PropTypes.arrayOf(PropTypes.object).isRequired,
}

QuizStatItem.defaultProps = {
  label: '',
  ratio: 0,
  correct: false,
  userList: [],
}

export default QuizStatItem
