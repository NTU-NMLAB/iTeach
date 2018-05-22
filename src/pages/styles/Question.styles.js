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
  title: {
    marginHorizontal: 10,
    color: 'white',
    fontFamily: 'Avenir',
    fontSize: 20,
    textAlign: 'center',
    flex: 1,
  },
  text: {
    color: '#3A8FB7',
    fontFamily: 'Avenir',
    fontSize: 22,
  },
  textContainer: {
    padding: '5%',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  listContainer: {
    height: '100%',
    backgroundColor: 'white',
  },
  questionTitle: {
    height: 60,
    paddingLeft: 10,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#FFFFFF',
  },
  questionContext: {
    height: 100,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#FFFFFF',
  },
  singleAnswer: {
    height: 40,
    marginTop: 5,
    marginBottom: 5,
    paddingLeft: 20,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
  },
  truefalseAnswer: {
    height: 40,
    marginTop: 5,
    marginBottom: 5,
    paddingLeft: 20,
    backgroundColor: '#FFFFFF',
  },
  multiAnswer: {
    height: 40,
    marginTop: 5,
    marginBottom: 5,
    paddingLeft: 20,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
  },
  singlesubmitCon: {
    top: 130,
    height: 45,
    width: 100,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: '#3A8FB7',
    alignItems: 'center',
    left: '36%',
    justifyContent: 'space-around',
  },
  truefalsesubmitCon: {
    top: 280,
    height: 45,
    width: 100,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: '#3A8FB7',
    alignItems: 'center',
    left: '36%',
    justifyContent: 'space-around',
  },
  multisubmitCon: {
    top: 75,
    height: 45,
    width: 100,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: '#3A8FB7',
    alignItems: 'center',
    left: '36%',
    justifyContent: 'space-around',

  },
  submit: {
    fontFamily: 'Avenir',
    fontSize: 22,
    color: '#3A8FB7',
  },
  switch: {
    paddingTop: 3,
    left: 30,
  },

  singleInput: {
    height: 44,
    width: 240,
    marginBottom: 25,
    paddingBottom: 10,
    color: '#3A8FB7',
    fontFamily: 'Avenir',
    fontSize: 22,
  },
  cbContainer: {
    color: '#3A8FB7',
    fontFamily: 'Avenir',
    fontSize: 22,
    right: 50,
  }





})
