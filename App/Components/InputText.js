import React, { memo, useState, useRef } from 'react'
// import PropTypes from 'prop-types'
import { View, Text, TextInput } from 'react-native'
import Animated, { Easing } from 'react-native-reanimated'
// Styles
import styles from './Styles/InputTextStyle'
import { apply } from '../Themes/OsmiProvider'

const InputText = props => {
  const [focus, setFocus] = useState(false)
  const { name, setFieldValue, label, ...restProps } = props

  const inputFocus = () => {
    setFocus(true)
  }

  const inputBlur = () => {
    setFocus(false)
  }

  return (
    <View style={styles.container}>
      <View style={[styles.input, props.styles]}>
        <TextInput
          style={[
            styles.inputText,
            focus ? apply('border-primary') : apply('border-white'),
            props.errors && apply('border-red-500 border-2')
          ]}
          onFocus={inputFocus}
          onBlur={inputBlur}
          {...restProps}
        />
        {props.errors && <Text style={styles.error}>{props.errors}</Text>}
      </View>
    </View>
  )
}

// // Prop type warnings
// InputText.propTypes = {
//   someProperty: PropTypes.object,
//   someSetting: PropTypes.bool.isRequired,
// }
//
// // Defaults for props
// InputText.defaultProps = {
//   someSetting: false
// }

export default memo(InputText)
