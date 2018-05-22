import React, { Component } from 'react'
import {
  View,
  Text,
  ScrollView,
} from 'react-native'
import PropTypes from 'prop-types'
import styles from './styles/OnlineListItem.styles'

class OnlineListItem extends Component {
  render() {
    const {
      title,
      color,
    } = this.props
    return (
      <View style={styles.classItemContainer}>
        <ScrollView
          horizontal
          contentContainerStyle={styles.scrollItem}
          bounces={false}>
          <View style={[styles.userPic, { backgroundColor: color }]} />
          <Text style={styles.userName}>
            {title}
          </Text>
        </ScrollView>
      </View>
    )
  }
}

OnlineListItem.propTypes = {
  title: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
}

export default OnlineListItem