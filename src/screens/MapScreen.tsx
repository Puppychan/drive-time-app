import { useEffect, useRef, useState } from 'react'
import { Image, View } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import MapViewDirections from 'react-native-maps-directions'
import { useDispatch, useSelector } from 'react-redux'
import { Dimensions } from 'react-native';
import { CarRequest } from '@/lib/services/car-matching.service'
import { faker } from '@faker-js/faker'

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

import { addBooking } from '@/lib/services/booking.service'
import { Booking, BookingStatus } from '@/lib/models/booking.model'
import { auth, db } from '@/lib/firebase/firebase'
import { collection, getDocs, query, where, doc, writeBatch } from "firebase/firestore";
import { router } from 'expo-router'

interface Props {
  fallbackOption?: ItemType | null
  fallbackDriver: any | null
  onChat: (driverId: string | null, driver: any, option: any) => void
}

const MapScreen = ({ fallbackOption, fallbackDriver, onChat }: Props) => {
  const currentLocation = useSelector(selectCurrentLocation)

  const [cars, setCars] = useState([])

  const [option, setOption] = useState<ItemType | null>(fallbackOption || null)
  const [driverId, setDriverId] = useState<string | null>(fallbackDriver?.id || null)
  const [driver, setDriver] = useState<any | null>(fallbackDriver || null)
  const [isCall, setCall] = useState(false)

  const origin = useSelector(selectOrigin)
  const destination = useSelector(selectDestination)
  const isRideSelectionVisible = useSelector(selectIsRideSelectionVisible)
  const isLoading = useSelector(selectIsLoading)
  const mapRef = useRef<MapView | null>(null)
  const dispatch = useDispatch()

  const apiKey = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY
  const latitude = currentLocation?.coords.latitude ? currentLocation?.coords.latitude : 10.785255359834135;
  const longitude = currentLocation?.coords.longitude ? currentLocation?.coords.longitude : 106.6932718123096;
  let carRequest;

  // Generate Request

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

  useEffect(() => {
    if (driverId) {
      const checkInProgressBooking = async () => {
        const userId = auth.currentUser?.uid ?? '';

        const bookingCollection = collection(db, 'bookings');
        const q = query(
          bookingCollection,
          where("customerIdList", "array-contains", userId),
          where("status", "==", BookingStatus.InProgress)
        );
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
          const newBooking: Booking = {
            bookingId: faker.string.uuid(),
            customerIdList: [auth.currentUser?.uid ? auth.currentUser?.uid : ''],
            driverId: driverId,
            preScheduleTime: null,
            price: option?.amount ? (parseFloat(option?.amount.toFixed(2)) * 100) : 0,
            discountPrice: 0,
            voucherId: null,
            departure: origin?.description,
            destinationList: [destination?.description],
            status: BookingStatus.InProgress,
          };

          addBooking(newBooking);
        }
      };

      const fetchDriver = async () => {
        const driverCollection = collection(db, 'accounts');
        const q = query(
          driverCollection,
          where("userId", "==", driverId),
        );
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const driver = querySnapshot.docs[0].data();
          console.log("driver", driver)
          setDriver(driver);
        }
      };

      checkInProgressBooking();
      fetchDriver();
    }
  }, [driverId]);

  const handleBookingComplete = async () => {
    const userId = auth.currentUser?.uid ?? '';

    const bookingCollection = collection(db, 'bookings');
    const q = query(
      bookingCollection,
      where("customerIdList", "array-contains", userId),
      where("status", "==", BookingStatus.InProgress)
    );
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const batch = writeBatch(db);
      querySnapshot.docs.forEach((docSnapshot) => {
        const bookingRef = doc(bookingCollection, docSnapshot.id);
        batch.update(bookingRef, { status: BookingStatus.Success });
      });
      await batch.commit();
    }

    router.push("/(user)/customer/review")
  }

  return (
    <View className='h-screen relative'>
      {isRideSelectionVisible && <GooglePlacesInput />}
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
        {origin && destination && (
          <MapViewDirections
            origin={origin?.description}
            destination={destination?.description}
            strokeColor="blue"
            strokeWidth={5}
            apikey="AIzaSyCTsnUfX8EMXFzQmMPXJ-fBkqbzFOSFNps"
            onReady={(result) => {
              const coordinates = result.coordinates;
              if (coordinates.length > 0) {
                mapRef.current?.fitToCoordinates(coordinates, {
                  edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
                  animated: true
                });
              } else {
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
          />
        )}

        {origin?.location && (
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
                <View style={{ width: 50, height: 50 }}>
                  <LoadingBar />
                </View>
              )}
              <View style={{ position: 'absolute' }}>
                <Image
                  source={{
                    uri: 'https://creazilla-store.fra1.digitaloceanspaces.com/icons/3433523/marker-icon-md.png'
                  }}
                  style={{ width: 40, height: 40, justifyContent: 'center' }}
                  resizeMode="contain"
                />
              </View>
            </View>
          </Marker>
        )}

        {destination?.location && (
          <Marker
            coordinate={{
              latitude: destination.location.lat,
              longitude: destination.location.lng
            }}
            title="Destination"
            description="Destination"
            identifier="destination"
          />
        )}
      </MapView>

      {(driver) ?
        <View className='absolute p-6 bottom-32 inset-x-2 bg-white border border-black/10 rounded-xl'>
          <Text className='text-2xl' style={{ fontWeight: '700' }}>Meet up at the pick-up point</Text>
          <Text className='w-full bg-black/10 text-black p-4 rounded-lg mt-2' style={{ fontWeight: '700' }}>{origin.description}</Text>

          <View className='h-0.5 w-full bg-black/10 my-4' />

          <Text className='text-2xl mb-2' style={{ fontWeight: '700' }}>Your driver</Text>
          <View className='p-2 mb-4 border border-black/30 rounded-lg'>
            <View className='flex flex-row gap-2 justify-between'>
              <View>
                <Text className='text-2xl text-black' style={{ fontWeight: '900' }}>{driver?.firstName} {driver?.lastName}</Text>
                <Text className='text-lg mb-2 text-black' style={{ fontWeight: '900' }}>{driver?.transport?.name || 'Biege Toyota Camry'}{driver?.transport?.color ? ` • ${driver?.transport?.color}` : null}</Text>
              </View>
              <Text className='text-2xl text-black' style={{ fontWeight: '900' }}>5.0★</Text>
            </View>
            <View className='mt-2 flex flex-row gap-2 items-center'>
              <Text className='text-sm text-white bg-black px-4 py-2 rounded-full' style={{ fontWeight: '900' }}>Top-rated</Text>
              <Text className='text-sm text-white bg-black px-4 py-2 rounded-full' style={{ fontWeight: '900' }}>Professional</Text>
              <Text className='text-sm text-white bg-black px-4 py-2 rounded-full' style={{ fontWeight: '900' }}>Careful</Text>
            </View>
          </View>

          <View className='flex flex-row items-center'>
            <TouchableOpacity
              className='text-lg text-black bg-white border border-black/30 flex items-center justify-center flex-1 w-64 text-center px-4 py-2 rounded-lg'
              onPress={() => onChat(driverId, driver, option)}
            >
              <Text style={{ fontWeight: '900' }}>Chat with driver</Text>
            </TouchableOpacity>
            <View className='flex-1' />
            <TouchableOpacity className='text-lg w-20 flex items-center justify-center text-white border border-black/30 px-4 py-3 rounded-lg' style={{ fontWeight: '900' }}>
              <Image source={require('../../assets/ic_call.png')} style={{ width: 20, height: 20 }} />
            </TouchableOpacity>
          </View>

          <View className='h-0.5 w-full bg-black/10 my-4' />

          <View className='flex flex-row items-center'>
            {option?.amount && <PaymentScreen amount={(parseFloat(option?.amount.toFixed(2)) * 100)} />}
            <View className='w-3' />
            <TouchableOpacity onPress={handleBookingComplete} className='text-lg w-20 flex items-center justify-center border bg-black/10 border-black/30 px-4 py-3 rounded-lg' style={{ fontWeight: '900' }}>
              <Text className='text-black' style={{ fontWeight: '900' }}>Done</Text>
            </TouchableOpacity>
          </View>
        </View> : (origin && destination) ? isRideSelectionVisible ?
          <RideSelectionCard requests={requests} onRideSelected={({ option, driverId }) => { setOption(option); setDriverId(driverId); }} />
          : <View className='absolute p-6 bottom-32 inset-x-2 bg-white border border-black/10 rounded-xl'>
            <Text className='text-lg text-center' style={{ fontWeight: '700' }}>Searching for the best driver...</Text>
          </View>
          : null}
    </View>)
}

export { MapScreen }