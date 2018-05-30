import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Text,
  View,
} from 'react-native'
import PropTypes from 'prop-types'
import styles from './styles/DownloadFile.styles'
import navAction from '../actions/nav.action'
import CloseImage from '../../asset/close.png'
import Appbar from '../components/Appbar'


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
  render() {
    return (
      <View style={styles.container}>
        <Appbar title='檔案下載' withDrawer
          rightIcon={CloseImage}
          onRightPress={this.props.navAction.onExit}/>
        <View style={styles.rowContainer}>
          <Text style={styles.text}>歡迎進入檔案下載</Text>
        </View>
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

