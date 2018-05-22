import React, { Component } from 'react'
import {
  View,
  Text,
  ScrollView,
  TouchableHighlight,
} from 'react-native'
import PropTypes from 'prop-types'
import styles from './styles/ClassItem.styles'

class SearchClassItem extends Component {
  render() {
    const {
      title,
      color,
      onPress,
    } = this.props
    return (
      <View style={styles.classItemContainer}>
        <ScrollView
          horizontal
          contentContainerStyle={styles.scroll}
          bounces={false}
          pagingEnabled
          showsHorizontalScrollIndicator={false}>
          <View style={[styles.colorBox, { backgroundColor: color }]} />
          <TouchableHighlight style={styles.textContainer} onPress={() => { onPress(title, color) }} underlayColor='white'>
            <Text style={styles.title}>
              {title}
            </Text>
          </TouchableHighlight>
        </ScrollView>
      </View>
    )
  }
}

SearchClassItem.propTypes = {
  title: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
}

export default SearchClassItem
