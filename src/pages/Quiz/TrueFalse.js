import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, Switch, TouchableOpacity, TextInput } from 'react-native'
import PropTypes from 'prop-types'
import CloseImage from '../../../asset/close.png'
import styles from '../styles/Question.styles'
import navAction from '../../actions/nav.action'
import Appbar from '../../components/Appbar'
import addTrueFalseAction from '../../actions/addTrueFalse.action'


const mapStateToProps = state => ({
  status: state.account.status,
  ...state,
})

const mapDispatchToProps = dispatch => ({
  navAction: {
    openDrawer: () => { dispatch(navAction.openDrawer()) },
    onExit: () => { dispatch(navAction.quizMainPage()) },
    historyRecord: () => { dispatch(navAction.historyRecord()) },
  },
  addTrueFalseAction: {
    save: (info) => { dispatch(addTrueFalseAction.save(info)) },
  },
})


class TrueFalse extends Component {
  constructor() {
    super();
    this.state={
      questionState: '',
      value: true,
    };
    this.onPressSubmit=this.onPressSubmit.bind(this);
  }
  onPressSubmit = () => {
    this.props.addTrueFalseAction.save(this.state);
  }

  render() {
    const questionType = '是非題'
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
          <View style={styles.truefalseAnswer}>
            <Text style={styles.text}>
              正確答案：   是  <Switch style={styles.switch} value={this.state.value} onValueChange={(value) => this.setState({value})} />  否
            </Text>
          </View>
          <TouchableOpacity
            style={styles.truefalsesubmitCon}
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

TrueFalse.propTypes = {
  navAction: PropTypes.shape({
    openDrawer: PropTypes.func.isRequired,
    onExit: PropTypes.func.isRequired,
  }).isRequired,
  course: PropTypes.object.isRequired,
  quizItem: PropTypes.object,
  status: PropTypes.string.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(TrueFalse)
