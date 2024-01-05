import React, { FC, useMemo, useState } from 'react'
import { View, Text, StyleSheet, StyleProp, ViewStyle } from 'react-native'
import Svg, { Path } from 'react-native-svg'
import Animated, {
  runOnJS,
  useAnimatedProps,
  useSharedValue,
  withTiming
} from 'react-native-reanimated'
import { interpolatePath } from 'react-native-redash'
import { SCREEN_WIDTH } from '@/src/constants/screen.utils'
import { usePath } from '@/src/common/hooks/use-path.hook'
import { getPathXCenter } from '@/src/common/utils/path.utils'
import { FooterItem } from './FooterItem'
import { AnimatedCircle } from './AnimatedCircle'
import { BottomTabBarProps } from '@react-navigation/bottom-tabs'

const AnimatedPath = Animated.createAnimatedComponent(Path)

export const CustomFooter: FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
  const { containerPath, curvePaths, tHeight } = usePath()
  const circleXCordinate = useSharedValue(0)
  const progress = useSharedValue(1)
  const handleMoveCircle = (curvePaths: string) => {
    circleXCordinate.value = getPathXCenter(curvePaths)
  }

  const selectIcon = (routeName: string) => {
    switch (routeName) {
      case 'Home':
        return require('../../../assets/home.png')
      case 'Profile':
        return require('../../../assets/profile.png')
      case 'Favourite':
        return require('../../../assets/favourite.png')
      case 'Direction':
        return require('../../../assets/direction.png')
    }
  }
  const animatedProps = useAnimatedProps(() => {
    const currentPath = interpolatePath(
      progress.value,
      Array.from({ length: curvePaths.length }, (_, i) => i + 1),
      curvePaths
    )
    runOnJS(handleMoveCircle)(currentPath)
    return {
      d: `${containerPath} ${currentPath}`
    }
  })

  const handleTabPress = (index: number, tab: string) => {
    navigation.navigate(tab)
    progress.value = withTiming(index)
  }

  return (
    <View style={styles.footerBarContainer}>
      <Svg style={styles.shadowMd} width={SCREEN_WIDTH} height={tHeight}>
        <AnimatedPath animatedProps={animatedProps} fill="black" />
      </Svg>
      <AnimatedCircle circleX={circleXCordinate} />
      <View
        style={[
          styles.footerItemsContainer,
          {
            height: tHeight
          }
        ]}
      >
        {state.routes.map((route, index) => {
            const { options } = descriptors[route.key]
            const label = options.tabBarLabel ? options.tabBarLabel : route.name;
            return (
                <FooterItem
                    key={route.key}
                    label={label as string}
                    icon={selectIcon(route.name)}
                    activeIndex={state.index + 1}
                    index={index}
                    onTabPress={() => handleTabPress(index + 1, route.name)}
                />
            );
        })}
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    footerBarContainer: {
        position: 'absolute',
        bottom: 0,
       zIndex: 2,
    },
    footerItemsContainer: {
        position: 'absolute',
        flexDirection: 'row',
        width: '100%',
    },
    shadowMd: {
        elevation: 3,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 3,
        shadowOffset: {
            width: 0,
            height: 3,
        },
    }
})
