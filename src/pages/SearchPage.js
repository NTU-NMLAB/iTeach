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
import styles from './styles/ClassMenu.styles'
import navAction from '../actions/nav.action'
import Appbar from '../components/Appbar'
import SearchClassItem from '../components/SearchClassItem'
import classMenuAction from '../actions/classMenu.action'
import multiPeerAction from '../actions/multiPeer.action'
import courseAction from '../actions/course.action'
import courseInfoAction from '../actions/courseInfo.action'
// import mockNewClass from '../../asset/mockNewClass.json'

const mapStateToProps = state => ({
  status: state.account.status,
  peers: state.multiPeer.peers,
  courseName: state.course.courseName,
  ...state,
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
  courseAction: {
    joinCourse: (sender, title) => {  
      dispatch(multiPeerAction.backend.responseInvite(sender[0].invitationId, true))
      dispatch(multiPeerAction.student.stopSearch())
      dispatch(multiPeerAction.backend.onPeerConnected(sender[0].id, sender[0].info))
      dispatch(courseAction.setName(title)) 
    },
  },
  courseInfoAction: {
    save: (info) => { dispatch(courseInfoAction.save(info)) },
  },
})

class SearchPage extends Component {
  constructor(props) {
    super(props)
    this.selectClass = this.selectClass.bind(this)
    this.getCourseInfo = this.getCourseInfo.bind(this)
    this.saveCourseInfo = this.saveCourseInfo.bind(this)
    this.onConfirm = this.onConfirm.bind(this)
  }

  selectClass(classItem) {
    const { title, teacher } = classItem
    Alert.alert(
      ''.concat('是否加入 ', teacher, ' 老師所開設的', title),
      '',
      [
        { text: '否', onPress: () => { console.log('Cancel Pressed') }, style: 'cancel' },
        { text: '是', onPress: () => { this.onConfirm(classItem) }, style: 'default' },
      ],
      { cancelable: false },
    )
  }

  onConfirm(classItem){
    this.saveCourseInfo(classItem)
    this.registerClass(classItem.title)
  }

  getCourseInfo() {
    // return Object.keys(this.props.peers).map(i => this.props.peers[i].info)
    return Object.keys(this.props.peers).map((i) => {
      const { info } = this.props.peers[i]
      return {
        title: info.course,
        teacher: info.username,
        color: info.color,
        identity: info.identity,
        connected: this.props.peers[i].connected,
      }
    }).filter((item) => {
      return item.identity === 'teacher' && item.connected === true
    })
  }


  saveCourseInfo(classItem){
    this.props.courseInfoAction.save(this.getCousreInfo()[0])
    this.props.classListAction.add(classItem)
  }

  registerClass(title){
    Alert.alert(''.concat('進入 ', title, ' 課程頁面'))     
    peer = Object.keys(this.props.peers).map(peerId => this.props.peers[peerId])
    this.props.courseAction.joinCourse(peer, title) 
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
  courseAction: PropTypes.shape({
    joinCourse: PropTypes.func.isRequired,
  }).isRequired,
  courseInfoAction: PropTypes.shape({
    save: PropTypes.func.isRequired,
  }).isRequired,
  status: PropTypes.string.isRequired,
  peers: PropTypes.object.isRequired,
  courseName: PropTypes.string.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage)
