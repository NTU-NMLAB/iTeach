import React from 'react'
import {
  Image,
  View,
} from 'react-native'
import styles from './styles/Logo.styles'
import LogoImg from '../../asset/logo.png'

const Logo = () => (
  <View style={styles.logoContainer}>
    <Image
      style={styles.logo}
      source={ LogoImg } />
  </View>
)

export default Logo
