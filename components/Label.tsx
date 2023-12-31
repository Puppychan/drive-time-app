import { FC } from 'react';
import {Text, StyleSheet, View } from "react-native";
import { Constant } from './Constant';

const LabelStyle = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 5,
    marginBottom: 10,
  },
  label: {
    fontSize: Constant.normalTextSize,
  },
  requiredSymbol: {
    color: 'red',
  }
});

interface LabelProps {
  label: string,
  required?: boolean,
}

export const Label : FC<LabelProps> = props => {
  return (
    <View style={LabelStyle.container}>
      <Text style={LabelStyle.label}>{props.label}</Text>
      {props.required && <Text style={LabelStyle.requiredSymbol}>*</Text>}
    </View>
  )
}