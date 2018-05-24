import { AsyncStorage } from 'react-native'

const queryClass = async () => {
  try {
    await AsyncStorage.getItem('iTeachStore:Class', (err, res) => {
      if (!err) {
        console.log(JSON.parse(res))
      }
    })
  } catch (err) {
    console.log('error')
  }
}

const queryCourse = async () => {
  try {
    await AsyncStorage.getItem('iTeachStore:Course', (err, res) => {
      if (!err) {
        console.log(JSON.parse(res))
      }
    })
  } catch (err) {
    console.log('error')
  }
}

export { queryClass, queryCourse }
