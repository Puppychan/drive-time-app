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
    backgroundColor: '#e9e9e9',
    padding: 9,
    paddingHorizontal: 20,
    margin: 5,
    borderRadius: 15,
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

  filterImageButton: {
    borderColor: 'gray',
    padding: 10,
    borderRadius: 15,
    alignItems: 'center',
    // backgroundColor: '#e9e9e9',
    height: 100,
  },
  selectedImageButton: {
    borderColor: 'blue',
  },
  ImageButtonContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  borderImage: {
    width: 80,
    height: 80,
    marginBottom: 5,
  
    alignItems: 'center', // Center the content horizontally
    justifyContent: 'center', 
  },
  image: {
    width: 60, // Adjust the size as needed
    height: 60, // Adjust the size as needed
   
  },
  selectedImage: {
    borderColor: 'blue',
    borderWidth: 2,
    borderRadius: 40,
    width: 80, // Adjust the size as needed
    height: 80, // Adjust the size as needed
    marginBottom: 5,
    alignItems: 'center', // Center the content horizontally
    justifyContent: 'center', 
    
  },
  imageButtonText: {
    textAlign: 'center',
  },
})
