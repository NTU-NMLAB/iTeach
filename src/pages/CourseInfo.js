import React, { Component } from 'react'
import {
  View,
  Text,
  Linking,
} from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Button from '../components/Button'
import styles from './styles/CourseInfo.styles'
import Appbar from '../components/Appbar'
import navAction from '../actions/nav.action'
import closeImage from '../../asset/close.png'

const mapStateToProps = state => ({
  status: state.account.status,
  classList: state.classMenu.classList,
  courseName: state.course.courseName,
})

const mapDispatchToProps = dispatch => ({
  navAction: {
    onExit: () => dispatch(navAction.course()),
    changeCourseInfo: () => { dispatch(navAction.changeCourseInfo()) },
  },
})

class CourseInfo extends Component {
  constructor(props) {
    super(props)
    this.onPressModify = this.onPressModify.bind(this)
  }

  onPressModify = () => {
    this.props.navAction.changeCourseInfo()
  }

  render() {
    const { classList, courseName, status } = this.props
    const courseInfo = classList.find(item => item.title === courseName)
    const {
      color,
      teacher,
      semester,
      classroom,
      time,
      website,
    } = courseInfo

    return (
      <View style={styles.container}>
        <Appbar title='課程資訊' withDrawer
          rightIcon={closeImage}
          onRightPress={this.props.navAction.onExit}/>
        <View style={styles.contentContainer}>
          <View style={styles.titleContainer}>
            <View style={[styles.colorBox, { backgroundColor: color }]} />
            <Text style={styles.courseName} numberOfLines={1}>
              {courseName}
            </Text>
          </View>
          <View style={styles.infoContainer}>
            {
              status === 'student' &&
              <View style={styles.infoRowContainer}>
                <Text style={styles.text}>
                  授課老師 ：{teacher}
                </Text>
              </View>
            }
            <View style={styles.infoRowContainer}>
              <Text style={styles.text}>
                開課學期 ：{semester}
              </Text>
            </View>
            <View style={styles.infoRowContainer}>
              <Text style={styles.text}>
                上課教室 ：{classroom}
              </Text>
            </View>
            <View style={styles.infoRowContainer}>
              <Text style={styles.text}>
                上課時間 ：{time}
              </Text>
            </View>
            <View style={styles.infoRowContainer}>
              <Text style={styles.text}>
                課程網站 ：
                <Text
                  onPress={() => Linking.openURL(website)}
                  style={styles.url}>
                  {website}
                </Text>
              </Text>
            </View>
          </View>
          {
            status === 'teacher' &&
            <View style={styles.infoRowContainer}>
              <Button label='修改' onPress={this.onPressModify} />
            </View>
          }
        </View>
      </View>
    )
  }
}

CourseInfo.propTypes = {
  navAction: PropTypes.shape({
    onExit: PropTypes.func.isRequired,
    changeCourseInfo: PropTypes.func.isRequired,
  }),
  status: PropTypes.string.isRequired,
  classList: PropTypes.array.isRequired,
  courseName: PropTypes.string.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(CourseInfo)
