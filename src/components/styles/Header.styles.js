import { StyleSheet } from 'react-native'

export default StyleSheet.create({
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
  drawerIconContainer: {
    width: 40,
    height: 40,
    margin: 10,
    position: 'absolute',
    zIndex: 2,
  },
  drawerIcon: {
    width: 40,
    height: 40,
    zIndex: 1,
  },
  addSearchIconContainer: {
    width: 30,
    height: 30,
    margin: 12.5,
    position: 'absolute',
    right: 0,
    zIndex: 2,
  },
  addSearchIcon: {
    width: 30,
    height: 30,
    zIndex: 1,
  },
})
