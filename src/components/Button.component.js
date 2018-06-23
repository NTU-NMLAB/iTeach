import React from 'react'
import {
  Text,
  TouchableHighlight,
  View,
} from 'react-native'
import PropTypes from 'prop-types'
import styles from './styles/Button.style'

const Button = (props) => {
  const { label, onPress, invalid } = props
  const buttonStyles = [styles.button]
  if (invalid) buttonStyles.push(styles.gray)
  return (
    <View style={styles.buttonContainer}>
      <TouchableHighlight
        underlayColor='steelblue'
        onPress={onPress}
        style={buttonStyles}>
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
  invalid: PropTypes.bool,
}

Button.defaultProps = {
  label: '',
  onPress: () => {},
  invalid: false,
}

export default Button
