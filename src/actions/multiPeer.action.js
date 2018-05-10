import { createActions } from 'redux-actions'
import Peer from '../components/Peer'
import MultipeerConnectivity from '../util/multiPeerInit'
import getRandomColor from '../util/getRandomColor'

const { multiPeer } = createActions({
  multiPeer: {
    student: {
      startSearch: info => (dispatch) => {
        dispatch(multiPeer.backend.advertise())
      },
      stopSearch: () => (dispatch) => {
        dispatch(multiPeer.backend.hide())
      },
      joinCourse: (peerId, name, callback = () => {}) => {
        dispatch(multiPeer.backend.invite(peerId, name, callback))
      },
    },
    teacher: {
      startRelease: () => (dispatch) => {
        dispatch(multiPeer.backend.browse())
      },
      stopRelease: () => (dispatch) => {
        dispatch(multiPeer.backend.stopBrowse())
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
      responseInvite: (sender, accept, callback = () => {}) => (dispatch) => {
        MultipeerConnectivity.responseInvite(sender, accept, callback)
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
            return { recipient: recipient.id }
          }
          return { recipient }
        })
        MultipeerConnectivity.sendData(recipientIds, data, callback)
      },
      broadcastData: (data, callback = () => {}) => {
        MultipeerConnectivity.broadcastData(data, callback)
      },
      onPeerFoundSet: peer => peer,
      onPeerFound: (peerId, peerInfo) => (dispatch, getState) => {
        const peer = new Peer(peerId, peerInfo)
        const state = getState()
        dispatch(multiPeer.backend.invite(
          peer.id,
          {
            title: state.course.courseName,
            teacher: state.account.username,
            color: getRandomColor(),
          },
        ))
        dispatch(multiPeer.backend.onPeerFoundSet({ peer }))
        dispatch(multiPeer.backend.onPeerConnected(peerId, peerInfo))     
      },
      onPeerLost: (peerId) => {
        return { peerId }
      },
      onPeerConnected: (peerId, peerInfo) => {
        const peer = new Peer(peerId, peerInfo, true, false, '')
        return { peer }
      },
      onPeerConnecting: (peerId) => {
        return { peerId }
      },
      onPeerDisconnected: (peerId) => {
        return { peerId }
      },
      onStreamOpened: () => null,
      onInviteReceived: (invitation) => {
        const peer = new Peer(
          invitation.sender.id,
          invitation.sender.info,
          false,
          false,
          invitation.id,
        )
        return { peer }
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
