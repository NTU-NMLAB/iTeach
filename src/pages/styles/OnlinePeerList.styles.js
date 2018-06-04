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
  subtitleBar: {
    height: 35,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
  },
  addSearchIconContainer: {
    width: 35,
    height: 35,
    margin: 12.5,
    position: 'absolute',
    right: 0,
    zIndex: 2,
  },
  addSearchIcon: {
    width: 35,
    height: 35,
    zIndex: 1,
  },
  title: {
    marginHorizontal: 10,
    color: 'white',
    fontFamily: 'Avenir',
    fontSize: 20,
    textAlign: 'center',
    flex: 1,
  },
  subtitle: {
    marginHorizontal: 10,
    color: 'gray',
    fontFamily: 'Avenir',
    fontSize: 18,
    position: 'absolute',
    left: 15,
    top: 10,
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
