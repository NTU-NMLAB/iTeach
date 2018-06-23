import { StyleSheet } from 'react-native'

export default StyleSheet.create({
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
