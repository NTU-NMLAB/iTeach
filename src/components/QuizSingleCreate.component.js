import React from 'react'
import {
  View,
  Text,
} from 'react-native'
import PropTypes from 'prop-types'
import styles from './styles/Question.style'
import Button from './Button.component'
import StatefulTextInput from '../components/StatefulTextInput.component'

const SingleCreate = (props) => {
  const {
    questionState,
    answerOptions,
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
        <StatefulTextInput
          style={styles.text}
          onChangeText={ e => onChangeCallbacks.questionState(e) }
          value={questionState}
          placeholder='題目敘述'
        />
      </View>
      <View style={styles.singleAnswer}>
        <Text style={styles.text}>
              正確選項：
        </Text>
        <StatefulTextInput
          style={styles.singleInput}
          onChangeText={ e => onChangeCallbacks.rightAns(e) }
          value={answerOptions.rightAns}
          placeholder='正確答案'
        />
      </View>
      <View style={styles.singleAnswer}>
        <Text style={styles.text}>
              錯誤選項：
        </Text>
        <StatefulTextInput
          style={styles.singleInput}
          onChangeText={ e => onChangeCallbacks.wrongAns1(e) }
          value={answerOptions.wrongAns1}
          placeholder='錯誤答案'
        />
      </View>
      <View style={styles.singleAnswer}>
        <Text style={styles.text}>
              錯誤選項：
        </Text>
        <StatefulTextInput
          style={styles.singleInput}
          onChangeText={ e => onChangeCallbacks.wrongAns2(e) }
          value={answerOptions.wrongAns2}
          placeholder='錯誤答案'
        />
      </View>
      <View style={styles.singleAnswer}>
        <Text style={styles.text}>
              錯誤選項：
        </Text>
        <StatefulTextInput
          style={styles.singleInput}
          onChangeText={ e => onChangeCallbacks.wrongAns3(e) }
          value={answerOptions.wrongAns3}
          placeholder='錯誤答案'
        />
      </View>
      <View style={styles.singlesubmitCon}></View>
      <Button label='發佈問題' onPress={onPressSubmit}/>
    </View>
  )
}

SingleCreate.propTypes = {
  questionState: PropTypes.string.isRequired,
  answerOptions: PropTypes.shape({
    rightAns: PropTypes.string.isRequired,
    wrongAns1: PropTypes.string.isRequired,
    wrongAns2: PropTypes.string.isRequired,
    wrongAns3: PropTypes.string.isRequired,
  }),
  onChangeCallbacks: PropTypes.shape({
    questionState: PropTypes.func.isRequired,
    rightAns: PropTypes.func.isRequired,
    wrongAns1: PropTypes.func.isRequired,
    wrongAns2: PropTypes.func.isRequired,
    wrongAns3: PropTypes.func.isRequired,
  }),
  onPressSubmit: PropTypes.func.isRequired,
}

SingleCreate.defaultProps = {
  questionState: '',
  answerOptions: {
    rightAns: '',
    wrongAns1: '',
    wrongAns2: '',
    wrongAns3: '',
  },
  onChangeCallbacks: {
    questionState: () => {},
    rightAns: () => {},
    wrongAns1: () => {},
    wrongAns2: () => {},
    wrongAns3: () => {},
  },
  onPressSubmit: () => {},
}

export default SingleCreate
