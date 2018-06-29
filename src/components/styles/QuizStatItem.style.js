import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  statItemContainer: {
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
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
  },
  buttonContainer: {
    backgroundColor: '#FFFFFF',
    flex: 0.15,
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
    fontSize: 20,
  },
  normalText: {
    color: '#666666',
    fontFamily: 'Avenir',
    fontSize: 20,
  },
})
