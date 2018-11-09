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
    fontSize: 24,
    textAlign: 'center',
    flex: 1,
  },
  formInput: {
    alignItems: 'flex-start',
    padding: 1,
  },
  container: {
    paddingTop: 20,
    flex: 1,
    backgroundColor: '#3A8FB7',
  },
  whiteContainer: {
    height: 10000,
    backgroundColor: 'white',
  },
  infoInputContainer: {
    flexDirection: 'row',
    marginHorizontal: 10,
    paddingTop: 5,
  },
  text: {
    paddingTop: 10,
    marginHorizontal: 5,
    color: '#3A8FB7',
    fontFamily: 'Avenir',
    fontSize: 18,
  },
  courseInputContainer: {
    flexDirection: 'row',
    margin: 10,
    padding: 10,
  },
  colorBox: {
    justifyContent: 'center',
    height: 40,
    width: 40,
    margin: 10,
    padding: 10,
    borderRadius: 5,
    opacity: 0.6,
  },
  input: {
    height: 40,
    width: 240,
    padding: 10,
    margin: 10,
    borderColor: '#3A8FB7',
    borderWidth: 1.7,
    borderRadius: 10,
    color: '#3A8FB7',
    fontSize: 18,
  },
  picker: {
    height: 40,
    width: 110,
    margin: 10,
    borderColor: '#3A8FB7',
    borderWidth: 1,
    borderRadius: 10,
  },
  pickerText: {
    marginHorizontal: 10,
    color: '#3A8FB7',
    fontFamily: 'Avenir',
    fontSize: 14,
  },
})
