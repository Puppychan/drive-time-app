import { Stack } from 'expo-router'

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
    </Stack>
  )
}
