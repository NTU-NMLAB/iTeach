import MultipeerConnection from '../submodule/react-native-multipeer/classes/MultipeerConnection'
import multiPeerActions from '../actions/multiPeer.action'
import { store } from '../../App'

const multiPeerInit = () => {
  const selfName = `User-${Math.round(1e6 * Math.random())}`

  MultipeerConnection.registerListeners([
    {
      eventName: 'RCTMultipeerConnectivityPeerFound',
      handler: (event) => {
        store.dispatch(multiPeerActions.backend.onPeerFound(
          event.peer.id,
          event.peer.info,
        ))
      },
    },
    {
      eventName: 'RCTMultipeerConnectivityPeerLost',
      handler: (event) => {
        store.dispatch(multiPeerActions.backend.onPeerLost(event.peer.id))
      },
    },
    {
      eventName: 'RCTMultipeerConnectivityPeerConnected',
      handler: (event) => {
        store.dispatch(multiPeerActions.backend.onPeerConnected(event.peer.id))
        store.dispatch(multiPeerActions.backend.requestInfo(event.peer.id))
      },
    },
    {
      eventName: 'RCTMultipeerConnectivityPeerConnecting',
      handler: (event) => {
        store.dispatch(multiPeerActions.backend.onPeerConnecting(event.peer.id))
      },
    },
    {
      eventName: 'RCTMultipeerConnectivityPeerDisconnected',
      handler: (event) => {
        store.dispatch(multiPeerActions.backend.onPeerDisconnected(event.peer.id))
      },
    },
    {
      eventName: 'RCTMultipeerConnectivityStreamOpened',
      handler: (event) => {
        store.dispatch(multiPeerActions.backend.onStreamOpened(event))
      },
    },
    {
      eventName: 'RCTMultipeerConnectivityInviteReceived',
      handler: (event) => {
        const invitation = {
          id: event.invite.id,
          sender: {
            id: event.peer.id,
            info: event.peer.info,
          },
        }
        store.dispatch(multiPeerActions.backend.onInviteReceived(invitation))
      },
    },
    {
      eventName: 'RCTMultipeerConnectivityDataReceived',
      handler: (event) => {
        store.dispatch(multiPeerActions.backend.onDataReceived(
          event.sender.id,
          event.data,
        ))
      },
    },
  ])

  // Workaround: wait for multiPeerActions to be loaded
  setTimeout(() => {
    store.dispatch(multiPeerActions.backend.init(selfName))
  })
}

multiPeerInit()
export default new MultipeerConnection()
