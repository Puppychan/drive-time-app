import { TextInput, View, Text, StyleSheet } from "react-native";
import { Colors } from "./ThemeColors";
import { useState, FC } from 'react';
import { Label } from "./Label";
import { Constant } from "./Constant";


const InputStyle = StyleSheet.create({
  container: {
    flexDirection: 'column',
    width: "100%"
  },
  input: {
    borderColor: Colors.silver,
    borderWidth: 1, 
    borderRadius: 3,  
    backgroundColor:'#FFFFFF',
    height: Constant.inputHeight,
    padding: 10,
    fontSize: Constant.normalTextSize,
  },
  onFocus: {
    borderColor:Colors.primary,
  }
});

interface TextInputProps {
  label? : string, 
  placeHolder?: string,
  value?,
  required? : boolean
  type?,
  editable? : boolean,
  secureTextEntry?,
  onChangeText?,
}

export const Input : FC<TextInputProps> = props => {
  const {label, placeHolder, value, required, type, editable, secureTextEntry, onChangeText} = props
  const [isFocused, setIsFocused] = useState(false);
  return (
    <View style={InputStyle.container}>
      {label && <Label label={label} required={required}></Label>}
      <TextInput style={[InputStyle.input, isFocused && InputStyle.onFocus]}
        placeholder={placeHolder}
        value={value}
        editable={editable}
        secureTextEntry={secureTextEntry}
        onChangeText={onChangeText}
        underlineColorAndroid='transparent'
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </View>
  )

};