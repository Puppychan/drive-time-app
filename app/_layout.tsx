import { Stack, useRouter } from 'expo-router'

export default function _layout() {
  const router = useRouter()
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
        // options={{
        //   title: 'Register'
        // }}
      />
    </Stack>
  )
}
