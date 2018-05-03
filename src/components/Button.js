import React from 'react'
import {
  Text,
  TouchableHighlight,
  View,
} from 'react-native'
import PropTypes from 'prop-types'
import styles from './styles/Button.styles'

const Button = (props) => {
  const { label, onPress } = props
  return (
    <View style={styles.buttonContainer}>
      <TouchableHighlight
        underlayColor='steelblue'
        onPress={onPress}
        style={styles.button}>
        <Text style={styles.buttonLabel}>
          {label}
        </Text>
      </TouchableHighlight>
    </View>
  )
}

Button.propTypes = {
  label: PropTypes.string,
  onPress: PropTypes.func,
}

Button.defaultProps = {
  label: '',
  onPress: () => {},
}

export default Button
