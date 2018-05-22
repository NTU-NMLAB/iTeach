import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 1,
    backgroundColor: '#3A8FB7',
  },
  buttonContainer: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  footerContainer: {
    padding: 20,
    paddingHorizontal: 20,
  },
  drawerItem: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    padding: 15,
    margin: 5,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 20,
    textAlign: 'center',
    width: '100%',
  },
  usernameItem: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
    textAlign: 'center',
    width: 150,
    height: 150,
    lineHeight: 150,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 75,
    justifyContent: 'center',
  },
})
