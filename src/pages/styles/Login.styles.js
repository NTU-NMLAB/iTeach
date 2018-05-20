import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  statusbar: {
    top: -40,
    height: 20,
    width: '100%',
    backgroundColor: '#3A8FB7',
  },
  container: {
    marginTop: 40,
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  form: {
    flex: 3,
    margin: 20,
    alignItems: 'stretch',
  },
  formInput: {
    alignItems: 'stretch',
    padding: 20,
  },
  text: {
    marginHorizontal: 10,
    color: '#3A8FB7',
    fontFamily: 'Avenir',
    fontSize: 18,
  },
  picker: {
    height: 40,
    margin: 10,
    borderColor: '#3A8FB7',
    borderWidth: 1,
    borderRadius: 10,
  },
})
