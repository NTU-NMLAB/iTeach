import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  View,
  Text,
  Modal,
} from 'react-native'
import CourseItem from '../components/CourseItem.component'
import Appbar from '../components/Appbar.component'
import Button from '../components/Button.component'
import styles from './styles/Course.style'
import CloseImage from '../../asset/close.png'
import courseHomeAction from '../actions/courseHome.action'


const mapStateToProps = state => ({
  isTeacher: state.profile.isTeacher,
  alertInfo: state.courseHome.alertInfo,
  items: state.courseHome.items,
})

const mapDispatchToProps = dispatch => ({
  exit: () => { dispatch(courseHomeAction.exit()) },
  clickItem: (id) => { dispatch(courseHomeAction.clickItem(id)) },
})

class CourseHome extends Component {
  // componentWillMount() {
  //   const { currCourseData } = this.props.navigation.state.params
  //   if (this.props.isTeacher === false && currCourseData.downloadData === undefined) {
  //     currCourseData.downloadData = JSON.parse(JSON.stringify(mockDownloadData.Files))
  //     currCourseData.showActivityIndicator = false
  //     this.props.courseMenuAction.modify(currCourseData)
  //   }
  // }
  render() {
    const { items, alertInfo, navigation } = this.props
    const { currCourseData } = navigation.state.params
    return (
      <View style={styles.container}>
        <Appbar title={currCourseData.title} withDrawer
          rightIcon={CloseImage}
          onRightPress={ this.props.exit }/>
        <View style={styles.itemContainer}>
          {
            items.filter(item => item.user.includes(this.props.isTeacher ? 'teacher' : 'student'))
              .map(item => (
                <CourseItem
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  imgSrc={item.imgSrc}
                  onPress={this.props.clickItem}/>
              ))
          }
        </View>
        {
          alertInfo === null ?
            null :
            <Modal
              animationType="slide"
              transparent={true}>
              <View style={styles.outsideAlert}>
                <View style={styles.insideAlert}>
                  <Text style={styles.alertTitle}>{alertInfo.title}</Text>
                  <Text style={styles.alertText}>{alertInfo.message}</Text>
                  <View style={styles.alertButton}>
                    <Button label={alertInfo.okLabel} onPress={alertInfo.okCallback}/>
                  </View>
                </View>
              </View>
            </Modal>
        }
      </View>
    )
  }
}

CourseHome.defaultProps = { alertInfo: { okLabel: 'OK' } }

CourseHome.propTypes = {
  isTeacher: PropTypes.bool.isRequired,
  alertInfo: PropTypes.shape({
    title: PropTypes.string,
    message: PropTypes.string,
    okLabel: PropTypes.string,
    okCallback: PropTypes.func,
  }),
  items: PropTypes.arrayOf(PropTypes.object),
  exit: PropTypes.func,
  clickItem: PropTypes.func,
  navigation: PropTypes.shape({
    state: PropTypes.shape({
      params: PropTypes.shape({
        currCourseData: PropTypes.object.isRequired,
      }),
    }),
  }),
}

export default connect(mapStateToProps, mapDispatchToProps)(CourseHome)
