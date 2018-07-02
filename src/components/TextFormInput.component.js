import React from 'react'
import {
  Text,
  View,
} from 'react-native'
import PropTypes from 'prop-types'
import styles from './styles/TextFormInput.style'
import StatefulTextInput from './StatefulTextInput.component'

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
      <StatefulTextInput
        style={styles.input}
        onChangeText={onChangeText}
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
