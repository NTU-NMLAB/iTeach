import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, FlatList, Text } from 'react-native'
import PropTypes from 'prop-types'
import CloseImage from '../../../asset/close.png'
import courseAction from '../../actions/course.action'
import styles from '../styles/HistoryRecord.styles'
import navAction from '../../actions/nav.action'
import Appbar from '../../components/Appbar'
import HistoryItem from '../../components/HistoryItem'
// import mockQuizHistory from '../../../asset/mockQuizHistory.json'

const mapStateToProps = state => ({
  status: state.account.status,
  courseName: state.course.courseName,
  course: state.course,
  classMenu: state.classMenu,
  classList: state.classMenu.classList,
})

const mapDispatchToProps = dispatch => ({
  navAction: {
    openDrawer: () => { dispatch(navAction.openDrawer()) },
    onExit: () => { dispatch(navAction.quizMainPage()) },
    enterResult: (id) => { dispatch(navAction.enterResult(id)) },
  },
  courseAction: {
    setQuizTime: (time) => {dispatch(courseAction.setQuizTime(time))},
  },
})

class HistoryRecord extends Component {
  HistoryOnPress(time,type){ 

    this.props.courseAction.setQuizTime(time)
    	
	switch(type){
		case '單選題':
			this.props.navAction.enterResult(0);
			break;
   	case '多選題':   
			this.props.navAction.enterResult(1);
			break;
    case '是非題':
			this.props.navAction.enterResult(2);
			break;
	}
  } 
  render() {
    const questionType = '歷史紀錄'
    const courseData =
      this.props.classList.filter(item => item.title === this.props.courseName)[0]
    window.alert(courseData.quizHistory[0].questionState)
    return (
      <View style={styles.container}>
        <Appbar title={questionType}
          rightIcon={CloseImage}
          onRightPress={this.props.navAction.onExit}/>
        { (courseData.quizHistory === undefined) ? (
          <View style={styles.textContainer}>
            <Text style={styles.text}>
              目前歷史紀錄是空的QQ
            </Text>
          </View>
        ) : (
          <View style={styles.listContainer}>
            <FlatList
              style={styles.list}
              data={[...courseData.quizHistory].reverse()}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <HistoryItem
                  type={item.questionType}
                  description={item.questionState}
                  time={item.releaseTime}
                  correctRate={item.correctRate.toString()}
                  onPress={this.HistoryOnPress.bind(this)}
                />

              )}

            />      
          </View>
        )}
      </View>
    )
  }
}

HistoryRecord.propTypes = {
  navAction: PropTypes.shape({
    openDrawer: PropTypes.func.isRequired,
    onExit: PropTypes.func.isRequired,
    enterResult: PropTypes.func.isRequired,
  }).isRequired,
  courseAction: PropTypes.shape({
    setQuizTime: PropTypes.func.isRequired,
  }).isRequired,
  classMenu: PropTypes.object.isRequired,
  courseName: PropTypes.string.isRequired,
  classList: PropTypes.array.isRequired,
  course: PropTypes.object.isRequired,
  status: PropTypes.string.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(HistoryRecord)
