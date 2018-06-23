import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Text,
  View,
  TextInput,
} from 'react-native'
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker'
import PropTypes from 'prop-types'
import styles from './styles/UploadFile.style'
import navAction from '../actions/nav.action'
import CloseImage from '../../asset/close.png'
import Button from '../components/Button.component'
import Appbar from '../components/Appbar.component'


const mapStateToProps = state => ({
  ...state.fileDesc,
})

const mapDispatchToProps = dispatch => ({
  navAction: {
    openDrawer: () => { dispatch(navAction.openDrawer()) },
    onExit: () => { dispatch(navAction.course()) },
  },
})

class UploadFile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fileDesc: '這是這次上課會用到的檔案 =)',
      filepath: '',
    }
    this.onPressUpload = this.onPressUpload.bind(this)
    this.onPressChoose = this.onPressChoose.bind(this)
  }
  onPressChoose = () => {
    DocumentPicker.show({
      filetype: ['public.content'],
    }, (error, url) => {
      this.setState({ filepath: url })
    })
  }
  onPressUpload = () => {
    if (this.state.filepath === '') {
      alert('尚未選擇檔案，無法上傳')
    } else {
      alert('上傳成功')
      this.setState({ filepath: '' })
    }
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
}
//  connect react component & redux store
export default connect(mapStateToProps, mapDispatchToProps)(UploadFile)
