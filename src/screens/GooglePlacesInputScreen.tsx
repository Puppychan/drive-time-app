import { View } from 'react-native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { useDispatch, } from 'react-redux'
import { setOrigin, setDestination, } from '@/src/slices/navSlice'
import { useRouter } from 'expo-router'

const GooglePlacesInput = () => {
  const dispatch = useDispatch()
  const router = useRouter()


  return (
    <View className='mt-4 absolute top-0 inset-x-0 z-50'>
      <View className='flex flex-row mx-4'>
        <GooglePlacesAutocomplete
          placeholder="Where from?"
          query={{
            key: 'AIzaSyCTsnUfX8EMXFzQmMPXJ-fBkqbzFOSFNps',
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
          enablePoweredByContainer={false}
        />
      </View>

      <View className='flex flex-row mx-4'>
        <GooglePlacesAutocomplete
          placeholder="Where to?"
          query={{
            key: 'AIzaSyCTsnUfX8EMXFzQmMPXJ-fBkqbzFOSFNps',
            language: 'en'
          }}
          onPress={(data, details = null) => {
            dispatch(
              setDestination({
                location: details?.geometry?.location,
                description: data.description
              })
            )
            router.push('./map')
          }}
          onFail={(error) => console.error('Autocomplete failed:', error)}
          nearbyPlacesAPI="GooglePlacesSearch"
          fetchDetails={true}
          enablePoweredByContainer={false}
        />
      </View>
    </View>
  )
}

export { GooglePlacesInput }