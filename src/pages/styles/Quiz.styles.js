import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 1,
    backgroundColor: '#3A8FB7',
  },
  titleBar: {
    height: 60,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#3A8FB7',
  },
  title: {
    marginHorizontal: 10,
    color: 'white',
    fontFamily: 'Avenir',
    fontSize: 20,
    textAlign: 'center',
    flex: 1,
  },
  itemContainer: {
    padding: '5%',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    backgroundColor: '#FFFFFF',
  },
})
