import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native'
import PropTypes from 'prop-types'
import styles from './styles/FileDownload.style'
import navAction from '../actions/nav.action'
import CloseImage from '../../asset/close.png'
import Appbar from '../components/Appbar.component'
import FileItem from '../components/FileItem.component'
import courseMenuAction from '../actions/courseMenu.action'

const mapDispatchToProps = dispatch => ({
  navAction: {
    openDrawer: () => { dispatch(navAction.openDrawer()) },
    onExit: () => { dispatch(navAction.courseHome()) },
  },
  classListAction: {
    modify: (courseData) => {
      dispatch(courseMenuAction.classList.modify(courseData))
    },
  },
})

class FileDownload extends Component {
  constructor() {
    super()
    this.FileOnPress = this.FileOnPress.bind(this)
  }

  FileOnPress = (pressedItem) => {
    const { currCourseData } = this.props.navigation.state.params
    const fileData = currCourseData.downloadData
    const itemIndex = fileData.findIndex(item => item === pressedItem)
    if (fileData[itemIndex].state === '未下載') {
      currCourseData.showActivityIndicator = true
      this.props.classListAction.modify(currCourseData)
      setTimeout(() => {
        fileData[itemIndex].state = '已下載'
        currCourseData.showActivityIndicator = false
        currCourseData.downloadData = fileData
        this.props.classListAction.modify(currCourseData)
      }, 3000)
    }
  }

  render() {
    const { currCourseData } = this.props.navigation.state.params
    return (
      <View style={styles.container}>
        <Appbar title='檔案下載' withDrawer
          rightIcon={CloseImage}
          onRightPress={this.props.navAction.onExit}/>
        { (currCourseData.downloadData === undefined) ? (
          <View style={styles.textContainer}>
            <Text style={styles.text}>
              目前已上傳檔案是空的QQ
            </Text>
          </View>
        ) : (
          <View style={styles.listContainer}>
            <FlatList
              style={styles.list}
              data={[...currCourseData.downloadData].reverse()}
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
            {currCourseData.showActivityIndicator === true && (
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
FileDownload.propTypes = {
  navAction: PropTypes.shape({
    openDrawer: PropTypes.func.isRequired,
    onExit: PropTypes.func.isRequired,
  }).isRequired,
  classListAction: PropTypes.object.isRequired,
  navigation: PropTypes.shape({
    state: PropTypes.shape({
      params: PropTypes.shape({
        currCourseData: PropTypes.object.isRequired,
      }),
    }),
  }),
}
//  connect react component & redux store
export default connect(undefined, mapDispatchToProps)(FileDownload)
