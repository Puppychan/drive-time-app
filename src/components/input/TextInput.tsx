import { useState, FC } from 'react'
import { TextInput, View, StyleSheet } from 'react-native'

import { Label } from './Label'
import { Colors } from '../../../components/Colors'
import { Constant } from '../../../components/Constant'

const InputStyle = StyleSheet.create({
  container: {
    flexDirection: 'column',
    minWidth: 100
  },
  input: {
    borderColor: Colors.silver,
    borderWidth: 1,
    borderRadius: 3,
    backgroundColor: '#FFFFFF',
    height: Constant.inputHeight,
    padding: 10,
    fontSize: Constant.normalTextSize,
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

export const Input = (props: TextInputProps) => {
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
    <View style={[InputStyle.container, style]}>
      {label && <Label label={label} required={required} labelStyle={labelStyle}></Label>}
      <TextInput
        style={[InputStyle.input, isFocused && InputStyle.onFocus]}
        placeholder={placeHolder}
        value={value}
        editable={editable}
        secureTextEntry={secureTextEntry}
        onChangeText={(text: string) => onChangeText(text)}
        underlineColorAndroid="transparent"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...others}
      />
    </View>
  )
}
