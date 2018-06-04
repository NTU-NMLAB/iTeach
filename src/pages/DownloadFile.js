import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native'
import PropTypes from 'prop-types'
import styles from './styles/DownloadFile.styles'
import navAction from '../actions/nav.action'
import CloseImage from '../../asset/close.png'
import Appbar from '../components/Appbar'
import FileItem from '../components/FileItem'
import mockDownloadData from '../../asset/mockDownloadData.json'


const mapStateToProps = state => ({
  ...state.fileDesc,
})

const mapDispatchToProps = dispatch => ({
  navAction: {
    openDrawer: () => { dispatch(navAction.openDrawer()) },
    onExit: () => { dispatch(navAction.course()) },
  },
})

class DownloadFile extends Component {
  constructor() {
    super()
    this.state = {
      showActivityIndicator: false,
      downloadData: mockDownloadData.Files,
    }
    this.FileOnPress = this.FileOnPress.bind(this)
  }

  FileOnPress = (pressedItem) => {
    const FileData = this.state.downloadData
    const itemIndex = FileData.findIndex(item => item === pressedItem)
    if (FileData[itemIndex].State === '未下載') {
      this.setState({ showActivityIndicator: !this.state.showActivityIndicator })
      setTimeout(() => this.setState({ showActivityIndicator: false }), 3000)
      setTimeout(() => {
        FileData[itemIndex].State = '已下載'
        this.setState({ downloadData: FileData })
      }, 3000)
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Appbar title='檔案下載' withDrawer
          rightIcon={CloseImage}
          onRightPress={this.props.navAction.onExit}/>
        { (this.state.downloadData === undefined) ? (
          <View style={styles.textContainer}>
            <Text style={styles.text}>
              目前已上傳檔案是空的QQ
            </Text>
          </View>
        ) : (
          <View style={styles.listContainer}>
            <FlatList
              style={styles.list}
              data={[...this.state.downloadData].reverse()}
              keyExtractor={ (item, index) => index.toString()}
              renderItem={({ item }) => (
                <FileItem
                  FileName={item.FileName}
                  FileDescription={item.FileDescription}
                  State={item.State}
                  UploadTime={item.UploadTime}
                  onPress={() => { this.FileOnPress(item) }}
                />
              )}
            />
            {this.state.showActivityIndicator === true && (
              <View style={styles.OverlayContainer}>
                <View style={styles.activityIndicatorContainer}>
                  <ActivityIndicator style={styles.activityIndicator} size="large" color="#3A8FB7" />
                </View>
                <Text style={styles.activityIndicatorText}>
                  下載檔案中...{'\n'}請稍候
                </Text>
              </View>
            )}
          </View>
        )}
      </View>
    )
  }
}

// .propTypes  ~= constructor
// course : proptypes.string,isRequired --> course 「必須」是string
DownloadFile.propTypes = {
  navAction: PropTypes.shape({
    openDrawer: PropTypes.func.isRequired,
    onExit: PropTypes.func.isRequired,
  }).isRequired,
}
//  connect react component & redux store
export default connect(mapStateToProps, mapDispatchToProps)(DownloadFile)
