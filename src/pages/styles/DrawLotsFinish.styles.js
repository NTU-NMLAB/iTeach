import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 1,
    backgroundColor: '#3A8FB7',
  },
  listContainer: {
    flex: 1,
    padding: 15,
    justifyContent: 'space-around',
    backgroundColor: 'white',
  },
  rowContainer: {
    flex: 0.2,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 0,
    backgroundColor: 'white',
  },
  columnContainerBorder: {
    flex: 1,
    padding: 15,
    flexDirection: 'column',
    marginTop: 0,
    backgroundColor: 'white',
    borderTopColor: '#3A8FB7',
    borderTopWidth: 2,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginBottom: 5,
    paddingTop: 5,
  },
  text: {
    paddingTop: 0,
    marginHorizontal: 5,
    color: '#3A8FB7',
    fontFamily: 'Avenir',
    fontSize: 18,
  },
  textBold: {
    paddingTop: 18,
    marginHorizontal: 5,
    color: '#3A8FB7',
    fontFamily: 'Avenir',
    fontSize: 18,
    fontWeight: 'bold',
  },
  rowDrawLotsList: {
    flex: 2,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 0,
    backgroundColor: 'white',
  },
  textBold2: {
    flex: 1,
    paddingTop: 18,
    marginHorizontal: 0,
    color: '#3A8FB7',
    fontFamily: 'Avenir',
    fontSize: 18,
    fontWeight: 'bold',
  },
  columnContainer: {
    flex: 1,
    padding: 15,
    flexDirection: 'column',
    marginTop: 0,
    backgroundColor: 'white',
  },
  rowAvatar: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 10,
    backgroundColor: 'white',
  },
  name: {
    color: '#3A8FB7',
    fontFamily: 'Avenir',
    fontSize: 20,
    textAlign: 'center',
  },
  AvatarContainer: {
    width: 25,
    height: 25,
    backgroundColor: '#3A8FB7',
  },
})
