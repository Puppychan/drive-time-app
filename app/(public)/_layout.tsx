import { Slot, Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

export default function _layout() {
  return (
    <Stack >
      <Stack.Screen
        name="signin"
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="signup"
        options={{
          headerShown: true,
        }}
      />
    </Stack>
  )
}
