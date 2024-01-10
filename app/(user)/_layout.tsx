import { Tabs } from 'expo-router'

export default function _layout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="signin"
        // options={{
        //   headerTitle: 'One',
        //   tabBarLabel: 'One'
        // }}
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
    </Tabs>
  )
}
