import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import CloseImage from '../../../asset/close.png'
import styles from '../styles/Quiz.styles'
import navAction from '../../actions/nav.action'
import quizItemAction from '../../actions/quizItem.action'
import QuizItem from '../../components/QuizItem'
import QuizItemData from '../../components/QuizItemData'
import Appbar from '../../components/Appbar'

const mapStateToProps = state => ({
  status: state.account.status,
  ...state,
})

const mapDispatchToProps = dispatch => ({
  navAction: {
    openDrawer: () => { dispatch(navAction.openDrawer()) },
    onExit: () => { dispatch(navAction.course()) },
    enterQuestion: (id) => { dispatch(navAction.enterQuestion(id)) },
  },
  quizItemAction: {
    setName: (id) => {
      dispatch(quizItemAction.setName(id))
    },
  },
})


class Quiz extends Component {
  iconOnPress(id) {
    this.props.quizItemAction.setName(id)
    this.props.navAction.enterQuestion(id)
  }
  render() {
    return (
      <View style={styles.container}>
        <Appbar title={'隨堂測驗'}
          rightIcon={CloseImage}
          onRightPress={this.props.navAction.onExit}/>
        <View style={styles.itemContainer}>
          {QuizItemData.filter(item => item.user.includes(this.props.status))
            .map(item => (
              <QuizItem
                key={item.id} id={item.id}
                title={item.title[0]}
                imgSrc={item.imgSrc[0]}
                onPress={this.iconOnPress.bind(this)}/>
            ))
          }
        </View>
      </View>
    )
  }
}

Quiz.propTypes = {
  navAction: PropTypes.shape({
    openDrawer: PropTypes.func.isRequired,
    onExit: PropTypes.func.isRequired,
    enterQuestion: PropTypes.func.isRequired,
  }).isRequired,
  quizItemAction: PropTypes.shape({
    setName: PropTypes.func.isRequired,
  }).isRequired,
  course: PropTypes.object.isRequired,
  quizItem: PropTypes.object,
  status: PropTypes.string.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz)
