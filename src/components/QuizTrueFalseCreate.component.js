import React from 'react'
import {
  View,
  Text,
  TextInput,
  Switch,
} from 'react-native'
import PropTypes from 'prop-types'
import styles from './styles/Question.style'
import Button from './Button.component'

const TrueFalseCreate = (props) => {
  const {
    questionState,
    answerValue,
    onChangeCallbacks,
    onPressSubmit,
  } = props
  return (
    <View style={styles.listContainer}>
      <View style={styles.questionTitle}>
        <Text style={styles.text}>
          題目內容：
        </Text>
      </View>
      <View style={styles.questionContext}>
        <TextInput
          style={styles.text}
          onBlur={ e => onChangeCallbacks.questionState(e.nativeEvent.text) }
          value={questionState}
          placeholder='題目敘述'
        />
      </View>
      <View style={styles.truefalseAnswer}>
        <Text style={styles.text}>
          正確答案：   否  <Switch style={styles.switch} value={answerValue}
            onValueChange={onChangeCallbacks.answerValue} />  是
        </Text>
      </View>
      <View style={styles.truefalsesubmitCon}></View>
      <View style={styles.truefalsesubmitCon}>
        <Button label='發佈問題' onPress={onPressSubmit}/>
      </View>
    </View>
  )
}

TrueFalseCreate.propTypes = {
  questionState: PropTypes.string.isRequired,
  answerValue: PropTypes.bool.isRequired,
  onChangeCallbacks: PropTypes.shape({
    questionState: PropTypes.func.isRequired,
    answerValue: PropTypes.func.isRequired,
  }),
  onPressSubmit: PropTypes.func.isRequired,
}

TrueFalseCreate.defaultProps = {
  questionState: '',
  answerValue: false,
  onChangeCallbacks: {
    questionState: () => {},
    answerValue: () => {},
  },
  onPressSubmit: () => {},
}

export default TrueFalseCreate
