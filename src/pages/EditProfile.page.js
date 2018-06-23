import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  View,
  Alert,
} from 'react-native'
import PropTypes from 'prop-types'
import Logo from '../components/Logo.component'
import Button from '../components/Button.component'
import TextFormInput from '../components/TextFormInput.component'
import styles from './styles/Register.style'
import signUpValidation from '../util/signUpValidation'
import profileAction from '../actions/profile.action'
import navAction from '../actions/nav.action'

const mapStateToProps = state => ({
  ...state.profile,
})

const mapDispatchToProps = dispatch => ({
  profileAction: {
    set: (info) => { dispatch(profileAction.save(info)) },
  },
  navAction: {
    classMenu: () => { dispatch(navAction.classMenu()) },
  },
})

class EditProfile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isTeacher: this.props.isTeacher,
      username: this.props.username,
      email: this.props.email,
    }
    this.onPressConfirm = this.onPressConfirm.bind(this)
    this.onPressCancel = this.onPressCancel.bind(this)
  }

  onPressCancel = () => {
    this.props.navAction.classMenu()
  }

  onPressConfirm = () => {
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
      default:
        this.setState({
          username: '',
          email: '',
        })
      }
    } else {
      // 符合規則，跳轉到ClassMenu
      this.props.profileAction.set(this.state)
    }
  }

  render() {
    return <View style={styles.container}>
      <View style={styles.statusbar}/>
      <Logo />
      <View style={styles.form}>
        <View style={styles.formInput}>
          <TextFormInput
            label='新暱稱 :'
            onChangeText={(username) => { this.setState({ username }) }}
            value={this.state.username} />
          <TextFormInput
            label='新 E-mail :'
            onChangeText={(email) => { this.setState({ email }) }}
            value={this.state.email} />
        </View>
        <Button label='確認' onPress={this.onPressConfirm} />
        <Button label='取消' onPress={this.onPressCancel} />
      </View>
    </View>
  }
}

EditProfile.propTypes = {
  profileAction: PropTypes.shape({
    set: PropTypes.func.isRequired,
  }).isRequired,
  navAction: PropTypes.shape({
    classMenu: PropTypes.func.isRequired,
  }).isRequired,
  isTeacher: PropTypes.bool.isRequired,
  username: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile)
