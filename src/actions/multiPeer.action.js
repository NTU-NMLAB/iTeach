import { createActions } from 'redux-actions'
import Peer, { PeerStatus } from '../submodule/react-native-multipeer/classes/Peer.class'
import MultipeerConnectivity from '../submodule/react-native-multipeer'
import appConstants from '../submodule/react-native-multipeer/constants/App.constant'

const getStudentPeerInfo = state => ({
  service: appConstants.SERVICE_TYPE,
  isTeacher: 'false',
  username: state.profile.username,
  currCourseId: state.currCourse.courseId,
  currCourseTitle: state.currCourse.title,
})

const getTeacherPeerInfo = state => ({
  service: appConstants.SERVICE_TYPE,
  isTeacher: 'true',
  username: state.profile.username,
  currCourseId: state.currCourse.courseId,
  currCourseTitle: state.currCourse.title,
  currCourseColor: state.currCourse.color,
  currCourseYear: state.currCourse.year.toString(),
  currCourseSemester: state.currCourse.semester,
  currCourseClassroom: state.currCourse.classroom,
  currCourseWeekday: state.currCourse.weekday,
  currCourseTime: state.currCourse.time,
  currCourseWebsite: state.currCourse.website,
  currCourseTimestamp: state.currCourse.timestamp,
})

const { multiPeer } = createActions({
  multiPeer: {
    student: {
      startSearch: () => (dispatch, getState) => {
        dispatch(multiPeer.backend.advertise(getStudentPeerInfo(getState())))
        dispatch(multiPeer.common.setStatus(PeerStatus.SEARCHING))
      },
      stopSearch: () => (dispatch) => {
        dispatch(multiPeer.backend.hide())
        dispatch(multiPeer.common.setStatus(PeerStatus.IDLE))
      },
      openCourse: () => (dispatch, getState) => {
        dispatch(multiPeer.backend.advertise(getStudentPeerInfo(getState())))
        dispatch(multiPeer.common.setStatus(PeerStatus.VIEWING))
        dispatch(multiPeer.backend.broadcastData({
          messageType: 'REQUEST_COURSE_INFO',
          timestamp: getState().currCourse.timestamp,
        }))
      },
      exitCourse: () => (dispatch) => {
        dispatch(multiPeer.backend.hide())
        dispatch(multiPeer.backend.disconnect())
        dispatch(multiPeer.common.setStatus(PeerStatus.IDLE))
      },
    },
    teacher: {
      startRelease: () => (dispatch) => {
        dispatch(multiPeer.common.setStatus(PeerStatus.RELEASING))
      },
      stopRelease: () => (dispatch) => {
        // TODO: students shouldn't see the course after release stopped
        dispatch(multiPeer.common.setStatus(PeerStatus.VIEWING))
      },
      openCourse: () => (dispatch) => {
        dispatch(multiPeer.backend.browse())
        dispatch(multiPeer.common.setStatus(PeerStatus.VIEWING))
      },
      exitCourse: () => (dispatch) => {
        dispatch(multiPeer.backend.disconnect())
        dispatch(multiPeer.backend.stopBrowse())
        dispatch(multiPeer.common.setStatus(PeerStatus.IDLE))
      },
    },
    common: {
      setStatus: status => status,
      onPeerStateChange: (peer, change) => (dispatch, getState) => {
        // change: found, lost
        const state = getState()
        const info = getTeacherPeerInfo(state)
        if (state.profile.isTeacher) {
          if (change === 'found' && peer.info.service === appConstants.SERVICE_TYPE
            && (state.multiPeer.status === PeerStatus.RELEASING || peer.info.currCourseId === info.currCourseId)) {
            info.releasing = true
            dispatch(multiPeer.backend.invite(peer.id, info))
          }
        } else if (change === 'found') {
          // TODO
        } else if (change === 'lost') {
          // TODO
        }
      },
    },
    backend: {
      init: (selfName) => {
        return { selfName }
      },
      browse: () => {
        MultipeerConnectivity.browse()
      },
      stopBrowse: () => {
        MultipeerConnectivity.stopBrowse()
      },
      disconnect: (callback = () => {}) => {
        MultipeerConnectivity.disconnect(callback)
      },
      advertise: (info = {}) => {
        MultipeerConnectivity.advertise(info)
      },
      hide: () => {
        MultipeerConnectivity.hide()
      },
      invite: (peerId, myInfo, callback = () => {}) => {
        MultipeerConnectivity.invite(peerId, myInfo, callback)
        return { peerId }
      },
      responseInvite: (sender, accept, callback = () => {}) => {
        MultipeerConnectivity.responseInvite(sender.invitationId, accept, callback)
        return { sender }
      },
      requestInfo: (peerId) => {
        MultipeerConnectivity.requestInfo(peerId)
        return { peerId }
      },
      returnInfo: (receiverId, info) => {
        MultipeerConnectivity.returnInfo(receiverId, info)
        return { info }
      },
      createStreamForPeer: (peerId, name, callback = () => {}) => {
        MultipeerConnectivity.createStreamForPeer(peerId, name, callback)
      },
      sendData: (recipients, data, callback = () => {}) => {
        const recipientIds = recipients.map((recipient) => {
          if (recipient instanceof Peer) {
            return recipient.id
          }
          return recipient
        })
        MultipeerConnectivity.sendData(recipientIds, data, callback)
      },
      broadcastData: (data, callback = () => {}) => {
        MultipeerConnectivity.broadcastData(data, callback)
      },
      onPeerFoundSet: peer => ({ peer }),
      onPeerFound: (peerId, peerInfo) => (dispatch) => {
        const peer = new Peer(peerId, peerInfo)
        peer.online = true
        dispatch(multiPeer.common.onPeerStateChange(peer, 'found'))
        dispatch(multiPeer.backend.onPeerFoundSet(peer))
      },
      onPeerLostSet: peer => ({ peer }),
      onPeerLost: peerId => (dispatch, getState) => {
        const state = getState()
        if (peerId in state.multiPeer.peers) {
          const peer = state.multiPeer.peers[peerId]
          dispatch(multiPeer.common.onPeerStateChange(peer, 'lost'))
          dispatch(multiPeer.backend.onPeerLostSet(peer))
        }
      },
      onPeerConnected: (peerId) => {
        const peer = new Peer(peerId, {})
        return { peer }
      },
      onPeerConnecting: (peerId) => {
        return { peerId }
      },
      onPeerDisconnected: (peerId) => {
        return { peerId }
      },
      onStreamOpened: () => null,
      onInviteReceivedSet: peer => ({ peer }),
      onInviteReceived: invitation => (dispatch, getState) => {
        const state = getState()
        const info = getStudentPeerInfo(state)
        const peer = new Peer(
          invitation.sender.id,
          invitation.sender.info,
          false,
          false,
          invitation.id,
          true,
        )
        if (invitation.sender.info.currCourseId === info.currCourseId) {
          dispatch(multiPeer.backend.responseInvite({ invitationId: invitation.id }, true))
        }
        dispatch(multiPeer.backend.onInviteReceivedSet(peer))
      },
      onDataReceived: (senderId, data) => {
        return {
          senderId,
          data,
        }
      },
      onInfoUpdate: (peerId, info) => {
        return {
          info,
        }
      },
    },
  },
})

export default multiPeer
