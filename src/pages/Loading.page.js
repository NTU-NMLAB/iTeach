import React from 'react'
import { connect } from 'react-redux'
import {
  Text,
  View,
  ActivityIndicator,
} from 'react-native'
import Logo from '../components/Logo.component'
import styles from './styles/Register.style'

const Loading = () => {
  return <View style={styles.container}>
    <View style={styles.statusbar}/>
    <Logo />
    <View flex={0.6}>
      <Text style={{
        marginHorizontal: 20,
        color: '#3A8FB7',
        fontFamily: 'Avenir',
        fontSize: 25,
        textAlign: 'center',
      }}>讀取中 ...</Text>
      <View marginTop={20}>
        <ActivityIndicator size="large" color="#3A8FB7"/>
      </View>
    </View>
  </View>
}

export default connect(undefined, undefined)(Loading)
