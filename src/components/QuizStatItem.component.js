import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native'
import PropTypes from 'prop-types'
import styles from './styles/QuizStatItem.style'

const QuizStatItem = (props) => {
  const {
    label,
    ratio,
    correct,
    userList,
    onPress,
    unrolled,
  } = props
  return (
    <View style={styles.statItemContainer}>
      <View style={styles.statBarContainer}>
        <View style={styles.labelContainer}>
          <Text style={correct ? styles.correctText : styles.normalText}>
            { label.length > 4 ? `${label.substring(0, 4)}..` : label }
          </Text>
        </View>
        <TouchableOpacity
          style={styles.ratioContainer}
          onPress={onPress}
        >
          <View style={[correct ? styles.correctBar : styles.normalBar, { flex: ratio }]}/>
          <Text style={correct ? styles.correctText : styles.normalText}>
            { Math.round(ratio * 100).toString()}%
          </Text>
        </TouchableOpacity>
      </View>
      { unrolled ? <View style={styles.statListContainer}>
        <ScrollView>
          <FlatList
            style={styles.studentList}
            data={userList}
            keyExtractor={item => item.studentName}
            renderItem={({ item }) => (
              <View style={styles.studentItemContainer}>
                <View flex={0.15} />
                <View flex={0.85}>
                  <Text style={styles.studentText}> - { item.studentName } </Text>
                </View>
              </View>
            )} />
        </ScrollView>
      </View> : null}
    </View>
  )
}

QuizStatItem.propTypes = {
  label: PropTypes.string.isRequired,
  ratio: PropTypes.number.isRequired,
  correct: PropTypes.bool.isRequired,
  userList: PropTypes.arrayOf(PropTypes.object).isRequired,
  unrolled: PropTypes.bool.isRequired,
  onPress: PropTypes.func.isRequired,
}

QuizStatItem.defaultProps = {
  label: '',
  ratio: 0,
  correct: false,
  userList: [],
  unrolled: false,
  onPress: () => {},
}

export default QuizStatItem
