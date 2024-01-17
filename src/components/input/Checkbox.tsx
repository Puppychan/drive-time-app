import { MaterialCommunityIcons } from '@expo/vector-icons'
import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'

import { Label } from './Label'

interface CheckBoxProps {
  title: string
  isChecked?: boolean
  onPress?: any
  required?: boolean
  textStyle?: any
  style?: any
}

const CheckBox = (props: CheckBoxProps) => {
  const title = props.title
  const iconName = props.isChecked ? 'checkbox-marked' : 'checkbox-blank-outline'
  const color = props.style.color || '#000'

  return (
    <View style={styles.container}>
      <Pressable onPress={props.onPress}>
        <MaterialCommunityIcons name={iconName} size={24} color={color} />
      </Pressable>
      {title && (
        <Label
          label={title}
          required={props.required}
          labelStyle={[props.textStyle, styles.title]}
        ></Label>
      )}
    </View>
  )
}

export default CheckBox

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    width: 150,
    marginTop: 5,
    marginHorizontal: 5
  },
  title: {
    marginLeft: 5
  }
})
