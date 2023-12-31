import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { setOrigin, setDestination } from 'slices/navSlice';
import { SafeAreaView } from 'react-native-safe-area-context';

const GooglePlacesInput = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  return (
    <SafeAreaView style={styles.container}>
  {/* GooglePlacesAutocomplete for Origin */}
  <View style={styles.autocompleteContainer}>
    <GooglePlacesAutocomplete
      placeholder="Where From ..."
      query={{
        key: 'AIzaSyBGfqCxvUaZabfEXBRa8O1Gz9VONrBaByY',
        language: 'en',
      }}
      onPress={(data, details = null) => {
        dispatch(
          setOrigin({
            location: details?.geometry?.location,
            description: data.description,
          })
        );
        dispatch(setDestination(null));
      }}
      nearbyPlacesAPI="GooglePlacesSearch"
      fetchDetails={true}
      styles={{
        textInputContainer: styles.textInputContainer,
        textInput: styles.textInput,
        predefinedPlacesDescription: styles.predefinedPlacesDescription,
      }}
      enablePoweredByContainer={false}
    />
  </View>

  {/* GooglePlacesAutocomplete for Destination */}
  <View style={styles.autocompleteContainer}>
    <GooglePlacesAutocomplete
      placeholder="Where To ..."
      query={{
        key: 'AIzaSyBGfqCxvUaZabfEXBRa8O1Gz9VONrBaByY',
        language: 'en',
      }}
      onPress={(data, details = null) => {
        dispatch(
          setDestination({
            location: details?.geometry?.location,
            description: data.description,
          })
        );
        navigation.navigate('Map' as never);
      }}
      nearbyPlacesAPI="GooglePlacesSearch"
      fetchDetails={true}
      styles={{
        flex:0,
        textInputContainer: styles.textInputContainer,
        textInput: styles.textInput,
        predefinedPlacesDescription: styles.predefinedPlacesDescription,
      }}
    />
  </View>
</SafeAreaView>

  );
};

const styles = StyleSheet.create({ 
  container: {
    flex: 1,
    paddingTop: 40,
    paddingLeft: 15,
    paddingRight: 60,
    backgroundColor: '#ecf0f1',
  },
  autocompleteContainer: {
    flex: 0,
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

export { GooglePlacesInput };
