import React from 'react'
import {
  View,
  Text,
} from 'react-native'
import CheckBox from 'react-native-check-box'
import PropTypes from 'prop-types'
import styles from './styles/Question.style'
import Button from './Button.component'
import StatefulTextInput from '../components/StatefulTextInput.component'

const MultiCreate = (props) => {
  const {
    questionState,
    answerOptions,
    onChangeCallbacks,
    onClickCallbacks,
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
      <View style={styles.multiAnswer}>
        <Text style={styles.text}>
          選項：
        </Text>
        <StatefulTextInput
          style={styles.singleInput}
          onChangeText={ e => onChangeCallbacks.ans1State(e) }
          value={answerOptions.ans1State}
          placeholder='選項'
        />
        <Text style={styles.cbContainer}>
          正確？<CheckBox isChecked={answerOptions.check1} checkBoxColor='#3A8FB7' onClick={onClickCallbacks.ans1Check}/>
        </Text>
      </View>
      <View style={styles.multiAnswer}>
        <Text style={styles.text}>
          選項：
        </Text>
        <StatefulTextInput
          style={styles.singleInput}
          onChangeText={ e => onChangeCallbacks.ans2State(e) }
          value={answerOptions.ans2State}
          placeholder='選項'
        />
        <Text style={styles.cbContainer}>
          正確？<CheckBox isChecked={answerOptions.check2} checkBoxColor='#3A8FB7' onClick={onClickCallbacks.ans2Check}/>
        </Text>
      </View>
      <View style={styles.multiAnswer}>
        <Text style={styles.text}>
          選項：
        </Text>
        <StatefulTextInput
          style={styles.singleInput}
          onChangeText={ e => onChangeCallbacks.ans3State(e) }
          value={answerOptions.ans3State}
          placeholder='選項'
        />
        <Text style={styles.cbContainer}>
          正確？<CheckBox isChecked={answerOptions.check3} checkBoxColor='#3A8FB7' onClick={onClickCallbacks.ans3Check}/>
        </Text>
      </View>
      <View style={styles.multiAnswer}>
        <Text style={styles.text}>
          選項：
        </Text>
        <StatefulTextInput
          style={styles.singleInput}
          onChangeText={ e => onChangeCallbacks.ans4State(e) }
          value={answerOptions.ans4State}
          placeholder='選項'
        />
        <Text style={styles.cbContainer}>
          正確？<CheckBox isChecked={answerOptions.check4} checkBoxColor='#3A8FB7' onClick={onClickCallbacks.ans4Check}/>
        </Text>
      </View>
      <View style={styles.multiAnswer}>
        <Text style={styles.text}>
          選項：
        </Text>
        <StatefulTextInput
          style={styles.singleInput}
          onChangeText={ e => onChangeCallbacks.ans5State(e) }
          value={answerOptions.ans5State}
          placeholder='選項'
        />
        <Text style={styles.cbContainer}>
          正確？<CheckBox isChecked={answerOptions.check5} checkBoxColor='#3A8FB7' onClick={onClickCallbacks.ans5Check}/>
        </Text>
      </View>
      <View style={styles.multisubmitCon}></View>
      <Button label='發佈問題' onPress={onPressSubmit}/>
    </View>
  )
}

MultiCreate.propTypes = {
  questionState: PropTypes.string.isRequired,
  answerOptions: PropTypes.shape({
    ans1State: PropTypes.string.isRequired,
    ans2State: PropTypes.string.isRequired,
    ans3State: PropTypes.string.isRequired,
    ans4State: PropTypes.string.isRequired,
    ans5State: PropTypes.string.isRequired,
    check1: PropTypes.bool.isRequired,
    check2: PropTypes.bool.isRequired,
    check3: PropTypes.bool.isRequired,
    check4: PropTypes.bool.isRequired,
    check5: PropTypes.bool.isRequired,
  }),
  onChangeCallbacks: PropTypes.shape({
    questionState: PropTypes.func.isRequired,
    ans1State: PropTypes.func.isRequired,
    ans2State: PropTypes.func.isRequired,
    ans3State: PropTypes.func.isRequired,
    ans4State: PropTypes.func.isRequired,
    ans5State: PropTypes.func.isRequired,
  }),
  onClickCallbacks: PropTypes.shape({
    ans1Check: PropTypes.func.isRequired,
    ans2Check: PropTypes.func.isRequired,
    ans3Check: PropTypes.func.isRequired,
    ans4Check: PropTypes.func.isRequired,
    ans5Check: PropTypes.func.isRequired,
  }),
  onPressSubmit: PropTypes.func.isRequired,
}

MultiCreate.defaultProps = {
  questionState: '',
  answerOptions: {
    ans1State: '',
    ans2State: '',
    ans3State: '',
    ans4State: '',
    ans5State: '',
    check1: false,
    check2: false,
    check3: false,
    check4: false,
    check5: false,
  },
  onChangeCallbacks: {
    questionState: () => {},
    ans1State: () => {},
    ans2State: () => {},
    ans3State: () => {},
    ans4State: () => {},
    ans5State: () => {},
  },
  onClickCallbacks: {
    ans1Check: () => {},
    ans2Check: () => {},
    ans3Check: () => {},
    ans4Check: () => {},
    ans5Check: () => {},
  },
  onPressSubmit: () => {},
}

export default MultiCreate
