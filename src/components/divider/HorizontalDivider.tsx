import React from 'react'
import { View, StyleSheet, ColorValue } from 'react-native'

interface HorizontalDividerProps {
  height: number
  backgroundColor?: ColorValue
}

export const HorizontalDivider: React.FC<HorizontalDividerProps> = ({
  height = 2,
  backgroundColor = 'rgba(128, 128, 128, 0.2)',
  ...props // rest operators
}) => {
  return <View style={[styles.divider, { height, backgroundColor, ...props }]} />
}

const styles = StyleSheet.create({
  divider: {
    width: '100%',
    borderRadius: 4
  }
})
