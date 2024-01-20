import { Stack } from 'expo-router'
import React from 'react'

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
      <Stack.Screen
        name="(public)"
        options={{
          headerShown: false
        }}
      />
    </Stack>
  )
}
