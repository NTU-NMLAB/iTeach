import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  View,
  Text,
  Modal,
} from 'react-native'
import PropTypes from 'prop-types'
import CloseImage from '../../asset/close.png'
import styles from './styles/Course.style'
import navAction from '../actions/nav.action'
import courseItemAction from '../actions/courseItem.action'
import CourseItem from '../components/CourseItem.component'
import CourseItemData from '../components/CourseItemData.component'
import Appbar from '../components/Appbar.component'
import Button from '../components/Button.component'
import multiPeerAction from '../actions/multiPeer.action'
import drawLotsAction from '../actions/drawLots.action'
import courseMenuAction from '../actions/courseMenu.action'
import mockDownloadData from '../../asset/mockDownloadData.json'

const mapStateToProps = state => ({
  peers: state.multiPeer.peers,
  isTeacher: state.profile.isTeacher,
  multiPeer: state.multiPeer,
  courseItem: state.courseItem,
  drawLots: state.drawLots,
})

const mapDispatchToProps = dispatch => ({
  navAction: {
    openDrawer: () => { dispatch(navAction.openDrawer()) },
    onExit: (isTeacher) => {
      dispatch(navAction.courseMenu())
      dispatch(multiPeerAction[isTeacher ? 'teacher' : 'student'].exitCourse())
    },
    enterFeature: (id) => { dispatch(navAction.enterFeature(id)) },
  },
  courseItemAction: {
    setName: (id) => {
      dispatch(courseItemAction.setName(id))
    },
    multiPeer: (id, isTeacher = false, onclick = false) => {
      if (id === 1 && isTeacher === true) {
        if (onclick === false) {
          dispatch(multiPeerAction.teacher.startRelease())
        } else {
          dispatch(multiPeerAction.teacher.stopRelease())
        }
      }
    },
  },
  drawLotsAction: {
    setNoStudent: () => { dispatch(drawLotsAction.setNoStudent()) },
    handleNoStudent: () => { dispatch(drawLotsAction.handleNoStudent()) },
  },
  courseMenuAction: {
    modify: (courseData) => {
      dispatch(courseMenuAction.courseList.modify(courseData))
    },
  },
})

class CourseHome extends Component {
  componentWillMount() {
    const { currCourseData } = this.props.navigation.state.params
    if (this.props.isTeacher === false && currCourseData.downloadData === undefined) {
      currCourseData.downloadData = JSON.parse(JSON.stringify(mockDownloadData.Files))
      currCourseData.showActivityIndicator = false
      this.props.courseMenuAction.modify(currCourseData)
    }
  }

  onCourseItemPressed(id) {
    const {
      isTeacher,
      multiPeer,
      courseItem,
      navigation,
    } = this.props
    const { currCourseData } = navigation.state.params
    switch (id) {
    case 5:
      if (typeof multiPeer.courses[currCourseData.courseId] === 'undefined') {
        this.props.drawLotsAction.setNoStudent()
        return
      }
      break
    default:
    }
    this.props.courseItemAction.setName(id)
    this.props.courseItemAction.multiPeer(
      id,
      isTeacher,
      courseItem.courseItem[1].onclick,
    )
    this.props.navAction.enterFeature(id, currCourseData)
  }
  alertForStudent(signalIn) {
    if (!signalIn) return null
    return (
      <View style={styles.insideAlert}>
        <Text style={styles.alertTitle}>警告</Text>
        <Text style={styles.alertText}>在線名單沒有任何同學</Text>
        <View style={styles.alertButton}>
          <Button label="OK" onPress={this.props.drawLotsAction.handleNoStudent}/>
        </View>
      </View>
    )
  }
  render() {
    const { courseItem, drawLots, navigation } = this.props
    const { currCourseData } = navigation.state.params
    return (
      <View style={styles.container}>
        <Appbar title={currCourseData.title} withDrawer
          rightIcon={CloseImage}
          onRightPress={ () => {
            if (this.props.isTeacher === true && this.props.courseItem.courseItem[1].onclick) {
              this.props.courseItemAction.setName(1)
              this.props.courseItemAction.multiPeer(
                1,
                this.props.isTeacher,
                this.props.courseItem.courseItem[1].onclick,
              )
            }
            this.props.navAction.onExit(this.props.isTeacher)
          } }/>
        <View style={styles.itemContainer}>
          {this.props.isTeacher === true ?
            CourseItemData.filter(item => item.user.includes('teacher'))
              .map(item => (
                <CourseItem
                  key={item.id} id={item.id}
                  title={courseItem.courseItem[item.id].onclick
                    ? courseItem.courseItem[item.id].title[1]
                    : courseItem.courseItem[item.id].title[0]}
                  imgSrc={courseItem.courseItem[item.id].onclick
                    ? courseItem.courseItem[item.id].imgSrc[1]
                    : courseItem.courseItem[item.id].imgSrc[0]}
                  onPress={this.onCourseItemPressed.bind(this)}/>
              )) :
            CourseItemData.filter(item => item.user.includes('student'))
              .map(item => (
                <CourseItem
                  key={item.id} id={item.id}
                  title={courseItem.courseItem[item.id].onclick
                    ? courseItem.courseItem[item.id].title[1]
                    : courseItem.courseItem[item.id].title[0]}
                  imgSrc={courseItem.courseItem[item.id].onclick
                    ? courseItem.courseItem[item.id].imgSrc[1]
                    : courseItem.courseItem[item.id].imgSrc[0]}
                  onPress={this.onCourseItemPressed.bind(this)}/>
              ))
          }
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={drawLots.noStudent}>
          <View style={styles.outsideAlert}>
            {this.alertForStudent(drawLots.noStudent)}
          </View>
        </Modal>
      </View>
    )
  }
}

CourseHome.propTypes = {
  navAction: PropTypes.shape({
    openDrawer: PropTypes.func.isRequired,
    onExit: PropTypes.func.isRequired,
    enterFeature: PropTypes.func.isRequired,
  }).isRequired,
  courseItemAction: PropTypes.shape({
    setName: PropTypes.func.isRequired,
    multiPeer: PropTypes.func.isRequired,
  }).isRequired,
  drawLotsAction: PropTypes.shape({
    setNoStudent: PropTypes.func.isRequired,
    handleNoStudent: PropTypes.func.isRequired,
  }).isRequired,
  drawLots: PropTypes.shape({
    noStudent: PropTypes.bool.isRequired,
  }).isRequired,
  multiPeer: PropTypes.shape({
    peers: PropTypes.object.isRequired,
  }).isRequired,
  courseItem: PropTypes.object.isRequired,
  isTeacher: PropTypes.bool.isRequired,
  peers: PropTypes.object.isRequired,
  courseMenuAction: PropTypes.object.isRequired,
  navigation: PropTypes.shape({
    state: PropTypes.shape({
      params: PropTypes.shape({
        currCourseData: PropTypes.object.isRequired,
      }),
    }),
  }),
}

export default connect(mapStateToProps, mapDispatchToProps)(CourseHome)
