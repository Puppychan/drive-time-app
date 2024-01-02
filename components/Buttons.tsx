import {TouchableOpacity, Text, StyleSheet, ActivityIndicator, Switch, useColorScheme} from "react-native";
// import Icon from 'react-native-vector-icons/FontAwesome6';
import { FC } from 'react';

import {Colors} from './Colors';
import { Constant } from "./Constant";

const ButtonStyle = StyleSheet.create({
  button: {
    elevation: 8,
    backgroundColor: Colors.primary,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  buttonText: {
    fontSize: Constant.normalTextSize,
    color: Colors.cream,
    fontWeight: "bold",
  },
  outlinedButton: {
    backgroundColor: Colors.cream,
    borderColor: Colors.primary,
  },
  outlinedButtonText: {
    color: Colors.primary
  },
  disabledButton: {
    backgroundColor: Colors.disabled
  },

})

interface ButtonProps {
  title: string,
  onPress?: any,
  disabled?: boolean,
  iconLeft?: any,
  iconRight?: any,
  style?: any,
  textStyle?: any,
  activeOpacity?: any,
  loading?: any,
}


export const Button : FC<ButtonProps> = props => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      disabled={props.disabled === true }
      activeOpacity={props.activeOpacity}
      style={[ButtonStyle.button, props.disabled === true && ButtonStyle.disabledButton, props.style]}
    >
      {props.iconLeft}
      {props.loading ? (
        <ActivityIndicator color="white" />
      ) : (
        <Text style={[ButtonStyle.buttonText, props.textStyle]}>{props.title}</Text>
      )}
      {props.iconRight}
    </TouchableOpacity>
  );
}

export const OutlineButton : FC<ButtonProps> = props => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      disabled={props.disabled !== true }
      activeOpacity={props.activeOpacity}
      style={[ButtonStyle.button, ButtonStyle.outlinedButton, props.disabled !== true && ButtonStyle.disabledButton, props.style]}
    >
      {props.iconLeft}
      {props.loading ? (
        <ActivityIndicator color="white" />
      ) : (
        <Text style={[ButtonStyle.buttonText, ButtonStyle.outlinedButtonText, props.textStyle]}>{props.title}</Text>
      )}
      {props.iconRight}
    </TouchableOpacity>
  );
};

interface ToggleButtonProps {
  value? : boolean,
  onValueChange?: any
  disabled?: boolean
}

export const ToggleButton : FC<ToggleButtonProps> = props => {
  const {value, onValueChange, disabled} = props;
  return (
    <Switch
        trackColor={{false: '#767577', true: '#81b0ff'}}
        thumbColor={value ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={onValueChange}
        value={value}
        disabled={disabled}
      />
  );
};