import { createActions } from 'redux-actions'
import { AsyncStorage, Alert } from 'react-native'
import PeerInfo from '../submodule/react-native-multipeer/classes/PeerInfo.class'
import PeerStatus from '../submodule/react-native-multipeer/classes/PeerStatus.class'
import MultipeerConnectivity from '../submodule/react-native-multipeer'
import courseMenuAction from './courseMenu.action'
import getSelfInfo from '../submodule/react-native-multipeer/utils/getSelfInfo.util'

const { multiPeer } = createActions({
  multiPeer: {
    student: {
      startSearch: () => (dispatch, getState) => {
        dispatch(multiPeer.common.updateOwnStatus('ADVERTISE'))
        dispatch(multiPeer.backend.advertise(getSelfInfo(getState())))
      },
      stopSearch: () => (dispatch) => {
        dispatch(multiPeer.common.updateOwnStatus('STOP_ADVERTISE'))
        dispatch(multiPeer.backend.hide())
      },
      openCourse: () => (dispatch, getState) => {
        dispatch(multiPeer.common.updateOwnStatus('ADVERTISE'))
        dispatch(multiPeer.backend.advertise(getSelfInfo(getState())))
      },
      exitCourse: () => (dispatch) => {
        dispatch(multiPeer.common.updateOwnStatus('STOP_ADVERTISE'))
        dispatch(multiPeer.backend.hide())
        dispatch(multiPeer.backend.disconnect())
      },
      requestCourseInfo: () => (dispatch, getState) => {
        dispatch(multiPeer.backend.broadcastData({
          messageType: 'REQUEST_COURSE_INFO',
          timestamp: getState().currCourse.timestamp,
        }))
      },
      requestQuizUpdate: () => (dispatch, getState) => {
        const quizHistory = getState().currCourse.studentQuizHistory
        dispatch(multiPeer.backend.broadcastData({
          messageType: 'REQUEST_QUIZ_UPDATE',
          timestamp: quizHistory.length > 0 ? quizHistory[quizHistory.length - 1].releaseTime : undefined,
        }))
      },
    },
    teacher: {
      openCourse: () => (dispatch) => {
        dispatch(multiPeer.common.updateOwnStatus('BROWSE'))
        dispatch(multiPeer.backend.browse())
      },
      exitCourse: () => (dispatch) => {
        dispatch(multiPeer.common.updateOwnStatus('STOP_BROWSE'))
        dispatch(multiPeer.common.updateOwnStatus('STOP_RELEASE'))
        dispatch(multiPeer.backend.stopBrowse())
        dispatch(multiPeer.backend.disconnect())
      },
    },
    common: {
      updateOwnStatus: newStatus => newStatus, // typeof newStatus === string
      updatePeerInfo: peerInfo => peerInfo,
      updatePeerStatus: (userId, peerStatus, change = '') => ({ userId, peerStatus, change }),
      savePeerInfo: peerInfo => (async (dispatch, getState) => {
        const { peersInfo } = getState().multiPeer
        peersInfo[peerInfo.userId] = peerInfo

        let success = false
        await AsyncStorage.setItem('iTeachStore:peersInfo', JSON.stringify(peersInfo), (error) => {
          if (error) {
            Alert.alert(
              'P2P錯誤',
              [{ text: 'OK' }],
            )
          } else {
            success = true
          }
        })
        if (success) {
          dispatch(multiPeer.common.updatePeerInfo(peerInfo))
        }
      }),
    },
    backend: {
      init: () => (async (dispatch) => {
        let userId = JSON.parse(await AsyncStorage.getItem('iTeachStore:userId'))
        if (!userId) {
          userId = `User-${Math.round(1e6 * Math.random())}`
          await AsyncStorage.setItem('iTeachStore:userId', JSON.stringify(userId))
        } else {
          const peersInfo = JSON.parse(await AsyncStorage.getItem('iTeachStore:peersInfo'))
          if (peersInfo) {
            dispatch(multiPeer.backend.initPeersInfo(peersInfo))
          }
        }
        dispatch(multiPeer.backend.setUserId(userId))
      }),
      setUserId: userId => userId,
      initPeersInfo: peersInfo => peersInfo,
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
      returnInfo: (receiverPeerId, info) => {
        MultipeerConnectivity.returnInfo(receiverPeerId, info)
        return { info }
      },
      createStreamForPeer: (peerId, name, callback = () => {}) => {
        MultipeerConnectivity.createStreamForPeer(peerId, name, callback)
      },
      sendData: (recipientPeerIds, data, callback = () => {}) => {
        MultipeerConnectivity.sendData(recipientPeerIds, data, callback)
      },
      broadcastData: (data, callback = () => {}) => {
        MultipeerConnectivity.broadcastData(data, callback)
      },
      onPeerFound: (peerId, info) => async (dispatch, getState) => {
        const peerInfo = new PeerInfo(info)
        // { userId(str), username(str), isTeacher(bool) }
        const peerStatus = new PeerStatus(peerId, info)
        // { currPeerId(str), currCourse(obj), connected(bool), invited(bool), invitationId(str) }
        const state = getState()
        if (info.currCourseId !== undefined) { // is not a course-searching student (already in course)
          const { courseList } = state.courseMenu
          const courseData = courseList.find(c => c.courseId === info.currCourseId)
          if (courseData && !courseData.userIds.includes(peerInfo.userId)) {
            courseData.userIds.push(peerInfo.userId)
            dispatch(courseMenuAction.courseList.modify(courseData))
          }
        }
        dispatch(multiPeer.common.savePeerInfo(peerInfo))
        dispatch(multiPeer.common.updatePeerStatus(peerInfo.userId, peerStatus, 'found'))
      },
      onPeerLost: peerId => peerId,
      onPeerConnected: peerId => peerId,
      onPeerConnecting: peerId => peerId,
      onPeerDisconnected: peerId => peerId,
      onStreamOpened: () => null,
      onInviteReceived: invitation => async (dispatch, getState) => {
        // when students being invited by a teacher, add teacher to Peers
        const { currCourse } = getState()
        const peerInfo = new PeerInfo(invitation.sender.info)
        const peerStatus = new PeerStatus(
          invitation.sender.id,
          invitation.sender.info,
          false,
          invitation.sender.info.inviting,
          invitation.id,
        )
        if (
          peerStatus.currCourse.courseId !== undefined &&
          peerStatus.currCourse.courseId === currCourse.courseId // not course-searching
        ) {
          dispatch(multiPeer.backend.responseInvite({ invitationId: invitation.id }, true))
        }
        dispatch(multiPeer.common.savePeerInfo(peerInfo))
        dispatch(multiPeer.common.updatePeerStatus(peerInfo.userId, peerStatus))
      },
      onDataReceived: (senderPeerId, data) => ({ senderPeerId, data }),
      onPeerUpdate: (peerId, info) => async (dispatch, getState) => {
        const peerInfo = new PeerInfo(info)
        if (info.currCourseId !== undefined) {
          const { courseList } = getState().courseMenu
          const courseData = courseList.find(c => c.courseId === info.currCourseId)
          if (courseData) {
            courseData.userIds.push(peerInfo.userId)
            dispatch(courseMenuAction.courseList.modify(courseData))
          }
        }
        dispatch(multiPeer.common.savePeerInfo(peerInfo))
      },
    },
  },
})

export default multiPeer
