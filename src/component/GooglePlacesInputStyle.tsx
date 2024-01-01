import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingLeft: 15,
    paddingRight: 60,
    backgroundColor: '#ecf0f1',
  },
  autocompleteContainer: {
    flex: 0, // Consider using flex: 1 if you want the autocomplete boxes to take up all available space
    paddingTop: 5,
    flexDirection: 'row', // or 'column' based on your design preference
  },
  textInputContainer: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    marginBottom: 10,
  },
  textInput: {
    fontSize: 16,
  },
  predefinedPlacesDescription: {
    color: '#1faadb',
  },
});