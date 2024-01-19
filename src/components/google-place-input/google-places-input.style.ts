import { StyleSheet } from 'react-native'
import { getScreenSize } from '@/src/common/helpers/default-device-value.helper'

const { width: screenWidth } = getScreenSize()
export const styles = StyleSheet.create({
  container: {
    width: screenWidth,
    height: '100%',
  },
  autocompleteContainer: {
    flex: 0,
    width: '80%',
    paddingTop: 5,
    paddingHorizontal: 10,
    flexDirection: 'row',
    // backgroundColor: 'red',
  },
  textInputContainer: {
    // marginBottom: 10
  },
  textInput: {
    fontSize: 16
  },
  predefinedPlacesDescription: {
    color: '#1faadb'
  },
  filterButton: {
    backgroundColor: '#DDDDDD',
    padding: 10,
    paddingHorizontal: 20,
    margin: 5,
    borderRadius: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  selectedButton: {
    backgroundColor: '#007BFF',
  },
  buttonText: {
    color: 'black',
  },
})
