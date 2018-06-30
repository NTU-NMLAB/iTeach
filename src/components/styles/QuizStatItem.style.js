import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  statItemContainer: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'column',
  },
  statBarContainer: {
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
  },
  statListContainer: {
    backgroundColor: '#FFFFFF',
  },
  labelContainer: {
    backgroundColor: '#FFFFFF',
    flex: 0.15,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  ratioContainer: {
    backgroundColor: '#FFFFFF',
    flex: 0.70,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonContainer: {
    backgroundColor: '#FFFFFF',
    flex: 0.15,
  },
  studentItemContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  correctBar: {
    borderRadius: 5,
    height: 30,
    backgroundColor: '#3A8FB7',
    marginRight: 5,
  },
  normalBar: {
    borderRadius: 5,
    height: 30,
    backgroundColor: '#666666',
    marginRight: 5,
  },
  correctText: {
    color: '#3A8FB7',
    fontWeight: 'bold',
    fontFamily: 'Avenir',
    fontSize: 15,
  },
  normalText: {
    color: '#666666',
    fontFamily: 'Avenir',
    fontSize: 15,
  },
  studentList: {
    flex: 1,
  },
  studentText: {
    fontFamily: 'Avenir',
    fontSize: 18,
    textAlign: 'left',
  },
})
