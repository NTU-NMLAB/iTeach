import React, { Component } from 'react'
import {
  Image,
  Text,
  TouchableHighlight,
  View,
} from 'react-native'
import PropTypes from 'prop-types'
import styles from './styles/CourseItem.styles'

class QuizItem extends Component {
  render() {
    const {
      id,
      title,
      imgSrc,
      onPress,
    } = this.props
    return (
      <View style={styles.container}>
        <TouchableHighlight onPress={() => onPress(id)} underlayColor='white' style={styles.iconContainer}>
          <Image
            style={styles.icon}
            source={imgSrc} />
        </TouchableHighlight>
        <Text style={styles.title}>
          {title}
        </Text>
      </View>
    )
  }
}

QuizItem.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  imgSrc: PropTypes.number.isRequired,
  onPress: PropTypes.func.isRequired,
}

export default QuizItem
