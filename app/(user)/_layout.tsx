import { Stack, Tabs } from 'expo-router'

export default function _layout() {
  return (
    <Stack>
      <Stack.Screen
        name="signin"
        options={{
          title: 'Sign In',
          // This tab will no longer show up in the tab bar.
        }}
      />
      {/* <Tabs.Screen
        name="two"
        options={{
          headerTitle: 'Two',
          tabBarLabel: 'Two'
        }}
      />
      <Tabs.Screen
        name="posts"
        options={{
          headerTitle: 'Posts',
          tabBarLabel: 'Posts',
          headerShown: false
        }}
      /> */}
    </Stack>
  )
}
