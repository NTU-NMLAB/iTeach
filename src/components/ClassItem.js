import React, { Component } from 'react'
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableHighlight,
} from 'react-native'
import PropTypes from 'prop-types'
import styles from './styles/ClassItem.styles'
import DeleteImage from '../../asset/delete.png'

class ClassItem extends Component {
  componentDidMount() {
    this.setState({ ref: this.ref })
  }

  render() {
    const {
      item,
      title,
      color,
      deleteClass,
      cancelAllDelete,
      onPress,
    } = this.props
    return (
      <View style={styles.classItemContainer}>
        <ScrollView
          ref={(ref) => { this.ref = ref }}
          onScrollBeginDrag={() => { cancelAllDelete(this.ref) }}
          horizontal
          contentContainerStyle={styles.scroll}
          bounces={false}
          pagingEnabled
          showsHorizontalScrollIndicator={false}>
          <View style={[styles.colorBox, { backgroundColor: color }]} />
          <TouchableHighlight style={styles.textContainer} onPress={() => { onPress(item) }} underlayColor='white'>
            <Text style={styles.title}>
              {title}
            </Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.deleteContainer} onPress={() => { deleteClass(title) }} underlayColor='#C20C02'>
            <Image style={styles.delete} source={DeleteImage}/>
          </TouchableHighlight>
        </ScrollView>
      </View>
    )
  }
}

ClassItem.propTypes = {
  item: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  deleteClass: PropTypes.func.isRequired,
  cancelAllDelete: PropTypes.func.isRequired,
  onPress: PropTypes.func.isRequired,
}

export default ClassItem
