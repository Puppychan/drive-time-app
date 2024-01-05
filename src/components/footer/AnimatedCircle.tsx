import { StyleSheet, Text, View } from "react-native";
import React, {FC} from "react";
import Animated, {useAnimatedStyle, useSharedValue, SharedValue} from "react-native-reanimated";

type CircleProps = {
    circleX: SharedValue<number>;
}

const circleContainerSize = 50;

export const AnimatedCircle : FC<CircleProps> = ({circleX}) => {
    const circleStyle = useAnimatedStyle(() => {
        return {
            transform: [{translateX: circleX.value - circleContainerSize / 2}]
        }
    },[])
    return (
        <Animated.View style={[styles.circleContainer, circleStyle]}/>
    )
}

const styles = StyleSheet.create({
    circleContainer: {
        position: 'absolute',
        top: -circleContainerSize / 1.1,
        width: circleContainerSize,
        height: circleContainerSize,
        backgroundColor: '#0ea5e9',
        justifyContent: 'center',
        alignItems: 'center',
    }
})
    