import React from 'react'
import { View, StyleSheet, TextInput } from 'react-native'
import { IconButton } from 'react-native-paper'

const SearchInput = () => {
  return (
    <View style={styles.container}>
      <IconButton icon="magnify" style={styles.icon} />
      <TextInput placeholder="Where to?" style={styles.input} inlineImageLeft="search_icon" />
      <IconButton icon="clock-outline" style={styles.icon} />
      <IconButton icon="chevron-down" style={styles.icon} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 30,
    paddingHorizontal: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4
  },
  input: {
    flex: 1,
    paddingVertical: 8, // Adjust the height of the input
    paddingHorizontal: 10,
    fontSize: 16, // Adjust the font size as needed
    // Remove underline on Android
    borderBottomWidth: 0
  },
  icon: {
    margin: 0
  }
})

export default SearchInput
