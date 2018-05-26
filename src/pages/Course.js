import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import CloseImage from '../../asset/close.png'
import styles from './styles/Course.styles'
import navAction from '../actions/nav.action'
import courseItemAction from '../actions/courseItem.action'
import CourseItem from '../components/CourseItem'
import CourseItemData from '../components/CourseItemData'
import courseInfoAction from '../actions/courseInfo.action'
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
  courseInfoAction: {
    save: (info) => { dispatch(courseInfoAction.save(info)) },
  },
  multiPeerAction: {
    inviteAll: (peerList) => {
      peerList.forEach((peer) => {
        const { id, info } = peer
        dispatch(multiPeerAction.backend.invite(id, info))
      })
    },
  },
})

class Course extends Component {
  state = {
    numPeers: null,
  }
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
  componentDidUpdate() {
    const peerList = Object.values(this.props.peers)
    if (peerList.length !== this.state.numPeers && this.props.status === 'teacher') {
      this.props.multiPeerAction.inviteAll(peerList)
      this.setState({ numPeers: peerList.length })
    }
  }
  render() {
    const { courseItem } = this.props
    return (
      <View style={styles.container}>
        <Appbar title={this.props.course.courseName} withDrawer
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
                onPress={this.iconOnPress.bind(this)}/>
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
  multiPeerAction: PropTypes.shape({
    inviteAll: PropTypes.func.isRequired,
  }),
  course: PropTypes.object.isRequired,
  courseItem: PropTypes.object.isRequired,
  status: PropTypes.string.isRequired,
  peers: PropTypes.object.isRequired,
  mul: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(Course)
