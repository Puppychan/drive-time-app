// GooglePlacesInput.tsx
import { useNavigation } from '@react-navigation/native'
import { View } from 'react-native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch } from 'react-redux'

import { setOrigin, setDestination } from '@/src/slices/navSlice'

import { styles } from '../components/google-place-input/google-places-input.style' // Import the styles

const GooglePlacesInput = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch()

  return (
    <SafeAreaView style={styles.container}>
      {/* GooglePlacesAutocomplete for Origin */}
      <View style={styles.autocompleteContainer}>
        <GooglePlacesAutocomplete
          placeholder="Where From ..."
          query={{
            key: 'AIzaSyDgYL3Qv0aHXX3thFoyai6djprcF4Kla3M',
            language: 'en'
          }}
          onPress={(data, details = null) => {
            dispatch(
              setOrigin({
                location: details?.geometry?.location,
                description: data.description
              })
            )
            dispatch(setDestination(null))
          }}
          onFail={(error) => console.error('Autocomplete failed:', error)}
          nearbyPlacesAPI="GooglePlacesSearch"
          fetchDetails={true}
          styles={{
            textInputContainer: styles.textInputContainer,
            textInput: styles.textInput,
            predefinedPlacesDescription: styles.predefinedPlacesDescription
          }}
          enablePoweredByContainer={false}
        />
      </View>

      {/* GooglePlacesAutocomplete for Destination */}
      <View style={styles.autocompleteContainer}>
        <GooglePlacesAutocomplete
          placeholder="Where To ..."
          query={{
            key: 'AIzaSyDgYL3Qv0aHXX3thFoyai6djprcF4Kla3M',
            language: 'en'
          }}
          onPress={(data, details = null) => {
            dispatch(
              setDestination({
                location: details?.geometry?.location,
                description: data.description
              })
            )
            navigation.navigate('Map' as never)
          }}
          onFail={(error) => console.error('Autocomplete failed:', error)}
          nearbyPlacesAPI="GooglePlacesSearch"
          fetchDetails={true}
          styles={{
            flex: 0,
            textInputContainer: styles.textInputContainer,
            textInput: styles.textInput,
            predefinedPlacesDescription: styles.predefinedPlacesDescription
          }}
        />
      </View>
    </SafeAreaView>
  )
}

export { GooglePlacesInput }
