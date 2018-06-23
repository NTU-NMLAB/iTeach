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
import styles from './styles/ClassMenu.style'
import navAction from '../actions/nav.action'
import Appbar from '../components/Appbar.component'
import SearchClassItem from '../components/SearchClassItem.component'
import classMenuAction from '../actions/classMenu.action'
import multiPeerAction from '../actions/multiPeer.action'
// import mockNewClass from '../../asset/mockNewClass.json'

const mapStateToProps = state => ({
  isTeacher: state.profile.isTeacher,
  peers: state.multiPeer.peers,
  courseName: state.course.courseName,
})

const mapDispatchToProps = dispatch => ({
  navAction: {
    onExit: () => {
      dispatch(navAction.classMenu())
      dispatch(multiPeerAction.student.stopSearch())
    },
  },
  classListAction: {
    add: item =>
      dispatch(classMenuAction.classList.add(item))
    ,
  },
})

class SearchPage extends Component {
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
    const classItemForStudent = { ...classItem }
    classItemForStudent.studentQuizHistory = []
    this.props.classListAction.add(classItemForStudent)
  }

  getCourseInfo() {
    // return Object.keys(this.props.peers).map(i => this.props.peers[i].info)
    return Object.keys(this.props.peers).map((i) => {
      const { info } = this.props.peers[i]
      return {
        title: info.course,
        teacher: info.username,
        color: info.color,
        isTeacher: info.isTeacher === 'true',
        connected: this.props.peers[i].connected,
      }
    }).filter(item => (item.isTeacher && item.connected === true))
  }

  render() {
    return (
      <View style={styles.container}>
        <Appbar title='搜尋課程' rightIcon={CloseImage} onRightPress={this.props.navAction.onExit}/>
        <View style={styles.listContainer}>
          <FlatList
            style={styles.list}
            data={ this.getCourseInfo() }
            keyExtractor={item => item.title}
            renderItem={({ item }) => (
              <SearchClassItem
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

SearchPage.propTypes = {
  navAction: PropTypes.shape({
    onExit: PropTypes.func.isRequired,
  }).isRequired,
  classListAction: PropTypes.shape({
    add: PropTypes.func.isRequired,
  }).isRequired,
  isTeacher: PropTypes.bool.isRequired,
  peers: PropTypes.object.isRequired,
  courseName: PropTypes.string.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage)
