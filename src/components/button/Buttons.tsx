import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, Switch } from 'react-native'
// import Icon from 'react-native-vector-icons/FontAwesome6';

import { Colors } from '@/components/Colors'
import { Constant } from '@/components/Constant'
import { transparent } from 'react-native-paper/lib/typescript/styles/colors'

export enum ButtonType {filled, outlined, text}

const styles = StyleSheet.create({
  button: {
    elevation: 8,
    backgroundColor: Colors.primary,
    borderRadius: 5,
    borderWidth: 0,
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    fontSize: Constant.buttonTextSize,
    color: Colors.white,
    fontWeight: 'bold',

  },
  outlinedButton: {
    backgroundColor: 'transparent',
    borderColor: Colors.primary,
    borderWidth: 1,
    elevation: 0,
  },
  outlinedButtonText: {
    color: Colors.primary,
  },
  textButton: {
    backgroundColor: 'transparent',
    paddingVertical: 0,
    paddingHorizontal: 0,
    elevation: 0,
  },
  textButtonText: {
    fontWeight: 'normal',

  },
  disabledButton: {
    backgroundColor: Colors.disabled
  },

})

interface ButtonProps {
  title: string
  onPress?: any
  disabled?: boolean
  type?: ButtonType
  iconLeft?: any
  iconRight?: any
  style?: any
  textStyle?: any
  activeOpacity?: any
  loading?: any
  childrenLeft?: any
  childrenRight?: any

}

export const CustomButton = (props: ButtonProps) => {
  const type = props.type ?? ButtonType.filled
  const disabled = props.disabled ?? false
  return (
    <TouchableOpacity
      onPress={props.onPress}
      disabled={props.disabled === true}
      activeOpacity={props.activeOpacity}
      style={[
        styles.button,
        disabled && styles.disabledButton,
        type === ButtonType.outlined && styles.outlinedButton,
        type === ButtonType.text && styles.textButton,
        props.style,
      ]}
    >
      {props.iconLeft}
      {props.childrenLeft}
      {props.loading ? (
        <ActivityIndicator color="white" />
      ) : (
        <Text style={[
          styles.buttonText, 
          type === ButtonType.outlined && styles.outlinedButtonText,
          type === ButtonType.text && styles.textButtonText,
          props.textStyle,
        ]}>
          {props.title}
        </Text>
      )}
      {props.iconRight}
      {props.childrenRight}
    </TouchableOpacity>
  )
}


interface ToggleButtonProps {
  value?: boolean
  onValueChange?: any
  disabled?: boolean
}

export const ToggleButton = (props: ToggleButtonProps) => {
  const { value, onValueChange, disabled } = props
  return (
    <Switch
      trackColor={{ false: '#767577', true: '#81b0ff' }}
      thumbColor={value ? '#f5dd4b' : '#f4f3f4'}
      ios_backgroundColor="#3e3e3e"
      onValueChange={onValueChange}
      value={value}
      disabled={disabled}
    />
  )
}

// export const OutlineButton = (props: ButtonProps) => {
//   return (
//     <TouchableOpacity
//       onPress={props.onPress}
//       disabled={props.disabled === true}
//       activeOpacity={props.activeOpacity}
//       style={[
//         styles.button,
//         styles.outlinedButton,
//         props.disabled === true && styles.disabledButton,
//         props.style
//       ]}
//     >
//       {props.iconLeft}
//       {props.childrenLeft}
//       {props.loading ? (
//         <ActivityIndicator color="white" />
//       ) : (
//         <Text style={[styles.buttonText, styles.outlinedButtonText, props.textStyle]}>
//           {props.title}
//         </Text>
//       )}
//       {props.iconRight}
//       {props.childrenRight}
//     </TouchableOpacity>
//   )
// }

