import { View, StyleSheet } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons' // or from '@expo/vector-icons' if using Expo

type CircleIconProps = {
  name: string
  size: number
  color: string
  backgroundColor?: string
  style?: any
}

const CircleIcon = ({ name, size, color, backgroundColor, style }: CircleIconProps) => {
  const circleSize = size * 2 // Adjust the size of the circle based on the icon size
  return (
    <View
      style={[
        styles.iconCircle,
        {
          width: circleSize,
          height: circleSize,
          borderRadius: circleSize / 2,
          backgroundColor: backgroundColor ?? backgroundColor
        },
        style
      ]}
    >
      <MaterialIcons name={name} size={size} color={color} />
    </View>
  )
}

const styles = StyleSheet.create({
  iconCircle: {
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default CircleIcon
