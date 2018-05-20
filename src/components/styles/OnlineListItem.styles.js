import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  classItemContainer: {
    height: 50,
    marginBottom: 5,
    flexDirection: 'row',
    width: '100%',
  },
  scrollItem: {
    alignItems: 'center',
  },
  userPic: {
    height: 35,
    width: 35,
    marginHorizontal: 10,
    borderRadius: 20,
    opacity: 0.6,
  },
  textContainer: {
    flex: 0.85,
  },
  userName: {
    fontFamily: 'Avenir',
    fontSize: 20,
    color: '#3A8FB7',
  },
  deleteContainer: {
    flex: 0.15,
    height: 50,
    backgroundColor: 'red',
    alignItems: 'center',
  },
  delete: {
    height: 25,
    margin: 12.5,
    aspectRatio: 0.9,
  },
})