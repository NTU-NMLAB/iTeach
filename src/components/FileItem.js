import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableHighlight,
} from 'react-native'
import PropTypes from 'prop-types'
import styles from './styles/FileItem.styles'

class FileItem extends Component {
  render() {
    const {
      FileName,
      FileDescription,
      State,
      UploadTime,
      onPress,
    } = this.props
    return (
      <TouchableHighlight onPress= {() => onPress()} underlayColor='white'>
        <View style={ State === '未下載' ? styles.unDownloadedFileItemContainer
          : styles.DownloadedFileItemContainer}>
          <View style={styles.fileNameContainer}>
            <Text style={styles.fileName}>
              {FileName}
            </Text>
          </View>
          <View style={styles.stateContainer}>
            <Text style={State === '未下載' ? styles.unDownloaded : styles.Downloaded}>
              {State}
            </Text>
          </View>
          <View style={styles.descriptionContainer}>
            <Text style={styles.fileDescription}>
              { FileDescription.length > 20 ? `${FileDescription.substring(0, 19)}...` : FileDescription }
            </Text>
          </View>
          <View style={styles.timeContainer}>
            <Text style={styles.uploadTime}>
              {UploadTime}
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    )
  }
}

FileItem.propTypes = {
  FileName: PropTypes.string.isRequired,
  FileDescription: PropTypes.string.isRequired,
  State: PropTypes.string.isRequired,
  UploadTime: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
}

export default FileItem
