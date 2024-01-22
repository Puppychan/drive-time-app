import { Stack } from 'expo-router'

export default function _layout() {
  return (
    <Stack>
      <Stack.Screen
        name="chat"
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="profile"
        options={{
          headerShown: false
        }}
      />
    </Stack>
  )
}
