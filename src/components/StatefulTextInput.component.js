import React, { Component } from 'react'
import { TextInput } from 'react-native'
import PropTypes from 'prop-types'
import styles from './styles/TextFormInput.style'

class StatefulTextInput extends Component {
  constructor(props) {
    super(props)
    this.state = { tmpValue: props.value }
  }

  render() {
    return <TextInput
      style={this.props.style}
      onBlur={ e => this.setState({ tmpText: e.nativeEvent.text }) }
      onChangeText={this.props.onChangeText}
      value={this.state.tmpValue}
      placeholder={this.props.placeholder}
      autoCapitalize={this.props.autoCapitalize}
      defaultValue={this.props.defaultValue}
    />
  }
}

StatefulTextInput.propTypes = {
  style: PropTypes.object,
  value: PropTypes.string.isRequired,
  onChangeText: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  autoCapitalize: PropTypes.string,
  defaultValue: PropTypes.string,
}
StatefulTextInput.defaultProps = {
  style: styles.input,
  value: '',
  defaultValue: '',
  onChangeText: () => {},
  placeholder: '',
  autoCapitalize: 'none',
}

export default StatefulTextInput
