import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  historyItemContainer: {
    height: 100,
    flexDirection: 'row',
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#99ccff',
  },
  answerStateContainer: {
    width: 'auto',
    marginHorizontal: 15,
    paddingTop: 10,
  },
  answerStateText: {
    fontFamily: 'Avenir',
    fontSize: 14,
    color: '#3A8FB7',
    textAlign: 'right',
  },
  answerState: {
    fontFamily: 'Avenir',
    fontSize: 20,
    color: '#3A8FB7',
    textAlign: 'right',
  },
  icon: {
    width: 40,
    height: 40,
    alignItems: 'center',
    marginTop: -10,
  },
  questionContainer: {
    flexDirection: 'column',
    width: 290,
    paddingTop: 7.5,
    alignItems: 'flex-start',
  },
  questionType: {
    fontFamily: 'Avenir',
    fontSize: 18,
    textAlign: 'left',
  },
  questionDescription: {
    fontFamily: 'Avenir',
    fontSize: 14,
    textAlign: 'left',
  },
  questionTime: {
    fontFamily: 'Avenir',
    fontSize: 14,
    color: '#696969',
    textAlign: 'right',
    textAlignVertical: 'bottom',
  },
  title: {
    fontFamily: 'Avenir',
    fontSize: 20,
    color: '#3A8FB7',
  },
})
