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
  itemContainer: {
    padding: '5%',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    backgroundColor: '#FFFFFF',
  },
  outsideAlert: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  insideAlert: {
    height: 200,
    width: 300,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#3A8FB7',
    borderWidth: 4,
    borderRadius: 20,
    backgroundColor: 'white',
  },
  alertTitle: {
    marginTop: 15,
    marginBottom: 5,
    color: '#3A8FB7',
    fontFamily: 'Avenir',
    fontWeight: 'bold',
    fontSize: 24,
  },
  alertText: {
    marginTop: 5,
    marginBottom: 15,
    color: '#3A8FB7',
    fontFamily: 'Avenir',
    fontSize: 21,
  },
  alertButton: {
    flexDirection: 'row',
    marginTop: 15,
    marginBottom: 15,
  },
})