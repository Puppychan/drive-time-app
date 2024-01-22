import { createStackNavigator } from '@react-navigation/stack'
import { useEffect, useRef } from 'react'
import { Image, StyleSheet, View } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import MapViewDirections from 'react-native-maps-directions'
import { useDispatch, useSelector } from 'react-redux'
import { Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');

import {
  selectDestination,
  selectIsLoading,
  selectIsRideSelectionVisible,
  selectOrigin,
  setTimeTravel
} from '@/src/slices/navSlice'

import LoadingBar from './FindingDriverScreen'
import RideSelectionCard from '../components/map-screen/RideSelectionCard'
import { getScreenSize } from '../common/helpers/default-device-value.helper'

const { width: screenWidth, height: screenHeight } = getScreenSize()
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
    if (!origin || !destination) return;
    const getTravelTime = async () => {
      fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${origin.description}&destinations=${destination.description}&key=${apiKey}`)
        .then((res) => res.json())
        .then((data) => {
          dispatch(setTimeTravel(data.rows[0].elements[0]))
        });
    }

    getTravelTime();
  }, [origin, destination, apiKey]);

  return (
    <View style={{height: screenHeight}}>
      <MapView
        ref={mapRef}
        mapType="mutedStandard"
        style={{
          height: isRideSelectionVisible ? 0.5 * height : height,
          width: width,
          minWidth: width,
        }}
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
          style={{ width: 100, height: 100, borderRadius: 50 }}
        >
          <View style={{ width: 100, alignItems: 'center', marginTop: 45, position: 'absolute' }}>

            {isLoading && (
              <View style={{ width: 50, height: 50, }}>
                <LoadingBar />
              </View>
            )}
            <View style={{ position: 'absolute' }}>
              <Image
                source={{
                  uri: 'https://creazilla-store.fra1.digitaloceanspaces.com/icons/3433523/marker-icon-md.png'
                }}
                style={{ width: 40, height: 40, justifyContent: 'center' }} // Adjust the size of the image inside the marker
                resizeMode="contain"
              />
            </View>
          </View>

        </Marker>

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
        <View style={{flex: 1,height: 500}}>
      <RideSelectionCard />
        </View>
    </View>
  )
}

export { MapScreen }