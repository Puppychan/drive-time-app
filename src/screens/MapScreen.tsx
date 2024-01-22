import { useEffect, useRef, useState } from 'react'
import { Image, View } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import MapViewDirections from 'react-native-maps-directions'
import { useDispatch, useSelector } from 'react-redux'
import { Dimensions } from 'react-native';
import { CarRequest } from '@/lib/services/car-matching.service'

const { height, width } = Dimensions.get('window');

import {
  selectCurrentLocation,
  selectDestination,
  selectIsLoading,
  selectIsRideSelectionVisible,
  selectOrigin,
  setTimeTravel
} from '@/src/slices/navSlice'

import LoadingBar from './FindingDriverScreen'
import RideSelectionCard, { ItemType } from '../components/map-screen/RideSelectionCard'
import { GooglePlacesInput } from './GooglePlacesInputScreen'
import { Text } from 'react-native-paper'
import { PaymentScreen } from './StripePaymentScreen'
import { TouchableOpacity } from 'react-native-gesture-handler'

interface Props {
  onChat: () => void
}

const MapScreen = ({ onChat }: Props) => {
  const currentLocation = useSelector(selectCurrentLocation)

  const [option, setOption] = useState<ItemType | null>(null)
  const [driverId, setDriverId] = useState<string | null>(null)

  const origin = useSelector(selectOrigin)
  const destination = useSelector(selectDestination)
  const isRideSelectionVisible = useSelector(selectIsRideSelectionVisible)
  const isLoading = useSelector(selectIsLoading)
  const mapRef = useRef<MapView | null>(null)
  const dispatch = useDispatch()

  const apiKey = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY

  const requests: CarRequest[] = [
    {
      pickup: {
        id: 'P1',
        x: origin?.location?.lat || 10.785255359834135,
        y: origin?.location?.long || 106.6932718123096
      },
      delivery: {
        id: 'D1',
        x: destination?.location?.lat || 10.7289515,
        y: destination?.location?.long || 106.6957667
      }
    },
  ]

  // const cars: Car[] = [
  //   { id: 'C1', mLocation: { id: 'C1', x: 10.7769, y: 106.7009 } },  // Example coordinates for District 1, Ho Chi Minh City
  //   { id: 'C2', mLocation: { id: 'C2', x: 10.7778, y: 106.6974 } },  // Example coordinates for District 1, Ho Chi Minh City
  //   { id: 'C3', mLocation: { id: 'C3', x: 10.7755, y: 106.6962 } },  // Example coordinates for District 1, Ho Chi Minh City
  //   { id: 'C4', mLocation: { id: 'C4', x: 10.7770, y: 106.6950 } }   // Example coordinates for District 1, Ho Chi Minh City
  // ];

  useEffect(() => {
    if (!origin || !destination) return;

    const getTravelTime = async () => {
      fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${origin?.description || 'RMIT University Vietnam - Saigon South campus'}&destinations=${destination?.description || 'Crescent Mall, Đường Tôn Dật Tiên, Khu đô thị Phú Mỹ Hưng'}&key=${apiKey}`)
        .then((res) => res.json())
        .then((data) => {
          dispatch(setTimeTravel(data.rows[0].elements[0]))
        });
    }
    console.log("origin", currentLocation)
    getTravelTime();
  }, [origin, destination, apiKey]);

  return (
    <View className='h-screen relative'>
      {isRideSelectionVisible ? <GooglePlacesInput /> : null}
      <MapView
        ref={mapRef}
        style={{
          height: (origin && destination && isRideSelectionVisible) ? 0.4 * height : height,
          width: width,
          minWidth: width,
        }}
        initialRegion={{
          latitude: destination?.location?.lat || 10.7289515,
          longitude: destination?.location?.lng || 106.6957667,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05
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

      {(origin && destination) ? isRideSelectionVisible ?
        <RideSelectionCard requests={requests} onRideSelected={({ option, driverId }) => { setOption(option); setDriverId(driverId); }} /> :
        driverId ?
          <View className='absolute p-6 bottom-32 inset-x-2 bg-white border border-black/10 rounded-xl'>
            <Text className='text-2xl' style={{ fontWeight: '700' }}>Meet up at the pick-up point</Text>
            <Text className='w-full bg-black/10 text-black p-4 rounded-lg mt-2' style={{ fontWeight: '700' }}>{origin.description}</Text>

            <View className='h-0.5 w-full bg-black/10 my-4' />

            <Text className='text-2xl mb-2' style={{ fontWeight: '700' }}>Your driver</Text>
            <View className='p-2 mb-4 border border-black/30 rounded-lg'>
              <View className='flex flex-row gap-2 justify-between'>
                <View>
                  <Text className='text-2xl text-black' style={{ fontWeight: '900' }}>Võ Hoàng Phúc</Text>
                  <Text className='text-lg mb-2 text-black' style={{ fontWeight: '900' }}>Biege Toyota Camry</Text>
                </View>
                <Text className='text-2xl text-black' style={{ fontWeight: '900' }}>5.0★</Text>
              </View>
              <View className='mt-2 flex flex-row gap-2 items-center'>
                <Text className='text-sm text-white bg-black px-4 py-2 rounded-full' style={{ fontWeight: '900' }}>Top-rated</Text>
                <Text className='text-sm text-white bg-black px-4 py-2 rounded-full' style={{ fontWeight: '900' }}>Professional</Text>
                <Text className='text-sm text-white bg-black px-4 py-2 rounded-full' style={{ fontWeight: '900' }}>Careful</Text>
              </View>
            </View>

            <View className='flex flex-row items-center gap-2'>
              <TouchableOpacity
                onPress={onChat}
                className='text-lg text-black bg-white border border-black/30 flex-1 text-center px-4 py-2 rounded-lg' style={{ fontWeight: '900' }}><Text>Chat with driver</Text></TouchableOpacity>
              <Text className='text-lg text-white border border-black/30 px-4 py-2 rounded-lg' style={{ fontWeight: '900' }}>
                <Image source={require('../../assets/ic_call.png')} style={{ width: 20, height: 20 }} />
              </Text>
            </View>

            <View className='h-0.5 w-full bg-black/10 my-4' />
            <PaymentScreen />
          </View>
          : <View className='absolute p-6 bottom-32 inset-x-2 bg-white border border-black/10 rounded-xl'>
            <Text className='text-lg text-center' style={{ fontWeight: '700' }}>Searching for the best driver...</Text>
          </View>
        : null}
    </View>
  )
}

export { MapScreen }