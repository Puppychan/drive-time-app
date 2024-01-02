import { View, Text, StyleSheet } from "react-native";
import { Picker } from '@react-native-picker/picker';
import { FC } from 'react';
import { Label } from "./Label";
import { Constant } from "./Constant";

const DropDownStyle = StyleSheet.create({
  container: {
    flexDirection: 'column',
    width: "100%"
  },
  picker: {
    width:'100%',
    height: Constant.inputHeight,
    fontSize: Constant.normalTextSize,
    // backgroundColor:'gray',
    // color:'white',
  },
});

interface DropDownItem {
  label: string,
  value: any
}

interface DropDownProps {
  label? : string, 
  options? : DropDownItem[],
  required?: boolean,
  selectedValue? : any,
  setSelectedValue? : any,

}

export const AppDropDown : FC<DropDownProps> = props => {
  const {label, options, required, selectedValue, setSelectedValue} = props;
  return (
    <View style={DropDownStyle.container}>
      {label && <Label label={label} required={required}></Label>}
      <View>
        <Picker style={DropDownStyle.picker}
          selectedValue={selectedValue}
          onValueChange={(value) => setSelectedValue(value)}
          mode={'dropdown'}
        >
          {
            options?.map(item => 
              <Picker.Item
                label={item.label} 
                key={item.label} 
                value={item.value}/>
            )
          }

        </Picker>

      </View>
    </View>
  )

};