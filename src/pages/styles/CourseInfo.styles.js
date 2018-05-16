import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 1,
    backgroundColor: '#3A8FB7',
    flexDirection: 'column',
  },
  contentContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: 12,
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
    padding: 10,
  },
  colorBox: {
    height: 40,
    width: 40,
    borderRadius: 5,
    opacity: 0.6,
  },
  text: {
    color: '#3A8FB7',
    fontFamily: 'Avenir',
    fontSize: 18,
  },
  url: {
    color: 'blue',
    textDecorationLine: 'underline',
    textDecorationColor: 'blue',
    textDecorationStyle: 'solid',
  },
  courseName: {
    height: 40,
    // width: 240,
    flex: 1,
    color: '#3A8FB7',
    fontSize: 24,
    marginTop: 12,
    marginLeft: 12,
  },
  infoContainer: {
    flexDirection: 'column',
    margin: 10,
    padding: 10,
    alignItems: 'flex-start',
  },
  infoRowContainer: {
    flexDirection: 'row',
    marginVertical: 10,
    paddingTop: 5,
  },

})
