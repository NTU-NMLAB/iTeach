import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableHighlight,
} from 'react-native'
import PropTypes from 'prop-types'
import styles from './styles/Accordion.styles'
import Accordion from 'react-native-accordion'

class SingleAccordion extends Component{
  getInitialState() {
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    return ({dataSource: ds.cloneWithRows(_.range(25))});
  }

  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this._renderRow}
      />
    );
  }

  _renderRow() {
    var header = (
      <View style={styles.SingleAnswer}>
        <Text>Click to Expand</Text>
      </View>
    );

    var content = (
      <View style={styles.SingleAnswer}>
        <Text>This content is hidden in the accordion</Text>
      </View>
    );

    return (
      <Accordion
        header={header}
        content={content}
        easing="easeOutCubic"
      />
    );
  }
}

export default SingleAccordion

