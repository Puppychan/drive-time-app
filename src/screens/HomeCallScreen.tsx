import { View, Text, Button, StyleSheet } from 'react-native'

type Props = {
  goToCallScreen: () => void
}

export const HomeScreen = ({ goToCallScreen }: Props) => {
  return (
    <View>
      <Text style={styles.text}>Test call</Text>
      <Button title="Join Video Call" onPress={goToCallScreen} />
    </View>
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#005fff'
  }
})
