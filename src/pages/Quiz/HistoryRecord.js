import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, FlatList } from 'react-native'
import PropTypes from 'prop-types'
import CloseImage from '../../../asset/close.png'
import styles from '../styles/HistoryRecord.styles'
import navAction from '../../actions/nav.action'
import Appbar from '../../components/Appbar'
import HistoryItem from '../../components/HistoryItem'
import mockQuizHistory from '../../../asset/mockQuizHistory.json'

const mapStateToProps = state => ({
  status: state.account.status,
  ...state,
})

const mapDispatchToProps = dispatch => ({
  navAction: {
    openDrawer: () => { dispatch(navAction.openDrawer()) },
    onExit: () => { dispatch(navAction.quizMainPage()) },
    getResult: () => { dispatch(navAction.quizResultPage()) },
  },
})

class HistoryRecord extends Component {
  HistoryOnPress() {
    this.props.navAction.getResult()
  }
  render() {
    const questionType = '歷史紀錄'
    return (
      <View style={styles.container}>
        <Appbar title={questionType}
          rightIcon={CloseImage}
          onRightPress={this.props.navAction.onExit}/>
        <View style={styles.listContainer}>
          <FlatList
            style={styles.list}
            data={[...mockQuizHistory.Questions].reverse()}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <HistoryItem
                type={item.type}
                description={item.description}
                time={item.time}
                correctRate={item.correctRate}
                onPress={this.HistoryOnPress.bind(this) }
              />
            )}
          />
        </View>
      </View>
    )
  }
}

HistoryRecord.propTypes = {
  navAction: PropTypes.shape({
    openDrawer: PropTypes.func.isRequired,
    onExit: PropTypes.func.isRequired,
    getResult: PropTypes.func.isRequired,
  }).isRequired,
  course: PropTypes.object.isRequired,
  quizItem: PropTypes.object,
  status: PropTypes.string.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(HistoryRecord)
