import React from 'react'
import { View, StyleSheet, ColorValue } from 'react-native'

interface HorizontalDividerProps {
  height: number
  backgroundColor?: ColorValue
}

export const HorizontalDivider: React.FC<HorizontalDividerProps> = ({
  height = 2,
  backgroundColor = 'rgba(128, 128, 128, 0.2)'
}) => {
  return <View style={[styles.divider, { height, backgroundColor }]} />
}

const styles = StyleSheet.create({
  divider: {
    width: '100%'
  }
})
