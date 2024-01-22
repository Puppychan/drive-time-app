import { useEffect, useRef } from 'react'
import { Image, View } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import MapViewDirections from 'react-native-maps-directions'
import { useDispatch, useSelector } from 'react-redux'
import { Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');

import {
  selectDestination,
  selectIsLoading,
  selectOrigin,
  setTimeTravel
} from '@/src/slices/navSlice'

import LoadingBar from './FindingDriverScreen'
import RideSelectionCard from '../components/map-screen/RideSelectionCard'
import { GooglePlacesInput } from './GooglePlacesInputScreen'

const MapScreen = () => {
  const origin = useSelector(selectOrigin)
  const destination = useSelector(selectDestination)
  const isLoading = useSelector(selectIsLoading)
  const mapRef = useRef<MapView | null>(null)
  const dispatch = useDispatch()

  const apiKey = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY

  useEffect(() => {
    const getTravelTime = async () => {
      fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${origin?.description || 'RMIT University Vietnam - Saigon South campus'}&destinations=${destination?.description || 'Crescent Mall, Đường Tôn Dật Tiên, Khu đô thị Phú Mỹ Hưng'}&key=${apiKey}`)
        .then((res) => res.json())
        .then((data) => {
          dispatch(setTimeTravel(data.rows[0].elements[0]))
        });
    }

    getTravelTime();
  }, [origin, destination, apiKey]);

  return (
    <View className='h-screen relative'>
      <GooglePlacesInput />
      <MapView
        ref={mapRef}
        // mapType="mutedStandard"
        style={{
          height: (origin && destination) ? 0.4 * height : height,
          width: width,
          minWidth: width,
        }}
        initialRegion={{
          latitude: destination?.location?.lat || 10.7289515,
          longitude: destination?.location?.lng || 106.6957667,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005
        }}
      >
        {origin && destination && <MapViewDirections
          origin={origin?.description}
          destination={destination?.description}
          strokeColor="blue"
          strokeWidth={5}
          apikey="AIzaSyCTsnUfX8EMXFzQmMPXJ-fBkqbzFOSFNps"
          onReady={(result) => {
            // Get the coordinates of the direction
            const coordinates = result.coordinates;
            if (coordinates.length > 0) {
              mapRef.current?.fitToCoordinates(coordinates, {
                edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
                animated: true
              });
            } else {
              // Set random position as the center of the map
              const randomLatitude = Math.random() * 180 - 90;
              const randomLongitude = Math.random() * 360 - 180;
              mapRef.current?.animateToRegion({
                latitude: randomLatitude,
                longitude: randomLongitude,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005
              });
            }
          }}
        />}

        {origin?.location ? <Marker
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
        </Marker> : null}

        {destination?.location ? <Marker
          coordinate={{
            latitude: destination.location.lat,
            longitude: destination.location.lng
          }}
          title="Destination"
          description="Destination"
          identifier="destination"
        /> : null}
      </MapView>
      {(origin && destination) ? <RideSelectionCard /> : null}
    </View>
  )
}

export { MapScreen }