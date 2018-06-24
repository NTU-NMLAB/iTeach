import { createActions } from 'redux-actions'
import Peer, { PeerStatus } from '../submodule/react-native-multipeer/classes/Peer'
import MultipeerConnectivity from '../submodule/react-native-multipeer'
import getRandomColor from '../util/getRandomColor'
import appConstants from '../submodule/react-native-multipeer/constants/App.constant'

const getStudentPeerInfo = state => ({
  service: appConstants.SERVICE_TYPE,
  identity: 'student',
  username: state.account.username,
  course: state.course.courseName,
  color: getRandomColor(),
})

const getTeacherPeerInfo = state => ({
  service: appConstants.SERVICE_TYPE,
  identity: 'teacher',
  username: state.account.username,
  course: state.course.courseName,
  color: getRandomColor(),
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
        dispatch(multiPeer.backend.browse())
        dispatch(multiPeer.backend.advertise(getStudentPeerInfo(getState())))
        dispatch(multiPeer.common.setStatus(PeerStatus.VIEWING))
      },
      exitCourse: () => (dispatch) => {
        dispatch(multiPeer.backend.stopBrowse())
        dispatch(multiPeer.backend.hide())
        dispatch(multiPeer.common.setStatus(PeerStatus.IDLE))
      },
    },
    teacher: {
      startRelease: () => (dispatch) => {
        dispatch(multiPeer.backend.browse())
        dispatch(multiPeer.common.setStatus(PeerStatus.RELEASING))
      },
      stopRelease: () => (dispatch) => {
        // TODO: students shouldn't see the course after release stopped
        dispatch(multiPeer.teacher.sendStopRelease())
        dispatch(multiPeer.backend.stopBrowse())
        dispatch(multiPeer.common.setStatus(PeerStatus.VIEWING))
      },
      openCourse: () => (dispatch, getState) => {
        dispatch(multiPeer.backend.browse())
        dispatch(multiPeer.backend.advertise(getTeacherPeerInfo(getState())))
        dispatch(multiPeer.common.setStatus(PeerStatus.VIEWING))
      },
      exitCourse: () => (dispatch) => {
        dispatch(multiPeer.backend.stopBrowse())
        dispatch(multiPeer.backend.hide())
        dispatch(multiPeer.teacher.stopRelease())
        dispatch(multiPeer.common.setStatus(PeerStatus.IDLE))
      },
      sendStopRelease: () => (dispatch) => {
        dispatch(multiPeer.backend.disconnect())
      },
    },
    common: {
      setStatus: status => status,
      onPeerStateChange: (peer, change) => (dispatch, getState) => {
        // change: found, lost
        const state = getState()
        const identity = state.account.status
        if (identity === 'teacher') {
          if (change === 'found' && state.multiPeer.status === PeerStatus.RELEASING
            && peer.info.service === appConstants.SERVICE_TYPE) {
            const info = getTeacherPeerInfo(state)
            info.releasing = true
            dispatch(multiPeer.backend.invite(peer.id, info))
          }
        } else if (identity === 'student') {
          if (change === 'found') {
            // TODO
          } else if (change === 'lost') {
            // TODO
          }
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
          if (recipient instanceof Peer) return recipient.id
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
      onInviteReceived: invitation => (dispatch) => {
        const peer = new Peer(
          invitation.sender.id,
          invitation.sender.info,
          false,
          false,
          invitation.id,
          true,
        )
        dispatch(multiPeer.backend.responseInvite({ invitationId: invitation.id }, true))
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
