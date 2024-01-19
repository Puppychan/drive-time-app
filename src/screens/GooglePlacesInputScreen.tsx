// GooglePlacesInput.tsx
import { useNavigation } from '@react-navigation/native'
import { View, Image, ScrollView, TouchableOpacity, Text, FlatList } from 'react-native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch } from 'react-redux'

import { setOrigin, setDestination } from '@/src/slices/navSlice'

import { styles } from '../components/google-place-input/google-places-input.style' // Import the styles
import { useRouter } from 'expo-router'
import { useEffect, useState } from 'react'
import { Divider } from 'react-native-paper'

interface ButtonProps {
  buttonId: string
  label: string
}

const GooglePlacesInput = () => {
  const dispatch = useDispatch()
  const router = useRouter()

  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [historyLocation, setHistoryLocation] = useState<any[]>([])

  const handlePress = (buttonId: string) => {
    setSelectedOption(buttonId)
  }

  const renderButton = ({ buttonId, label }: ButtonProps) => (
    <TouchableOpacity
      key={buttonId}
      style={[
        styles.filterButton,
        selectedOption === buttonId && styles.selectedButton,
        { marginRight: 10 }
      ]}
      onPress={() => handlePress(buttonId)}
    >
      <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
  )

  const buttons: ButtonProps[] = [
    { buttonId: 'recent', label: 'Recent' },
    { buttonId: 'suggested', label: 'Suggested' },
    { buttonId: 'saved', label: 'Saved' }
  ]

  useEffect(() => {
    console.log('History Location Queue:', historyLocation)
  }, [historyLocation])

  // handle start destination
  const handleOrignPress = (data: any, details: any) => {
    dispatch(
      setOrigin({
        location: details?.geometry?.location,
        description: data.description
      })
    )
    setHistoryLocation((prevLocation) => [...prevLocation, { type: 'origin', data, details }])
    dispatch(setDestination(null))
    console.log('datal:', historyLocation)
  }
  // handle end destination
  const handleDestinationPress = (data: any, details: any) => {
    dispatch(
      setDestination({
        location: details?.geometry?.location,
        description: data.description
      })
    )
    router.push('./map')
    setHistoryLocation((prevLocation) => [...prevLocation, { type: 'destination', data, details }])
  }
  const handleQueue = () => {
    if (historyLocation.length > 0) {
      const [oldestSelection, ...remainningSelection] = historyLocation
      setHistoryLocation(remainningSelection)
      console.log('oldestSelection', oldestSelection)
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      {/* GooglePlacesAutocomplete for Origin */}
      <View>
        <View style={styles.autocompleteContainer}>
          <GooglePlacesAutocomplete
            placeholder="Where From ..."
            renderLeftButton={() => (
              <View style={{ width: 60, height: 60, paddingBottom: 10 }}>
                <Image
                  source={require('../../assets/degree.png')}
                  style={{ width: 60, height: 60 }}
                />
              </View>
            )}
            query={{
              key: 'AIzaSyCTsnUfX8EMXFzQmMPXJ-fBkqbzFOSFNps',
              language: 'en'
            }}
            onPress={(data, details = null) => handleOrignPress(data, details)}
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
            renderLeftButton={() => (
              <View style={{ width: 60, height: 60, alignItems: 'center', paddingTop: 14 }}>
                <Image
                  source={require('../../assets/record-button.png')}
                  style={{ width: 22, height: 22 }}
                />
              </View>
            )}
            query={{
              key: 'AIzaSyCTsnUfX8EMXFzQmMPXJ-fBkqbzFOSFNps',
              language: 'en'
            }}
            onPress={(data, details = null) => handleDestinationPress(data, details)}
            onFail={(error) => console.error('Autocomplete failed:', error)}
            nearbyPlacesAPI="GooglePlacesSearch"
            fetchDetails={true}
            styles={{
              flex: 0,
              textInputContainer: styles.textInputContainer,
              textInput: styles.textInput,
              predefinedPlacesDescription: styles.predefinedPlacesDescription
            }}
            enablePoweredByContainer={false}
          />
        </View>

        <FlatList
        data={historyLocation}
        keyExtractor={(item, index) => `${item.type}-${index}`}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={handleQueue}>
            <View>
              <Text>Data: {JSON.stringify(item.data)}</Text>
              <Text>Details: {JSON.stringify(item.details)}</Text>
              <Divider style={{ marginVertical: 10 }} />
            </View>
          </TouchableOpacity>
        )}
        ListHeaderComponent={
          <View style={{ flexDirection: 'row', marginHorizontal: 20, marginBottom: 10 }}>
            {buttons.map(renderButton)}
          </View>
        }
        ListEmptyComponent={<Text>No history items</Text>}
        nestedScrollEnabled={true}
      />
      </View>
    </SafeAreaView>
  )
}

export { GooglePlacesInput }
