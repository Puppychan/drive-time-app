import { useState } from 'react'
import { TextInput, View, StyleSheet } from 'react-native'

import { Label } from './Label'
import { Colors, specialColors } from '@/components/Colors'
import { Constant } from '@/components/Constant'
import FontSize from '@/components/FontSize'
import Spacing from '@/components/Spacing'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    minWidth: 100,
    gap: 10,
  },
  input: {
    borderColor: Colors.silver,
    borderWidth: 1,
    borderRadius: 5,
    height: Constant.inputHeight,
    width: '100%',
    fontSize: FontSize.small,
    padding: Spacing,
  },
  onFocus: {
    borderWidth: 2,
    borderColor: Colors.primary,
    shadowOffset: { width: 4, height: Spacing },
    shadowColor: Colors.primary,
    shadowOpacity: 0.2,
    shadowRadius: Spacing,
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
    <View style={styles.container}>
      {label && <Label label={label} required={required} labelStyle={labelStyle}></Label>}
      <TextInput
        style={[
          styles.input,
          isFocused && styles.onFocus,
        ]}
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
