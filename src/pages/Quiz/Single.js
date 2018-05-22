import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import PropTypes from 'prop-types'
import CloseImage from '../../../asset/close.png'
import styles from '../styles/Question.styles'
import navAction from '../../actions/nav.action'
import Appbar from '../../components/Appbar'
import addSingleAction from '../../actions/addSingle.action'


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
  addSingleAction: {
    save: (info) => { dispatch(addSingleAction.save(info)) },
  },
})

class Single extends Component {
  constructor(props){
    super(props);
    this.state={
      questionState: '',
      rightAns: '',
      wrongAns1: '',
      wrongAns2: '',
      wrongAns3: '',
    }
    this.onPressSubmit=this.onPressSubmit.bind(this);

  }
  onPressSubmit = () => {
    this.props.addSingleAction.save(this.state);
  }

  render() {
    const questionType = '單選題'
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
          <View style={styles.singleAnswer}>
            <Text style={styles.text}>
              正確選項：
            </Text>
            <TextInput
              style={styles.singleInput}
              onChangeText={(rightAns) => { this.setState({ rightAns }) }}
              value={this.state.rightAns}
              placeholder='正確答案'
            />
          </View>
          <View style={styles.singleAnswer}>
            <Text style={styles.text}>
              錯誤選項：
            </Text>
            <TextInput
              style={styles.singleInput}
              onChangeText={(wrongAns1) => { this.setState({ wrongAns1 }) }}
              value={this.state.wrongAns1}
              placeholder='錯誤答案'
            />
          </View>
          <View style={styles.singleAnswer}>
            <Text style={styles.text}>
              錯誤選項：
            </Text>
            <TextInput
              style={styles.singleInput}
              onChangeText={(wrongAns2) => { this.setState({ wrongAns2 }) }}
              value={this.state.wrongAns2}
              placeholder='錯誤答案'
            />
          </View>
          <View style={styles.singleAnswer}>
            <Text style={styles.text}>
              錯誤選項：
            </Text>
            <TextInput
              style={styles.singleInput}
              onChangeText={(wrongAns3) => { this.setState({ wrongAns3 }) }}
              value={this.state.wrongAns3}
              placeholder='錯誤答案'
            />
          </View>
          <TouchableOpacity
            style={styles.singlesubmitCon}
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

Single.propTypes = {
  navAction: PropTypes.shape({
    openDrawer: PropTypes.func.isRequired,
    onExit: PropTypes.func.isRequired,
    historyRecord: PropTypes.func.isRequired,
  }).isRequired,
  addSingleAction: PropTypes.shape({
    save: PropTypes.func.isRequired,
  }).isRequired,
  course: PropTypes.object.isRequired,
  quizItem: PropTypes.object,
  status: PropTypes.string.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(Single)
