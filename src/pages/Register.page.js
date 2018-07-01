import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Text,
  View,
  Alert,
} from 'react-native'
import { Picker } from 'react-native-picker-dropdown'
import PropTypes from 'prop-types'
import Logo from '../components/Logo.component'
import Button from '../components/Button.component'
import TextFormInput from '../components/TextFormInput.component'
import styles from './styles/Register.style'
import signUpValidation from '../util/signUpValidation'
import profileAction from '../actions/profile.action'

const mapStateToProps = state => ({
  ...state.profile,
})

const mapDispatchToProps = dispatch => ({
  save: (info) => { dispatch(profileAction.save(info)) },
})

class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isTeacher: false,
      username: '',
      email: '',
    }
    this.onPress = this.onPress.bind(this)
  }

  onPress = () => {
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
          isTeacher: false,
        })
        break
      default:
        this.setState({
          isTeacher: false,
          username: '',
          email: '',
        })
      }
    } else {
      // 符合規則，跳轉到 CourseMenu
      this.props.save(this.state)
    }
  }

  render() {
    return <View style={styles.container}>
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
            selectedValue={this.state.isTeacher}
            onValueChange={(value) => { this.setState({ isTeacher: value }) }}>
            <Picker.Item label='老師' value={true} />
            <Picker.Item label='學生' value={false} />
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

Register.propTypes = {
  save: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)
