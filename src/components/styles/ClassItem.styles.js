import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  classItemContainer: {
    height: 50,
    marginBottom: 5,
    flexDirection: 'row',
    width: '100%',
  },
  scroll: {
    alignItems: 'center',
    width: '120%',
  },
  colorBox: {
    height: 25,
    width: 25,
    marginHorizontal: 10,
    borderRadius: 5,
    opacity: 0.6,
  },
  textContainer: {
    flex: 0.85,
  },
  title: {
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
