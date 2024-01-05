import { useState, FC } from 'react'
import { TextInput, View, StyleSheet } from 'react-native'

import { Colors } from '../../../components/Colors'
import { Constant } from '../../../components/Constant'
import { Label } from './Label'

const InputStyle = StyleSheet.create({
  container: {
    flexDirection: 'column'
  },
  input: {
    borderColor: Colors.silver,
    borderWidth: 1,
    borderRadius: 3,
    backgroundColor: '#FFFFFF',
    height: Constant.inputHeight,
    padding: 10,
    fontSize: Constant.normalTextSize,
    minWidth: 100,
    width: '100%'
  },
  onFocus: {
    borderColor: Colors.primary
  }
})

interface TextInputProps {
  label?: string
  placeHolder?: string
  value?: any
  required?: boolean
  type?: any
  editable?: boolean
  secureTextEntry?: boolean
  onChangeText?: any
  labelStyle?: any
  style?: any
}

export const Input: FC<TextInputProps> = (props) => {
  const {
    label,
    placeHolder,
    value,
    required,
    editable,
    secureTextEntry,
    onChangeText,
    labelStyle,
    style,
    ...others
  } = props
  const [isFocused, setIsFocused] = useState(false)
  return (
    <View style={InputStyle.container}>
      {label && <Label label={label} required={required} labelStyle={labelStyle}></Label>}
      <TextInput
        style={[InputStyle.input, isFocused && InputStyle.onFocus, style]}
        placeholder={placeHolder}
        value={value}
        editable={editable}
        secureTextEntry={secureTextEntry}
        onChangeText={(text) => onChangeText(text)}
        underlineColorAndroid="transparent"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...others}
      />
    </View>
  )
}
