import React, {FC} from "react";
import {StyleSheet, View, Text, Pressable,StyleProp,ViewStyle,PressableProps} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export type IconLib = {
    [key: string]: () => React.ComponentType<any>;
}

const ICON_LIB: IconLib = {
    Feather : () => Feather,
    MaterialCommunityIcons: () => MaterialCommunityIcons,
}

export type IconButtonProps = PressableProps & {
    icon: string;
    iconFamily?: 'feather' | 'MaterialCommunityIcons';
    variant?: 'text' | 'outlined' | 'contained';
    size?: 'small' | 'medium' | 'large';
    iconColor?: string;
    roudness?: 'full' | 'medium' | 'small';
    style?: StyleProp<ViewStyle>;
    onPress?: () => void;
}

export const IconButton: FC<IconButtonProps> = ({
    icon,
    iconFamily = 'feather',
    variant = 'contained',
    size = 'medium',
    iconColor = 'white',
    roudness = 'medium',
    style= {},
    onPress,
    ...rest
}: IconButtonProps) => {
    const Icon = ICON_LIB[iconFamily]();
    const iconSize = size === 'large' ? 24 : size === 'medium' ? 16 : 12;
    const buttonSize = size === 'large' ? 48 : size === 'medium' ? 36 : 24;

    const buttonStyles = [
        styles.button,
        styles[`${variant}Button`],
        styles[`${roudness}Roudness`],
        {width : buttonSize, height: buttonSize},
        style,
    ] as StyleProp<ViewStyle>;
    return (
        <Pressable onPress={onPress} style={({pressed}) =>[
            buttonStyles,
            pressed && styles.pressedButton,
            pressed && styles.shadow,

        ]} {...rest}>
            
                <Icon name={icon} size={iconSize} color={iconColor} />
     
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button :{
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 40,
    },
    pressedButton: {
        opacity: 0.9,
    },
    containerButton: {
        backgroundColor: '#2196F3',
    },
    textButton: {
        backgroundColor: 'transparent',
    },
    outlinedButton: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '#2196F3',
    },
    fullRoudness: {
        borderRadius: 100,
    },
    mediumRoudness: {
        borderRadius: 20,
    },
    smallRoudness: {
        borderRadius: 10,
    },
    shadow: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.0,
        elevation: 1,
    },
})