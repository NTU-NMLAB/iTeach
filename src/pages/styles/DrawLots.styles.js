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
    flex: 1,
    padding: 15,
    flexDirection: 'row',
    marginTop: 15,
    backgroundColor: 'white',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginBottom: 70,
    paddingTop: 5,
  },
  text: {
    paddingTop: 18,
    marginHorizontal: 5,
    color: '#3A8FB7',
    fontFamily: 'Avenir',
    fontSize: 18,
  },
  picker: {
    height: 40,
    width: 83,
    margin: 10,
    borderColor: '#3A8FB7',
    borderWidth: 1.7,
    borderRadius: 10,
  },
  pickerText: {
    marginHorizontal: 10,
    color: '#3A8FB7',
    fontFamily: 'Avenir',
    fontSize: 18,
  },
  input: {
    height: 40,
    width: 100,
    padding: 10,
    margin: 10,
    borderColor: '#3A8FB7',
    borderWidth: 1.7,
    borderRadius: 10,
    color: '#3A8FB7',
    fontFamily: 'Avenir',
    fontSize: 18,
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
