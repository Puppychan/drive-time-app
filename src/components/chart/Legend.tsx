import { View, TouchableOpacity, Text, StyleSheet, ActivityIndicator, Switch } from 'react-native'

interface LegendProps {
  text: string, color: any
}
export const DisplayLegend = (props: LegendProps) => {
  return (
    <View style={{ flexDirection: 'row', marginBottom: 12 }}>
      <View
        style={{
          height: 18,
          width: 18,
          marginRight: 10,
          borderRadius: 4,
          backgroundColor: props.color || 'white',
        }}
      />
      <Text>{props.text ?? ''}</Text>
    </View>
  );
};
