import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Alert } from 'react-native'
import PropTypes from 'prop-types'
import CloseImage from '../../asset/close.png'
import styles from './styles/Course.styles'
import navAction from '../actions/nav.action'
import courseItemAction from '../actions/courseItem.action'
import CourseItem from '../components/CourseItem'
import CourseItemData from '../components/CourseItemData'
import Appbar from '../components/Appbar'
import multiPeerAction from '../actions/multiPeer.action'

const mapStateToProps = state => ({
  peers: state.multiPeer.peers,
  status: state.account.status,
  mul: state.multiPeer,
  ...state,
})

const mapDispatchToProps = dispatch => ({
  navAction: {
    openDrawer: () => { dispatch(navAction.openDrawer()) },
    onExit: () => { dispatch(navAction.classMenu()) },
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
  courseInfoAction: {
    save: (info) => { dispatch(courseInfoAction.save(info)) },
  },
})

class Course extends Component {
  getPeerInfo() {
    return Object.keys(this.props.peers).map(peerId => this.props.peers[peerId].info)
  }

  iconOnPress(id) {
    this.props.courseItemAction.setName(id)
    this.props.courseItemAction.multiPeer(
      id,
      this.props.status,
      this.props.courseItem.courseItem[1].onclick,
    )
    this.props.navAction.enterFeature(id)
  }
  render() {
    const { courseItem } = this.props
    return (
      <View style={styles.container}>
        <Appbar title={this.props.course.courseName}
          rightIcon={CloseImage}
          onRightPress={this.props.navAction.onExit}/>
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
  course: PropTypes.object.isRequired,
  courseItem: PropTypes.object.isRequired,
  status: PropTypes.string.isRequired,
  peers: PropTypes.object.isRequired,
  mul: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(Course)
