import { Stack } from 'expo-router'

export default function _layout() {
  return (
    <Stack>
      <Stack.Screen
        name="signin"
        options={{
          title: 'Sign In'
        }}
      />
    </Stack>
  )
}
