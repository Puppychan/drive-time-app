import { Stack } from 'expo-router'

export default function _layout() {
  return (
    <Stack screenOptions={{}}>
      <Stack.Screen
        name="index"
        options={{
          title: 'Home'
        }}
      />
      <Stack.Screen
        name="(user)"
        options={{
          headerShown: false
        }}
      />
    </Stack>
  )
}
