import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  View,
  FlatList,
  ActivityIndicator,
  Alert,
} from 'react-native'
import PropTypes from 'prop-types'
import CloseImage from '../../asset/close.png'
import styles from './styles/CourseMenu.style'
import navAction from '../actions/nav.action'
import currCourseAction from '../actions/currCourse.action'
import Appbar from '../components/Appbar.component'
import CourseSearchItem from '../components/CourseSearchItem.component'
import courseMenuAction from '../actions/courseMenu.action'
import multiPeerAction from '../actions/multiPeer.action'
// import mockNewClass from '../../asset/mockNewClass.json'

const mapStateToProps = state => ({
  isTeacher: state.profile.isTeacher,
  multiPeer: state.multiPeer,
  courseIdList: state.courseMenu.courseList.map(course => course.courseId),
})

const mapDispatchToProps = dispatch => ({
  navAction: {
    onExit: () => {
      dispatch(navAction.courseMenu())
      dispatch(multiPeerAction.student.stopSearch())
    },
  },
  courseMenuAction: {
    add: (item) => {
      dispatch(courseMenuAction.courseList.add(item))
      dispatch(multiPeerAction.student.stopSearch())
    },
  },
  currCourseAction: {
    setData: (courseData) => { dispatch(currCourseAction.setData(courseData)) },
  },
})

class CourseSearch extends Component {
  constructor(props) {
    super(props)
    this.selectClass = this.selectClass.bind(this)
  }

  selectClass(classItem) {
    const { title, teacher } = classItem
    Alert.alert(
      ''.concat('是否加入 ', teacher, ' 老師所開設的', title),
      '',
      [
        { text: '否', onPress: () => { console.log('Cancel Pressed') }, style: 'cancel' },
        { text: '是', onPress: () => { this.registerClass(classItem) }, style: 'default' },
      ],
      { cancelable: false },
    )
  }

  registerClass(classItem) {
    const classItemForStudent = {
      title: classItem.title,
      color: classItem.color,
      teacher: classItem.teacher,
      year: classItem.year,
      semester: classItem.semester,
      classroom: classItem.classroom,
      weekday: classItem.weekday,
      time: classItem.time,
      website: classItem.website,
      courseId: classItem.courseId,
      timestamp: classItem.timestamp,
      studentQuizHistory: [],
      userIds: [],
    }
    this.props.courseMenuAction.add(classItemForStudent)
  }

  getCourseInfo() {
    return Object.keys(this.props.multiPeer.peersStatus)
      .filter(userId =>
        this.props.multiPeer.peersInfo[userId].isTeacher &&
        this.props.multiPeer.peersStatus[userId].invited &&
        !this.props.courseIdList.includes(this.props.multiPeer.peersStatus[userId].currCourse.courseId))
      .map((userId) => {
        const { currCourse } = this.props.multiPeer.peersStatus[userId]
        return {
          ...currCourse,
          teacherPeerId: this.props.multiPeer.peersStatus[userId].currPeerId,
        }
      })
  }

  render() {
    return (
      <View style={styles.container}>
        <Appbar title='搜尋課程' rightIcon={CloseImage} onRightPress={this.props.navAction.onExit}/>
        <View style={styles.listContainer}>
          <FlatList
            style={styles.list}
            data={ this.getCourseInfo() }
            keyExtractor={item => item.courseId}
            renderItem={({ item }) => (
              <CourseSearchItem
                title={item.title}
                teacher={item.teacher}
                color={item.color}
                onPress={() => { this.selectClass(item) } }
              />
            )}
          />
          <View>
            <ActivityIndicator size="large" color="#3A8FB7" />
          </View>
        </View>
      </View>
    )
  }
}

CourseSearch.propTypes = {
  navAction: PropTypes.shape({
    onExit: PropTypes.func.isRequired,
  }).isRequired,
  courseMenuAction: PropTypes.shape({
    add: PropTypes.func.isRequired,
  }).isRequired,
  isTeacher: PropTypes.bool.isRequired,
  courseIdList: PropTypes.arrayOf(PropTypes.string),
  multiPeer: PropTypes.shape({
    peersStatus: PropTypes.object.isRequired,
    peersInfo: PropTypes.object.isRequired,
  }).isRequired,
  currCourseAction: PropTypes.shape({
    setData: PropTypes.func.isRequired,
  }).isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(CourseSearch)
