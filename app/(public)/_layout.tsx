import { Stack } from 'expo-router'

const headerCustomStyle = {
  headerStyle: {
    backgroundColor: 'black',
  },
  headerTitleStyle: {
    color: 'white'
  },
  headerTintColor: 'white' // This will change the color of the back button
}
export default function _layout() {
  return (
    <Stack>
      <Stack.Screen
        name="signin"
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="signup"
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="aboutus"
        options={{
          headerShown: true,
          headerTitle: "About Us",
          headerBackVisible: true,
          ...headerCustomStyle
        }}
      />
    </Stack>
  )
}
