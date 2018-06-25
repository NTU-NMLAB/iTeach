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
import classMenuAction from '../actions/classMenu.action'


const mapStateToProps = state => ({
  courseName: state.course.courseName,
  classMenu: state.classMenu,
})

const mapDispatchToProps = dispatch => ({
  navAction: {
    openDrawer: () => { dispatch(navAction.openDrawer()) },
    onExit: () => { dispatch(navAction.course()) },
  },
  classListAction: {
    modify: (classItem) => {
      dispatch(classMenuAction.classList.modify(classItem, classItem.title))
    },
  },
})

class DownloadFile extends Component {
  constructor() {
    super()
    this.FileOnPress = this.FileOnPress.bind(this)
  }

  FileOnPress = (pressedItem) => {
    const courseData =
      this.props.classMenu.classList.filter(item => item.title === this.props.courseName)[0]
    const FileData = courseData.downloadData
    const itemIndex = FileData.findIndex(item => item === pressedItem)
    if (FileData[itemIndex].State === '未下載') {
      courseData.showActivityIndicator = true
      this.props.classListAction.modify(courseData)
      setTimeout(() => {
        FileData[itemIndex].State = '已下載'
        courseData.showActivityIndicator = false
        courseData.downloadData = FileData
        this.props.classListAction.modify(courseData)
      }, 3000)
    }
  }

  render() {
    const courseData =
      this.props.classMenu.classList.filter(item => item.title === this.props.courseName)[0]
    return (
      <View style={styles.container}>
        <Appbar title='檔案下載' withDrawer
          rightIcon={CloseImage}
          onRightPress={this.props.navAction.onExit}/>
        { (courseData.downloadData.length === 0) ? (
          <View style={styles.textContainer}>
            <Text style={styles.text}>
              目前已上傳檔案是空的QQ
            </Text>
          </View>
        ) : (
          <View style={styles.listContainer}>
            <FlatList
              style={styles.list}
              data={[...courseData.downloadData].reverse()}
              keyExtractor={ (item, index) => index.toString()}
              renderItem={({ item }) => (
                <FileItem
                  FileName={item.fileName}
                  FileDescription={item.fileDesc}
                  State={item.State}
                  UploadTime={item.uploadTime}
                  onPress={() => { this.FileOnPress(item) }}
                />
              )}
            />
            {courseData.showActivityIndicator === true && (
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
  classMenu: PropTypes.object.isRequired,
  courseName: PropTypes.string.isRequired,
  classListAction: PropTypes.object.isRequired,
}
//  connect react component & redux store
export default connect(mapStateToProps, mapDispatchToProps)(DownloadFile)
