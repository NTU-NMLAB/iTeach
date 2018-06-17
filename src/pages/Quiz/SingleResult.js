import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text } from 'react-native'
import PropTypes from 'prop-types'
import CloseImage from '../../../asset/close.png'
import styles from '../styles/Question.styles'
import navAction from '../../actions/nav.action'
import Appbar from '../../components/Appbar'
import SingleAccordion from '../../components/SingleAccordion'
const mapStateToProps = state => ({
  status: state.account.status,
  ...state,
  courseName: state.course.courseName,
  classList: state.classMenu.classList,
  quizTime: state.course.quizTime,
})

const mapDispatchToProps = dispatch => ({
  navAction: {
    openDrawer: () => { dispatch(navAction.openDrawer()) },
    onExit: () => { dispatch(navAction.enterQuestion(4)) },
  },
})

class SingleResult extends Component {
  render() {
    const title = '統計結果'
		const courseData =
			this.props.classList.filter(item => item.title === this.props.courseName)[0]
		const quizData = courseData.quizHistory.filter(item => item.releaseTime === this.props.quizTime)[0]
    return (
      <View style={styles.container}>
        <Appbar title={title}
          rightIcon={CloseImage}
          onRightPress={this.props.navAction.onExit}/>
        <View style={styles.listContainer}>
					<View style={styles.questionTitle}>
          	<Text style={styles.text}>
            	 單選題題目內容:
          	</Text>
					</View>
					<View style={styles.questionContext}>
						<Text style={styles.text}>
							 {quizData.questionState}
						</Text>					
					</View>
       		{quizdata.map(item => (
					<SingleAccordion
						right = {item.rightAns1}
						wrong1 = {item.wrongAns1}
						wrong2 = {item.wrongAns2}
						wrong3 = {item.wrongAns3}/>
					))
					} 
				</View>
      </View>
    )
  }
}




SingleResult.propTypes = {
  navAction: PropTypes.shape({
    openDrawer: PropTypes.func.isRequired,
    onExit: PropTypes.func.isRequired,
  }).isRequired,
  status: PropTypes.string.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleResult)
