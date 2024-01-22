import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(128, 128, 128, 0.1)',
    borderRadius: 15,
    width: '100%',
    marginTop: 10,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center' // Center vertically
  },
  textContainer: {
    flex: 1, // Take remaining space
    marginRight: 16 // Adjust spacing between text and icon
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5
  },
  footer: {
    fontSize: 16,
    opacity: 0.6,
    maxWidth: 260,
    flexWrap: 'wrap',
    textAlign: 'left'
  },
  icon: {
    width: 60,
    height: 60,
    resizeMode: 'cover'
  }
})
