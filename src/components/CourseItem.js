import React, { Component } from 'react'
// import { connect } from 'react-redux'
import {
  Image,
  Text,
  TouchableHighlight,
  View,
} from 'react-native'
import PropTypes from 'prop-types'
// import DrawerImage from '../../asset/drawer.png'
// import AddImage from '../../asset/add.png'
// import nav from '../actions/nav'
import styles from './styles/CourseItem.styles'

class CourseItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: this.props.title,
      imgSrc: this.props.imgSrc,
      clicked: false,
    }
    this.onPress = this.onPress.bind(this)
  }
  onPress = () => {
    this.setState((state) => {
      if (this.props.clicked.title && !state.clicked) {
        this.setState({
          title: this.props.clicked.title,
          imgSrc: this.props.clicked.imgSrc,
        })
      } else {
        this.setState({
          title: this.props.title,
        })
      }
      return { clicked: !this.state.clicked }
    })
  }
  render() {
    const { title, imgSrc } = this.state
    return (
      <View style={styles.container}>
        <TouchableHighlight onPress={this.onPress} underlayColor='white'>
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

CourseItem.propTypes = {
  title: PropTypes.string.isRequired,
  clicked: PropTypes.object.isRequired,
  imgSrc: PropTypes.string.isRequired,
}

export default CourseItem
