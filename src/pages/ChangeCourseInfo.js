import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Text,
  View,
  TextInput,
  NetInfo,
  Alert,
} from 'react-native'
import { Picker } from 'react-native-picker-dropdown'
import DatePicker from 'react-native-datepicker'
import PropTypes from 'prop-types'
import Button from '../components/Button'
import styles from './styles/AddNewCourse.styles'
import getSemester from '../util/getSemester'
import getRandomColor from '../util/getRandomColor'
import newCoursesValidation from '../util/newCoursesValidation'
import addCourseAction from '../actions/addCourse.action'
import navAction from '../actions/nav.action'
import Appbar from '../components/Appbar'

const mapStateToProps = state => ({
  ...state.course,
  account: state.account,
})

const mapDispatchToProps = dispatch => ({
  nav: {
    classMenu: () => { dispatch(navAction.classMenu()) },
  },
  addCourseAction: {
    save: (info) => { dispatch(addCourseAction.save(info)) },
  },
})

class ChangeCourseInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      color: getRandomColor(),
      teacher: '',
      title: '',
      year: new Date().getFullYear() - 1911,
      semester: getSemester(),
      classroom: '',
      weekday: '星期一',
      time: '12:00',
      website: '',
    }
    this.connectionInfo = ''
    this.onPressConfirm = this.onPressConfirm.bind(this)
    this.onPressCancel = this.onPressCancel.bind(this)
    this.handleFirstConnectivityChange = this.handleFirstConnectivityChange.bind(this)
    this.tenYearsAgo = this.state.year - 7
    this.years = Array.from(Array(14), (_, x) => x + this.tenYearsAgo)
    this.stateToInfo = this.stateToInfo.bind(this)
  }
  stateToInfo = () => {
    const {
      color,
      course,
      year,
      semester,
      classroom,
      weekday,
      time,
      website,
    } = this.state

    const info = {
      teacher: this.props.account.username,
      title: course,
      color,
      semester: `${year}學年${semester}學期`,
      classroom,
      time: weekday + time,
      website,
    }
    return info
  }
  handleFirstConnectivityChange(connectionInfo) {
    this.connectionInfo = connectionInfo.type
  }

  componentDidMount() {
    NetInfo.getConnectionInfo().then((connectionInfo) => {
      this.connectionInfo = connectionInfo.type
    })

    NetInfo.addEventListener(
      'connectionChange',
      this.handleFirstConnectivityChange,
    )
  }

  onPressConfirm = () => {
    // TODO 按下確認鍵時要使用newCoursesValidation的函式
    if (!newCoursesValidation(this.state, this.connectionInfo).valid) {
      // 不符合規則，跳出警告視窗
      Alert.alert(
        '警告',
        newCoursesValidation(this.state, this.connectionInfo).description,
        [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ],
      )
      // 檢查應該清除哪行
      switch (newCoursesValidation(this.state, this.connectionInfo).errorCode) {
      case 5:
        this.setState({
          website: '',
        })
        break
      default:
        this.setState({
          course: '',
          classroom: '',
          website: '',
        })
      }
    } else {
      // 符合規則，跳轉到ClassMenu
      this.props.addCourseAction.save(this.stateToInfo())
    }
  }

  onPressCancel = () => {
    this.props.nav.classMenu()
  }

  render() {
    return (
      <View style={styles.container}>
        <Appbar title='新增課程'/>
        <View style={styles.whiteContainer}>
          <View>
            <View style={styles.courseInputContainer}>
              <View style={[styles.colorBox, { backgroundColor: this.state.color }]} />
              <TextInput
                style={styles.input}
                onChangeText={(course) => { this.setState({ course }) }}
                value={this.state.course}
              />
            </View>
            <View>
              <View style={styles.formInput}>
                <View style={styles.infoInputContainer}>
                  <Text style={styles.text}>
                    開課學期 ：
                  </Text>
                  <Picker
                    style={styles.picker}
                    textStyle={styles.pickerText}
                    selectedValue={this.state.year.toString() || (this.state && this.state.year)}
                    onValueChange={(itemValue) => { this.setState({ year: itemValue }) }}>
                    {
                      this.years.map((y, index) => (
                        <Picker.Item
                          key={index}
                          value={y.toString()}
                          label={y.toString()}
                        />
                      ))
                    }
                  </Picker>
                  <Picker
                    style={styles.picker}
                    textStyle={styles.pickerText}
                    selectedValue={(this.state && this.state.semester) || getSemester()}
                    onValueChange={(itemValue) => { this.setState({ semester: itemValue }) }}
                  >
                    <Picker.Item
                      value='上'
                      label='上'
                    />
                    <Picker.Item
                      value='下'
                      label='下'
                    />
                  </Picker>
                </View>
                <View style={styles.infoInputContainer}>
                  <Text style={styles.text}>
                    上課教室 ：
                  </Text>
                  <TextInput
                    style={styles.input}
                    onChangeText={(classroom) => { this.setState({ classroom }) }}
                    value={this.state.classroom}
                  />
                </View>
                <View style={styles.infoInputContainer}>
                  <Text style={styles.text}>
                    上課時間 ：
                  </Text>
                  <Picker
                    style={styles.picker}
                    textStyle={styles.pickerText}
                    selectedValue={(this.state && this.state.weekday) || '星期一'}
                    onValueChange={(itemValue) => { this.setState({ weekday: itemValue }) }}
                  >
                    <Picker.Item
                      value='星期日'
                      label='星期日'
                    />
                    <Picker.Item
                      value='星期一'
                      label='星期一'
                    />
                    <Picker.Item
                      value='星期二'
                      label='星期二'
                    />
                    <Picker.Item
                      value='星期三'
                      label='星期三'
                    />
                    <Picker.Item
                      value='星期四'
                      label='星期四'
                    />
                    <Picker.Item
                      value='星期五'
                      label='星期五'
                    />
                    <Picker.Item
                      value='星期六'
                      label='星期六'
                    />
                  </Picker>
                  <DatePicker
                    style={styles.picker}
                    date={this.state.time}
                    mode='time'
                    format='HH:mm'
                    confirmBtnText='確定'
                    cancelBtnText='取消'
                    minuteInteval={10}
                    onDateChange={(itemValue) => { this.setState({ time: itemValue }) }}
                  />
                </View>
                <View style={styles.infoInputContainer}>
                  <Text style={styles.text}>
                    課程網站 ：
                  </Text>
                  <TextInput
                    style={styles.input}
                    onChangeText={(website) => { this.setState({ website }) }}
                    value={this.state.website}
                  />
                </View>
              </View>
            </View>
          </View>
          <View style={styles.infoInputContainer}>
            <Button label='確認' onPress={this.onPressConfirm} />
            <Button label='取消' onPress={this.onPressCancel} />
          </View>
        </View>
      </View>
    )
  }
}

ChangeCourseInfo.propTypes = {
  addCourseAction: PropTypes.shape({
    save: PropTypes.func.isRequired,
  }).isRequired,
  nav: PropTypes.shape({
    classMenu: PropTypes.func.isRequired,
  }).isRequired,
  account: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangeCourseInfo)
