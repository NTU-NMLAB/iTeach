import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import CloseImage from '../../asset/close.png'
import styles from './styles/Course.styles'
import navAction from '../actions/nav.action'
import QuizItem from '../components/QuizItem'
import QuizItemData from '../components/QuizItemData'
import Appbar from '../components/Appbar'

const mapStateToProps = state => ({
  status: state.account.status,
  ...state,
})

const mapDispatchToProps = dispatch => ({
  navAction: {
    openDrawer: () => { dispatch(navAction.openDrawer()) },
    onExit: () => { dispatch(navAction.classMenu()) },
  },
})


class Quiz extends Component {
  render() {
    const { quizItem } = this.props
    return (
      <View style={styles.container}>
        <Appbar title={this.props.course.courseName}
          rightIcon={CloseImage}
          onRightPress={this.props.navAction.onExit}/>
        <View style={styles.itemContainer}>
          {QuizItemData.filter(item => item.user.includes(this.props.status))
            .map(item => (
              <QuizItem
                key={item.id} id={item.id}
                title={item.title[0]}
                imgSrc={item.imgSrc[0]}
                onPress={this.props.navAction.onExit}/>
              ))
            }
        </View>
      </View>
    );
  }
}

Quiz.propTypes = {
  navAction: PropTypes.shape({
    openDrawer: PropTypes.func.isRequired,
    onExit: PropTypes.func.isRequired,
  }).isRequired,
  course: PropTypes.object.isRequired,
  quizItem: PropTypes.object,
  status: PropTypes.string.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz)
