import React from 'react'
import {
  Text,
  TextInput,
  View,
} from 'react-native'
import PropTypes from 'prop-types'
import styles from './styles/TextFormInput.style'

const TextFormInput = (props) => {
  const {
    label,
    onChangeText,
    value,
    autoCapitalize,
  } = props
  return (
    <View keyboardShouldPersistTaps="handled" >
      <Text style={styles.text}>
        {label}
      </Text>
      <TextInput
        style={styles.input}
        onBlur={ e => onChangeText(e.nativeEvent.text) }
        value={value}
        autoCapitalize={autoCapitalize} />
    </View>
  )
}

TextFormInput.propTypes = {
  label: PropTypes.string,
  onChangeText: PropTypes.func,
  value: PropTypes.string,
  autoCapitalize: PropTypes.string,
}

TextFormInput.defaultProps = {
  label: '',
  onChangeText: () => {},
  value: '',
  autoCapitalize: 'none',
}

export default TextFormInput
