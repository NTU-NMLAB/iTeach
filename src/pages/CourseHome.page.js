import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  View,
  Text,
  Modal,
} from 'react-native'
import PropTypes from 'prop-types'
import CloseImage from '../../asset/close.png'
import styles from './styles/Course.style'
import courseHomeAction from '../actions/courseHome.action'
import CourseItem from '../components/CourseItem.component'
import CourseItemData from '../components/CourseItemData.component'
import Appbar from '../components/Appbar.component'
import Button from '../components/Button.component'

const mapStateToProps = state => ({
  isTeacher: state.profile.isTeacher,
  items: state.courseHome.items,
  drawLots: state.drawLots,
})

const mapDispatchToProps = dispatch => ({
  exit: () => { dispatch(courseHomeAction.exit()) },
  clickItem: (id) => { dispatch(courseHomeAction.clickItem(id)) },
  handleNoStudent: () => { dispatch(courseHomeAction.handleNoStudent()) }
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
  alertForStudent(signalIn) {
    if (!signalIn) return null
    return (
      <View style={styles.insideAlert}>
        <Text style={styles.alertTitle}>警告</Text>
        <Text style={styles.alertText}>在線名單沒有任何同學</Text>
        <View style={styles.alertButton}>
          <Button label="OK" onPress={this.props.handleNoStudent}/>
        </View>
      </View>
    )
  }
  render() {
    const { items, drawLots, navigation } = this.props
    const { currCourseData } = navigation.state.params
    return (
      <View style={styles.container}>
        <Appbar title={currCourseData.title} withDrawer
          rightIcon={CloseImage}
          onRightPress={ this.props.exit }/>
        <View style={styles.itemContainer}>
          {this.props.isTeacher === true ?
            CourseItemData.filter(item => item.user.includes('teacher'))
              .map(item => (
                <CourseItem
                  key={item.id} id={item.id}
                  title={items[item.id].onclick
                    ? items[item.id].title[1]
                    : items[item.id].title[0]}
                  imgSrc={items[item.id].onclick
                    ? items[item.id].imgSrc[1]
                    : items[item.id].imgSrc[0]}
                  onPress={this.props.clickItem}/>
              )) :
            CourseItemData.filter(item => item.user.includes('student'))
              .map(item => (
                <CourseItem
                  key={item.id} id={item.id}
                  title={items[item.id].onclick
                    ? items[item.id].title[1]
                    : items[item.id].title[0]}
                  imgSrc={items[item.id].onclick
                    ? items[item.id].imgSrc[1]
                    : items[item.id].imgSrc[0]}
                  onPress={this.props.clickItem}/>
              ))
          }
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={drawLots.noStudent}>
          <View style={styles.outsideAlert}>
            {this.alertForStudent(drawLots.noStudent)}
          </View>
        </Modal>
      </View>
    )
  }
}

CourseHome.propTypes = {
  isTeacher: PropTypes.bool.isRequired,
  items: PropTypes.arrayOf(PropTypes.object),
  drawLots: PropTypes.shape({
    noStudent: PropTypes.bool.isRequired,
  }).isRequired,
  exit: PropTypes.func,
  clickItem: PropTypes.func,
  handleNoStudent: PropTypes.func,
  navigation: PropTypes.shape({
    state: PropTypes.shape({
      params: PropTypes.shape({
        currCourseData: PropTypes.object.isRequired,
      }),
    }),
  }),
}

export default connect(mapStateToProps, mapDispatchToProps)(CourseHome)
