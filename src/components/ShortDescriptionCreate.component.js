import React from 'react'
import {
  View,
  Text,
} from 'react-native'
import PropTypes from 'prop-types'
import styles from './styles/Question.style'

const ShortDescriptionCreate = (props) => {
  const { courseName } = props
  return (
    <View style={styles.textContainer}>
      <Text style={styles.text}>
        歡迎進入隨堂測驗{'\n'}
        課程：{courseName}{'\n'}
        題型：簡答題
      </Text>
    </View>
  )
}

ShortDescriptionCreate.propTypes = {
  courseName: PropTypes.string.isRequired,
}

export default ShortDescriptionCreate
