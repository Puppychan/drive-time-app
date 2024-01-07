import { createStackNavigator } from '@react-navigation/stack'
import { useEffect, useRef } from 'react'
import { StyleSheet, View } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import MapViewDirections from 'react-native-maps-directions'
import { useDispatch, useSelector } from 'react-redux'

import {
  selectDestination,
  selectIsLoading,
  selectIsRideSelectionVisible,
  selectOrigin,
  setTimeTravel
} from '@/src/slices/navSlice'

import LoadingBar from './FindingDriverScreen'
import RideSelectionCard from '../components/map-screen/RideSelectionCard'

const MapScreen = () => {
  const origin = useSelector(selectOrigin)
  const destination = useSelector(selectDestination)
  const isRideSelectionVisible = useSelector(selectIsRideSelectionVisible)
  const isLoading = useSelector(selectIsLoading)
  const mapRef = useRef<MapView | null>(null)
  const dispatch = useDispatch()
  const Stack = createStackNavigator()

  const apiKey = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY

  useEffect(() => {
    if (!origin || !destination) return
    const getTravelTime = async () => {
      fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?
        units=imperial
        &origins=${origin.description}
        &destinations=${destination.description}
        &key=${apiKey}`)
        .then((res) => res.json())
        .then((data) => {
          dispatch(setTimeTravel(data.rows[0].elements[0]))
        })
    }

    getTravelTime()
  }),
    [origin, destination, apiKey]

  return (
    <View style={{ flex: 1 }}>
      <MapView
        ref={mapRef}
        mapType="mutedStandard"
        style={{ minHeight: isRideSelectionVisible ? '50%' : '100%', minWidth:'100%'}}
        initialRegion={{
          latitude: destination.location.lat,
          longitude: destination.location.lng,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005
        }}
      >
        {origin &&
          destination &&
          (isRideSelectionVisible ? (
            <MapViewDirections
              origin={origin.description}
              destination={destination.description}
              strokeColor="blue"
              strokeWidth={5}
              apikey="AIzaSyCTsnUfX8EMXFzQmMPXJ-fBkqbzFOSFNps"
              onReady={(result) => {
                // Get the coordinates of the direction
                const coordinates = result.coordinates
                mapRef.current?.fitToCoordinates(coordinates, {
                  edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
                  animated: true
                })
              }}
            />
          ) : (
            // Your else content goes here
            mapRef.current?.fitToSuppliedMarkers(['origin'], {
              edgePadding: { top: 100, right: 100, bottom: 100, left: 100 },
              animated: true
            })
          ))}

        <Marker
          coordinate={{
            latitude: origin.location.lat,
            longitude: origin.location.lng
          }}
          title="Origin"
          description="Origin Location"
          identifier="origin"
        />

        <Marker
          coordinate={{
            latitude: destination.location.lat,
            longitude: destination.location.lng
          }}
          title="Destination"
          description="Destination"
          identifier="destination"
        />
      </MapView>

      {isLoading && (
        <View style={styles.loadingContainer}>
          <LoadingBar />
        </View>
      )}

      <View style={{height: isRideSelectionVisible ? '50%' : '0%',width:'100%'}}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false
          }}
        >
          <Stack.Screen name="RideSelection" component={RideSelectionCard} />
        </Stack.Navigator>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center' // Adjust the background color and opacity as needed
  }
})

export { MapScreen }
