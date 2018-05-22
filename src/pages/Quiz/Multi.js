import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import PropTypes from 'prop-types'
import CloseImage from '../../../asset/close.png'
import styles from '../styles/Question.styles'
import navAction from '../../actions/nav.action'
import Appbar from '../../components/Appbar'
import CheckBox from 'react-native-check-box'
import addMultiAction from '../../actions/addMulti.action'


const mapStateToProps = state => ({
  status: state.account.status,
  ...state,
})

const mapDispatchToProps = dispatch => ({
  navAction: {
    openDrawer: () => { dispatch(navAction.openDrawer()) },
    onExit: () => { dispatch(navAction.quizMainPage()) },
    historyRecord: () => { dispatch(navAction.historyRecord()) }
  },
  addMultiAction: {
    save: (info) => { dispatch(addMultiAction.save(info)) },
  },
})


class Multi extends Component {
  constructor(){
    super()
    this.state={
      questionState: '',
      ans1State: '',
      ans2State: '',
      ans3State: '',
      ans4State: '',
      ans5State: '',
      check1: true,
      check2: true,
      check3: true,
      check4: true,
      check5: true,
    }
    this.onClick1 = this.onClick1.bind(this);
    this.onClick2 = this.onClick2.bind(this);
    this.onClick3 = this.onClick3.bind(this);
    this.onClick4 = this.onClick4.bind(this);
    this.onClick5 = this.onClick5.bind(this);
    this.onPressSubmit=this.onPressSubmit.bind(this);
  }
  onClick1(){
    this.setState({
      check1: !this.state.check1,
    })
  }
  onClick2(data){
    this.setState({
      check2: !this.state.check2,
    })
  }
  onClick3(data){
    this.setState({
      check3: !this.state.check3,
    })
  }
  onClick4(data){
    this.setState({
      check4: !this.state.check4,
    })
  }
  onClick5(data){
    this.setState({
      check5: !this.state.check5,
    })
  }
  onPressSubmit = () => {
    this.props.addMultiAction.save(this.state);
  }


  render() {
    const questionType = '多選題'
    const submit = '發布'
    return (
      <View style={styles.container}>
        <Appbar title={questionType}
          rightIcon={CloseImage}
          onRightPress={this.props.navAction.onExit}/>
        <View style={styles.listContainer}>
          <View style={styles.questionTitle}>
            <Text style={styles.text}>
              題目內容：
            </Text>
          </View>
          <View style={styles.questionContext}>
            <TextInput
              style={styles.text}
              onChangeText={(questionState) => { this.setState({ questionState }) }}
              value={this.state.questionState}
              placeholder='題目敘述'
            />
          </View>
          <View style={styles.multiAnswer}>
            <Text style={styles.text}>
              選項：
            </Text>
            <TextInput
              style={styles.singleInput}
              onChangeText={(ans1State) => { this.setState({ ans1State }) }}
              value={this.state.ans1State}
              placeholder='選項'
            />
            <Text style={styles.cbContainer}>
              正確？<CheckBox value={this.state.check2} checkBoxColor='#3A8FB7' onClick={() => this.onClick2}/>
            </Text>
          </View>
          <View style={styles.multiAnswer}>
            <Text style={styles.text}>
              選項：
            </Text>
            <TextInput
              style={styles.singleInput}
              onChangeText={(ans2State) => { this.setState({ ans2State }) }}
              value={this.state.ans2State}
              placeholder='選項'
            />
            <Text style={styles.cbContainer}>
              正確？<CheckBox value={this.state.check2} checkBoxColor='#3A8FB7' onClick={() => this.onClick2}/>
            </Text>
          </View>
          <View style={styles.multiAnswer}>
            <Text style={styles.text}>
              選項：
            </Text>
            <TextInput
              style={styles.singleInput}
              onChangeText={(ans3State) => { this.setState({ ans3State }) }}
              value={this.state.ans3State}
              placeholder='選項'
            />
            <Text style={styles.cbContainer}>
              正確？<CheckBox value={this.state.check2} checkBoxColor='#3A8FB7' onClick={() => this.onClick2}/>
            </Text>
          </View>
          <View style={styles.multiAnswer}>
            <Text style={styles.text}>
              選項：
            </Text>
            <TextInput
              style={styles.singleInput}
              onChangeText={(ans4State) => { this.setState({ ans4State }) }}
              value={this.state.ans4State}
              placeholder='選項'
            />
            <Text style={styles.cbContainer}>
              正確？<CheckBox value={this.state.check2} checkBoxColor='#3A8FB7' onClick={() => this.onClick2}/>
            </Text>
          </View>
          <View style={styles.multiAnswer}>
            <Text style={styles.text}>
              選項：
            </Text>
            <TextInput
              style={styles.singleInput}
              onChangeText={(ans5State) => { this.setState({ ans5State }) }}
              value={this.state.ans5State}
              placeholder='選項'
            />
            <Text style={styles.cbContainer}>
              正確？<CheckBox value={this.state.check2} checkBoxColor='#3A8FB7' onClick={() => this.onClick2}/>
            </Text>
          </View>
          <TouchableOpacity
            style={styles.multisubmitCon}
            onPress={this.onPressSubmit}
          >
            <Text style={styles.submit}>
              {submit}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

Multi.propTypes = {
  navAction: PropTypes.shape({
    openDrawer: PropTypes.func.isRequired,
    onExit: PropTypes.func.isRequired,
  }).isRequired,
  course: PropTypes.object.isRequired,
  quizItem: PropTypes.object,
  status: PropTypes.string.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(Multi)
