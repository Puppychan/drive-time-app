import { useEffect } from 'react'
import { Pressable, StyleSheet, Text } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  useAnimatedProps
} from 'react-native-reanimated'
import Feather from 'react-native-vector-icons/Feather'

import { getScreenSize } from '@/src/common/helpers/default-device-value.helper'
import { usePath } from '@/src/common/hooks/use-path.hook'
import { getPathXCenterByIndex } from '@/src/common/utils/path.utils'

type FooterElementProps = {
  label: string
  icon: string
  index: number
  onTabPress: () => void
  activeIndex: number
}

const ICON_SIZE = 25
const { width: screenWidth } = getScreenSize()
const LABEL_WIDTH = screenWidth / 4
const AnimatedIcon = Animated.createAnimatedComponent(Feather)

const FooterElement = ({ label, icon, index, onTabPress, activeIndex }: FooterElementProps) => {
  const { curvePaths } = usePath()
  const animatedActiveIndex = useSharedValue(activeIndex)
  const iconColor = useSharedValue('rgba(128,128,128,0.8)')

  const iconPosition = getPathXCenterByIndex(curvePaths, index)
  const labelPosition = getPathXCenterByIndex(curvePaths, index)

  const tabStyle = useAnimatedStyle(() => {
    const translateY = animatedActiveIndex.value === index ? -35 : 20
    return {
      width: ICON_SIZE,
      height: ICON_SIZE,
      transform: [
        { translateX: iconPosition - ICON_SIZE / 2 },
        { translateY: withTiming(translateY) }
      ]
    }
  })

  const labelContainerStyle = useAnimatedStyle(() => {
    const translateY = animatedActiveIndex.value === index ? 36 : 100
    return {
      transform: [
        { translateX: labelPosition - LABEL_WIDTH / 2 },
        { translateY: withTiming(translateY) }
      ]
    }
  })

  useEffect(() => {
    animatedActiveIndex.value = activeIndex
    iconColor.value =
      animatedActiveIndex.value === index ? withTiming('#fff') : withTiming('rgba(128,128,128,0.8)')
  }, [activeIndex, index, iconColor])

  const animatedIconProps = useAnimatedProps(() => ({
    color: iconColor.value
  }))

  return (
    <>
      <Animated.View style={[tabStyle]}>
        <Pressable
          testID={`tab-${label}`}
          hitSlop={{ top: 30, bottom: 30, left: 50, right: 50 }}
          onPress={onTabPress}
        >
          <AnimatedIcon name={icon} size={ICON_SIZE} animatedProps={animatedIconProps} />
        </Pressable>
      </Animated.View>
      <Animated.View style={[labelContainerStyle, styles.labelContainer]}>
        <Text style={styles.label}>{label}</Text>
      </Animated.View>
    </>
  )
}

const styles = StyleSheet.create({
  labelContainer: {
    position: 'absolute',
    alignItems: 'center',
    width: LABEL_WIDTH
  },
  label: {
    fontSize: 17,
    color: 'rgba(128,128,128,0.8)'
  }
})

export default FooterElement
