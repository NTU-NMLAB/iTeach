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
  itemContainer: {
    padding: '5%',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    backgroundColor: '#FFFFFF',
  },
  listContainer: {
    flex: 1,
    padding: 0,
    paddingTop: 5,
    justifyContent: 'space-around',
    backgroundColor: 'white',
  },
  list: {
    flex: 1,
  },
  statsContainer: {
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'wrap',
    paddingLeft: 10,
    paddingTop: 10,
    justifyContent: 'flex-start',
    backgroundColor: '#FFFFFF',
  },
  questionTitle: {
    height: 60,
    paddingLeft: 10,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#FFFFFF',
  },
  questionContext: {
    height: 140,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#FFFFFF',
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
})
