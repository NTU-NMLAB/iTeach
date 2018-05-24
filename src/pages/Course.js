import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  View,
  Text,
  Modal,
} from 'react-native'
import PropTypes from 'prop-types'
import CloseImage from '../../asset/close.png'
import styles from './styles/Course.styles'
import navAction from '../actions/nav.action'
import courseItemAction from '../actions/courseItem.action'
import CourseItem from '../components/CourseItem'
import CourseItemData from '../components/CourseItemData'
import Appbar from '../components/Appbar'
import Button from '../components/Button'
import multiPeerAction from '../actions/multiPeer.action'
import drawLotsAction from '../actions/drawLots.action'

const mapStateToProps = state => ({
  status: state.account.status,
  ...state,
})

const mapDispatchToProps = dispatch => ({
  navAction: {
    openDrawer: () => { dispatch(navAction.openDrawer()) },
    onExit: (identity) => {
      dispatch(navAction.classMenu())
      dispatch(multiPeerAction[identity].exitCourse())
    },
    enterFeature: (id) => { dispatch(navAction.enterFeature(id)) },
  },
  courseItemAction: {
    setName: (id) => {
      dispatch(courseItemAction.setName(id))
    },
    multiPeer: (id, status = '', onclick = false) => {
      if (id === 1 && status === 'teacher') {
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
})

class Course extends Component {
  iconOnPress(id) {
    const { multiPeer, status, courseItem } = this.props
    switch (id) {
    case 5:
      if (Object.keys(multiPeer.peers).length === 0) {
        this.props.drawLotsAction.setNoStudent()
        return
      }
      break
    default:
    }
    this.props.courseItemAction.setName(id)
    this.props.courseItemAction.multiPeer(
      id,
      status,
      courseItem.courseItem[1].onclick,
    )
    this.props.navAction.enterFeature(id)
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
    const { courseItem, drawLots } = this.props
    return (
      <View style={styles.container}>
        <Appbar title={this.props.course.courseName}
          rightIcon={CloseImage}
          onRightPress={ () => this.props.navAction.onExit(this.props.status) }/>
        <View style={styles.itemContainer}>
          {CourseItemData.filter(item => item.user.includes(this.props.status))
            .map(item => (
              <CourseItem
                key={item.id} id={item.id}
                title={courseItem.courseItem[item.id].onclick
                  ? courseItem.courseItem[item.id].title[1]
                  : courseItem.courseItem[item.id].title[0]}
                imgSrc={courseItem.courseItem[item.id].onclick
                  ? courseItem.courseItem[item.id].imgSrc[1]
                  : courseItem.courseItem[item.id].imgSrc[0]}
                onPress={this.iconOnPress.bind(this)} />
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

Course.propTypes = {
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
  course: PropTypes.object.isRequired,
  courseItem: PropTypes.object.isRequired,
  status: PropTypes.string.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(Course)
