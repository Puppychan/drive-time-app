import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { FC, useEffect } from 'react'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  useAnimatedProps
} from 'react-native-reanimated'
import Feather from 'react-native-vector-icons/Feather'
import { getPathXCenterByIndex } from 'src/Utils/Path'
import { usePath } from 'src/hooks/usePath'
import { SCREEN_WIDTH } from 'src/constants/Screen'

export type FooterItemProps = {
  label: string
  icon: string
  index: number
  onTabPress: () => void
  activeIndex: number
}

const ICON_SIZE = 25
const LABEL_WIDTH = SCREEN_WIDTH / 4
const AnimatedIcon = Animated.createAnimatedComponent(Feather)

export const FooterItem: FC<FooterItemProps> = ({ label, icon, index, onTabPress, activeIndex }) => {
  const { curvePaths } = usePath()
  const animatedActiveIndex = useSharedValue(activeIndex)
  const iconPosition = getPathXCenterByIndex(curvePaths, index)
  const labelPosition = getPathXCenterByIndex(curvePaths, index)

  const tabStyle = useAnimatedStyle(() => {
    const translateY = animatedActiveIndex.value - 1 === index ? -35 : 20
    const iconPositionX = iconPosition - index * ICON_SIZE

    return {
      width: ICON_SIZE,
      height: ICON_SIZE,
      transform: [
        { translateX: withTiming(translateY) },
        { translateY: iconPositionX - ICON_SIZE / 2 }
      ]
    }
  })

  const labelContainerStyle = useAnimatedStyle(() => {
    const translateY = animatedActiveIndex.value - 1 === index ? 36 : 100

    return {
      transform: [
        { translateX: withTiming(translateY) },
        { translateY: labelPosition - LABEL_WIDTH / 2 }
      ]
    }
  })

  const iconColor = useSharedValue(
    animatedActiveIndex.value - 1 === index ? '#fff' : 'rgba(128,128,128,0.8)'
  )

  useEffect(() => {
    animatedActiveIndex.value = activeIndex
    if (animatedActiveIndex.value === index + 1) {
      iconColor.value = withTiming('#fff')
    } else {
      iconColor.value = withTiming('rgba(128,128,128,0.8)')
    }
  }, [activeIndex])

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
       width: LABEL_WIDTH,
    },
    label: {
        fontSize: 17,
        color: 'rgba(128,128,128,0.8)'
    }
})


