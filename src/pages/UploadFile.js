import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Text,
  View,
  TextInput,
} from 'react-native'
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker'
import PropTypes from 'prop-types'
import styles from './styles/UploadFile.styles'
import navAction from '../actions/nav.action'
import CloseImage from '../../asset/close.png'
import Button from '../components/Button'
import Appbar from '../components/Appbar'
import multiPeerAction from '../actions/multiPeer.action'
import getTime from '../util/getTime'
import getHash from '../util/getHash'


const mapStateToProps = state => ({
  status: state.account.status,
  courseName: state.course.courseName,
  classMenu: state.classMenu,
  course: state.course,
  classList: state.classMenu.classList,
  multiPeer: state.multiPeer,
})

const mapDispatchToProps = dispatch => ({
  navAction: {
    openDrawer: () => { dispatch(navAction.openDrawer()) },
    onExit: () => { dispatch(navAction.course()) },
  },
  multiPeerAction: {
    sendData: (recipients, data) => {
      dispatch(multiPeerAction.backend.sendData(recipients, data, () => {}))
    },
  },
})

class UploadFile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fileName: 'Test.jpg',
      fileDesc: '這是這次上課會用到的檔案 =)',
      filePath: '',
    }
    this.onPressUpload = this.onPressUpload.bind(this)
    this.onPressChoose = this.onPressChoose.bind(this)
  }
  onPressChoose = () => {
    /* DocumentPicker.show({
      filetype: ['public.content'],
    }, (error, url) => {
      this.setState({ filepath: url })
    }) */
  }
  onPressUpload = () => {
    /* if (this.state.filepath === '') {
      alert('尚未選擇檔案，無法上傳')
    } else {
      alert('上傳成功')
      this.setState({ filepath: '' })
    } */
    const {
      courseName,
      multiPeer,
    } = this.props
    const timestampRightNow = getTime()
    const hashID = getHash({
      courseName,
      timestampRightNow,
    }).toString()

    let keysInThisCourse = []
    if (typeof multiPeer.courses[courseName] !== 'undefined') {
      keysInThisCourse = Object.keys(multiPeer.courses[courseName])
    }
    const keysOnline = keysInThisCourse.filter(it =>
      multiPeer.peers[it].online && multiPeer.peers[it].info.course === courseName)
    const data = {
      messageType: 'FILE_UPLOAD',
      courseName,
      fileID: hashID,
      fileName: this.state.fileName,
      fileDesc: this.state.fileDesc,
      uploadTime: timestampRightNow,
    }
    this.props.multiPeerAction.sendData(keysOnline, data)
  }

  render() {
    return (
      <View style={styles.container}>
        <Appbar title='檔案上傳' withDrawer
          rightIcon={CloseImage}
          onRightPress={this.props.navAction.onExit}/>
        <View style={styles.rowContainer}>
          <Text style={styles.text}>檔案描述</Text>
          <TextInput
            style={styles.input}
            onChangeText={(fileDesc) => { this.setState({ fileDesc }) }}
            value={this.state.fileDesc}
            multiline={true}
            numberOfLines={3}
          />
          <View style={styles.empty}/>
          <View style={styles.buttonContainer}>
            <Button label='選擇檔案' onPress={this.onPressChoose}/>
            <Button label='上傳' onPress={this.onPressUpload}/>
          </View>
        </View>
      </View>
    )
  }
}

// .propTypes  ~= constructor
// course : proptypes.string,isRequired --> course 「必須」是string
UploadFile.propTypes = {
  navAction: PropTypes.shape({
    openDrawer: PropTypes.func.isRequired,
    onExit: PropTypes.func.isRequired,
  }).isRequired,
  multiPeerAction: PropTypes.shape({
    sendData: PropTypes.func.isRequired,
  }).isRequired,
  classMenu: PropTypes.object.isRequired,
  courseName: PropTypes.string.isRequired,
  classList: PropTypes.array.isRequired,
  course: PropTypes.object.isRequired,
  status: PropTypes.string.isRequired,
  multiPeer: PropTypes.shape({
    courses: PropTypes.object.isRequired,
    peers: PropTypes.object.isRequired,
  }).isRequired,
}
//  connect react component & redux store
export default connect(mapStateToProps, mapDispatchToProps)(UploadFile)
