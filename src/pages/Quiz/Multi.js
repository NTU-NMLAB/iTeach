import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import CloseImage from '../../../asset/close.png'
import styles from '../styles/Question.styles'
import navAction from '../../actions/nav.action'
import Appbar from '../../components/Appbar'
import CheckBox from 'react-native-check-box'


const mapStateToProps = state => ({
  status: state.account.status,
  ...state,
})

const mapDispatchToProps = dispatch => ({
  navAction: {
    openDrawer: () => { dispatch(navAction.openDrawer()) },
    onExit: () => { dispatch(navAction.quizMainPage()) },
  },
})


class Multi extends Component {
  constructor(){
    super()
    this.state={
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
            <Text style={styles.text}>
              一個禮拜中，回家該做網多作業的日子是哪幾天？
            </Text>
          </View>
          <View style={styles.multiAnswer}>
            <Text style={styles.text}>
              選項： 星期一                   正確？<CheckBox value={this.state.check1} checkBoxColor='#3A8FB7' onClick={() => this.onClick1}/>
            </Text>
          </View>
          <View style={styles.multiAnswer}>
            <Text style={styles.text}>
              選項： 星期二                   正確？<CheckBox value={this.state.check2} checkBoxColor='#3A8FB7' onClick={() => this.onClick2}/>
            </Text>
          </View>
          <View style={styles.multiAnswer}>
            <Text style={styles.text}>
              選項： 星期三                   正確？<CheckBox value={this.state.check3} checkBoxColor='#3A8FB7' onClick={() => this.onClick3}/>
            </Text>
          </View>
          <View style={styles.multiAnswer}>
            <Text style={styles.text}>
              選項： 星期四                   正確？<CheckBox value={this.state.check4} checkBoxColor='#3A8FB7' onClick={() => this.onClick4}/>
            </Text>
          </View>
          <View style={styles.multiAnswer}>
            <Text style={styles.text}>
              選項： 星期五                   正確？<CheckBox value={this.state.check5} checkBoxColor='#3A8FB7' onClick={() => this.onClick5}/>
            </Text>
          </View>
          <TouchableOpacity
            style={styles.multisubmitCon}
            onPress={this.onPress}
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
