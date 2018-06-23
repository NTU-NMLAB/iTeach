import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 1,
    backgroundColor: '#3A8FB7',
  },
  rowContainer: {
    flex: 1,
    alignItems: 'stretch',
    padding: 15,
    flexDirection: 'column',
    marginTop: 15,
    backgroundColor: 'white',
  },
  empty: {
    height: 70,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  buttonContainer: {
    flexDirection: 'column',
    flex: 1,
    alignItems: 'stretch',
    marginBottom: 10,
    paddingTop: 5,
    width: '100%',
  },
  text: {
    paddingTop: 16,
    paddingLeft: 10,
    marginHorizontal: 5,
    color: '#3A8FB7',
    fontFamily: 'Avenir',
    fontSize: 22,
  },
  input: {
    height: 150,
    paddingVertical: 10,
    paddingHorizontal: 10,
    margin: 10,
    borderColor: '#3A8FB7',
    borderWidth: 1.7,
    borderRadius: 10,
    color: 'black',
    fontFamily: 'Avenir',
    fontSize: 18,
  },
})
