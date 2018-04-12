import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Image,
  Text,
  TouchableHighlight,
  View,
  FlatList,
} from 'react-native'
import PropTypes from 'prop-types'
import DrawerImage from '../../asset/drawer.png'
import SearchImage from '../../asset/search.png'
import AddImage from '../../asset/add.png'
import styles from './styles/ClassMenu.styles'
import navAction from '../actions/nav.action'
import courseAction from '../actions/course.action'
import classMenuAction from '../actions/classMenu.action'
import ClassItem from '../components/ClassItem'

const mapStateToProps = state => ({
  status: state.account.status,
  ...state.classMenu,
})

const mapDispatchToProps = dispatch => ({
  navAction: {
    openDrawer: () => { dispatch(navAction.openDrawer()) },
  },
  classListAction: {
    modify: (title, color) => {
      dispatch(classMenuAction.classList.modify(title, color))
    },
    delete: (title) => { dispatch(classMenuAction.classList.delete(title)) },
  },
  courseAction: {
    setName: (title) => { dispatch(courseAction.setName(title)) },
  },
})

class ClassMenu extends Component {
  constructor(props) {
    super(props)
    this.cancelAllDelete = this.cancelAllDelete.bind(this)
    this.deleteClass = this.deleteClass.bind(this)
    this.onPress = this.onPress.bind(this)
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

  deleteClass(title) {
    this.props.classListAction.delete(title)
    delete this.classRef[title]
  }

  onPress(title, color) {
    this.props.courseAction.setName(title)
    this.props.classListAction.modify(title, color)
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.titleBar}>
          <TouchableHighlight style={styles.drawerIconContainer} onPress={this.props.navAction.openDrawer} underlayColor='#3A8FB7'>
            <Image style={styles.drawerIcon} source={DrawerImage} />
          </TouchableHighlight>
          <Text style={styles.title}>
            課程選單
          </Text>
          <TouchableHighlight style={styles.addSearchIconContainer} onPress={null} underlayColor='#3A8FB7'>
            <Image style={styles.addSearchIcon} source={this.props.status === 'teacher' ? AddImage : SearchImage} />
          </TouchableHighlight>
        </View>
        <View style={styles.listContainer}>
          <View style={[styles.welcomeMsgContainer, { display: this.props.classList.length === 0 ? 'flex' : 'none' }]}>
            <Text style={styles.welcomeMsg}>{`
              (歡迎訊息)
              歡迎使用 iTeach
              請利用右上方按鈕`}{this.props.status === 'teacher' ? '新增' : '搜尋'}課程
            </Text>
          </View>
          <FlatList
            style={[styles.list, { display: this.props.classList.length !== 0 ? 'flex' : 'none' }]}
            onScrollBeginDrag={this.cancelAllDelete}
            data={this.props.classList}
            keyExtractor={item => item.title}
            renderItem={({ item }) => (
              <ClassItem
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
  }).isRequired,
  classListAction: PropTypes.shape({
    modify: PropTypes.func.isRequired,
    delete: PropTypes.func.isRequired,
  }).isRequired,
  courseAction: PropTypes.shape({
    setName: PropTypes.func.isRequired,
  }).isRequired,
  status: PropTypes.string.isRequired,
  classList: PropTypes.array.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(ClassMenu)
