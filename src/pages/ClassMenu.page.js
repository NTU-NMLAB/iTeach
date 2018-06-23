import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Text,
  View,
  FlatList,
} from 'react-native'
import PropTypes from 'prop-types'
import SearchImage from '../../asset/search.png'
import AddImage from '../../asset/add.png'
import styles from './styles/ClassMenu.style'
import navAction from '../actions/nav.action'
import courseAction from '../actions/course.action'
import classMenuAction from '../actions/classMenu.action'
import ClassItem from '../components/ClassItem.component'
import Appbar from '../components/Appbar.component'
import multiPeerAction from '../actions/multiPeer.action'

const mapStateToProps = state => ({
  profile: state.profile,
  classList: state.classMenu.classList,
})

const mapDispatchToProps = dispatch => ({
  navAction: {
    openDrawer: () => { dispatch(navAction.openDrawer()) },
    courseSearch: () => {
      dispatch(navAction.courseSearch())
      dispatch(multiPeerAction.student.startSearch())
    },
    addCourse: () => { dispatch(navAction.addCourse()) },
    courseHome: () => { dispatch(navAction.courseHome()) },
  },
  classListAction: {
    get: () => {
      dispatch(classMenuAction.classList.get())
    },
    modify: (classItem, title) => {
      dispatch(classMenuAction.classList.modify(classItem, title))
    },
    delete: (title) => {
      dispatch(classMenuAction.classList.delete(title))
    },
  },
  courseAction: {
    setName: (title) => { dispatch(courseAction.setName(title)) },
    openCourse: (isTeacher) => { dispatch(multiPeerAction[isTeacher ? 'teacher' : 'student'].openCourse()) },
  },
})

class ClassMenu extends Component {
  constructor(props) {
    super(props)
    this.cancelAllDelete = this.cancelAllDelete.bind(this)
    this.deleteClass = this.deleteClass.bind(this)
    this.onPress = this.onPress.bind(this)
    this.onPressCourseSearch = this.onPressCourseSearch.bind(this)
    this.onPressAddPage = this.onPressAddPage.bind(this)
  }

  cancelAllDelete(without) {
    Object.values(this.classRef).forEach((ref, index) => {
      // Scroll back the reference of ScrollView inside ClassItem
      if (!ref) {
        delete this.classRef[index]
        return
      }
      if (ref.ref !== without) {
        ref.ref.scrollTo({ x: 0 })
      }
    })
  }
  componentWillMount() {
    this.props.classListAction.get()
  }

  deleteClass(title) {
    this.props.classListAction.delete(title)
    delete this.classRef[title]
  }

  onPress(classItem) {
    this.props.courseAction.setName(classItem.title)
    this.props.courseAction.openCourse(this.props.profile.isTeacher)
    this.props.classListAction.modify(classItem, classItem.title)
    this.props.navAction.courseHome()
  }

  onPressAddPage = () => {
    this.props.navAction.addCourse()
  }

  onPressCourseSearch = () => {
    this.props.navAction.courseSearch()
  }


  render() {
    return (
      <View style={styles.container}>
        <Appbar title='課程選單' withDrawer
          rightIcon={this.props.profile.isTeacher === true ? AddImage : SearchImage}
          onRightPress={this.props.profile.isTeacher === true ? this.onPressAddPage : this.onPressCourseSearch}/>
        <View style={styles.listContainer}>
          <View style={[styles.welcomeMsgContainer, { display: this.props.classList.length === 0 ? 'flex' : 'none' }]}>
            <Text style={styles.welcomeMsg}>{`
              (歡迎訊息)
              歡迎使用 iTeach
              請利用右上方按鈕`}{this.props.profile.isTeacher === true ? '新增' : '搜尋'}課程
            </Text>
          </View>
          <FlatList
            style={[styles.list, { display: this.props.classList.length !== 0 ? 'flex' : 'none' }]}
            onScrollBeginDrag={this.cancelAllDelete}
            data={this.props.classList}
            keyExtractor={item => item.title}
            renderItem={({ item }) => (
              <ClassItem
                item={item}
                title={item.title}
                color={item.color}
                deleteClass={this.deleteClass}
                cancelAllDelete={this.cancelAllDelete}
                onPress={this.onPress}
                ref={(ref) => {
                  this.classRef = { ...this.classRef, [item.title]: ref }
                }}/>
            )} />
        </View>
      </View>
    )
  }
}

ClassMenu.propTypes = {
  navAction: PropTypes.shape({
    openDrawer: PropTypes.func.isRequired,
    courseSearch: PropTypes.func.isRequired,
    addCourse: PropTypes.func.isRequired,
    courseHome: PropTypes.func.isRequired,
  }).isRequired,
  classListAction: PropTypes.shape({
    get: PropTypes.func.isRequired,
    modify: PropTypes.func.isRequired,
    delete: PropTypes.func.isRequired,
  }).isRequired,
  courseAction: PropTypes.shape({
    setName: PropTypes.func.isRequired,
    openCourse: PropTypes.func.isRequired,
  }).isRequired,
  profile: PropTypes.object.isRequired,
  classList: PropTypes.array.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(ClassMenu)
