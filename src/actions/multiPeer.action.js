import { createActions } from 'redux-actions'
import { AsyncStorage } from 'react-native'
import Peer, { PeerStatus } from '../submodule/react-native-multipeer/classes/Peer.class'
import MultipeerConnectivity from '../submodule/react-native-multipeer'
import appConstants from '../submodule/react-native-multipeer/constants/App.constant'

const getStudentPeerInfo = state => ({
  service: appConstants.SERVICE_TYPE,
  isTeacher: 'false',
  username: state.profile.username,
  currCourseId: state.currCourse.courseId,
  currCourseTitle: state.currCourse.title,
  selfName: state.multiPeer.selfName,
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
  selfName: state.multiPeer.selfName,
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
      },
      exitCourse: () => (dispatch) => {
        dispatch(multiPeer.backend.hide())
        dispatch(multiPeer.backend.disconnect())
        dispatch(multiPeer.common.setStatus(PeerStatus.IDLE))
      },
      requestCourseInfo: () => (dispatch, getState) => {
        dispatch(multiPeer.backend.broadcastData({
          messageType: 'REQUEST_COURSE_INFO',
          timestamp: getState().currCourse.timestamp,
        }))
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
      init: () => (async (dispatch) => {
        let selfName = JSON.parse(await AsyncStorage.getItem('iTeachStore:selfName'))
        if (!selfName) {
          selfName = `User-${Math.round(1e6 * Math.random())}`
          await AsyncStorage.setItem('iTeachStore:selfName', JSON.stringify(selfName))
          dispatch(multiPeer.backend.initPeers({}, {}))
        } else {
          let peers = JSON.parse(await AsyncStorage.getItem('iTeachStore:peers'))
          let courses = JSON.parse(await AsyncStorage.getItem('iTeachStore:peersInCourses'))
          if (!peers) {
            peers = {}
          }
          if (!courses) {
            courses = {}
          }
          dispatch(multiPeer.backend.initPeers(peers, courses))
        }
        dispatch(multiPeer.backend.setSelfName(selfName))
      }),
      setSelfName: selfName => ({ selfName }),
      initPeers: (peers, courses) => ({ peers, courses }),
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
      onPeerFoundSet: (peers, courses) => ({ peers, courses }),
      // when a teacher found students, add the students into Peers
      onPeerFound: (peerId, peerInfo) => async (dispatch, getState) => {
        const peer = new Peer(peerId, peerInfo)
        const state = getState()
        peer.online = true
        const { courses } = state.multiPeer
        if (!(peer.info.currCourseId in courses)) {
          courses[peer.info.currCourseId] = {}
        }
        courses[peer.info.currCourseId][peer.id] = true
        const peers = {}
        Object.values(state.multiPeer.peers)
          .filter(p => p.info.selfName !== peer.info.selfName)
          .forEach((p) => { peers[p.id] = p })
        peers[peer.id] = peer
        await AsyncStorage.setItem('iTeachStore:peers', JSON.stringify(peers))
        await AsyncStorage.setItem('iTeachStore:peersInCourses', JSON.stringify(courses))
        dispatch(multiPeer.common.onPeerStateChange(peer, 'found'))
        dispatch(multiPeer.backend.onPeerFoundSet(peers, courses))
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
      onInviteReceivedSet: peers => ({ peers }),
      // when students being invited by a teacher, add teacher to Peers
      onInviteReceived: invitation => async (dispatch, getState) => {
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

        const peers = {}
        Object.values(state.multiPeer.peers)
          .filter(p => p.info.selfName !== peer.info.selfName)
          .forEach((p) => { peers[p.id] = p })
        peers[peer.id] = peer
        await AsyncStorage.setItem('iTeachStore:peers', JSON.stringify(peers))
        dispatch(multiPeer.backend.onInviteReceivedSet(peers))
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
