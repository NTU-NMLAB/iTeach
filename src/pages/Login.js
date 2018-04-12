import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Text,
  View,
  Alert,
} from 'react-native'
import { Picker } from 'react-native-picker-dropdown'
import PropTypes from 'prop-types'
import Logo from '../components/Logo'
import Button from '../components/Button'
import TextFormInput from '../components/TextFormInput'
import styles from './styles/Login.styles'
import signUpValidation from '../util/signUpValidation'
import accountAction from '../actions/account.action'

const mapStateToProps = state => ({
  ...state.account,
  initComplete: state.initComplete,
})

const mapDispatchToProps = dispatch => ({
  accountAction: {
    save: async (info) => { dispatch(accountAction.save(info)) },
  },
})

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      status: '',
      username: '',
      email: '',
    }
    this.onPress = this.onPress.bind(this)
  }

  onPress = async () => {
    if (!signUpValidation(this.state).valid) {
      // 不符合規則，跳出警告視窗
      Alert.alert(
        '警告',
        signUpValidation(this.state).description,
        [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ],
      )
      // 檢查應該清除哪行
      switch (signUpValidation(this.state).errorCode) {
      case 1:
        this.setState({
          username: '',
        })
        break
      case 2:
        this.setState({
          email: '',
        })
        break
      case 3:
        this.setState({
          status: '',
        })
        break
      default:
        this.setState({
          status: '',
          username: '',
          email: '',
        })
      }
    } else {
      // 符合規則，跳轉到ClassMenu
      await this.props.accountAction.save(this.state)
    }
  }

  render() {
    return <View style={[styles.container, { display: this.props.initComplete ? 'flex' : 'none' }]}>
      <View style={styles.statusbar}/>
      <Logo />
      <View style={styles.form}>
        <View style={styles.formInput}>
          <Text style={styles.text}>
            身份 ：
          </Text>
          <Picker
            style={styles.picker}
            textStyle={styles.text}
            selectedValue={this.state.status}
            onValueChange={(itemValue) => { this.setState({ status: itemValue }) }}>
            <Picker.Item label='老師' value='teacher' />
            <Picker.Item label='學生' value='student' />
          </Picker>
          <TextFormInput
            label='暱稱 :'
            onChangeText={(username) => { this.setState({ username }) }}
            value={this.state.username} />
          <TextFormInput
            label='E-mail :'
            onChangeText={(email) => { this.setState({ email }) }}
            value={this.state.email} />
        </View>
        <Button label='註冊' onPress={this.onPress} />
      </View>
    </View>
  }
}

Login.propTypes = {
  accountAction: PropTypes.shape({
    save: PropTypes.func.isRequired,
  }).isRequired,
  username: PropTypes.string.isRequired,
  initComplete: PropTypes.bool.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
