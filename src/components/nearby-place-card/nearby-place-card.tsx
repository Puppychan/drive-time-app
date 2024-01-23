import { View, Text, Image, StyleSheet, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import GlobalAPI from '../../../lib/services/nearby-place.service'
import { getDistanceAndTime, getDistanceAndTimeNearby } from "../../../lib/services/google.maps.service"
import { selectCurrentLocation } from '@/src/slices/navSlice'
import { Provider, useSelector } from 'react-redux'
import { mLocation, spot } from '@/lib/services/car-matching.service'
import { store } from '@/store'
import { LocationObject, LocationObjectCoords } from 'expo-location'

interface currentLocation {
  coords: mLocation
}
interface nearbyPlace {
  location: mLocation
}

const { height, width } = Dimensions.get('screen')
const NearByPlaceCard = ({ place }: { place: any }) => {
  const PLACE_IMAGE = 'https://places.googleapis.com/v1/'

  // Check if place and place.photos are defined before accessing properties
  const imageUrl = place?.photos?.[0]?.name
    ? PLACE_IMAGE +
    place.photos[0].name +
    '/media?key=' +
    GlobalAPI.API_KEY +
    '&maxHeightPx=800&maxWidthPx=1200'
    : null
  // console.log(place.formattedAddress)
  const currentLocation = useSelector(selectCurrentLocation)

  const apiKey = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY ? process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY : ''
  const [distance, setDistance] = useState<number | null>(null);
  const [duration, setDuration] = useState<number | null>(null);
  // console.log("hehe",place.location)
  // console.log("hoho",currentLocation)
  const fromGo = currentLocation ? currentLocation.coords : { latitude: 10.7496882, longitude: 106.5596077, accuracy: 0, altitude: 0, altitudeAccuracy: 0, heading: 0, speed: 0 }

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       if (currentLocation) {
  //         const result = await getDistanceAndTimeNearby(fromGo, place.location, apiKey);
  //         console.log('Current Location:', currentLocation);
  //         console.log('Distance:', result.distance);
  //         console.log('Duration:', result.duration);
  //         setDistance(parseFloat(result.distance));
  //         setDuration(parseFloat(result.duration));
  //       }
  //     } catch (error) {
  //       console.error('Error fetching distance and time:', error);
  //     }
  //   };
  
  //   fetchData();
  // }, [currentLocation]);  // Only include currentLocation if it's expected to change
  
  return (
    <View style={styles.wrapper}>
      <Image
        source={imageUrl ? { uri: imageUrl } : require('../../../assets/car.png')}
        style={{
          width: 110,
          height: 110,
          borderRadius: 10
        }}
      />
      <View style={{ paddingHorizontal: 10 }}>
        <View style={{ alignItems: 'flex-start' }}>
          <Text
            style={{
              textTransform: 'uppercase',
              fontWeight: 'bold'
              // paddingBottom: 10
            }}
          >
            {place.displayName.text}
          </Text>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 3 }}>
          <Image
            source={require('../../../assets/starRating.png')}
            style={{
              width: 12,
              height: 12
            }}
          />
          <View style={{ marginLeft: 5, flexDirection: 'row', alignItems: 'center' }}>
            <Text>{place.rating} </Text>
            <Text style={{ color: 'gray' }}>({place.userRatingCount})</Text>
            <Text> - </Text>
            <Text style={{ color: 'gray', maxWidth: 157 }} numberOfLines={1} ellipsizeMode="tail">
              {place.types.map((type: any, index: any) => {
                // Remove underscores and capitalize each word
                const formattedType = type
                  .replace(/_/g, ' ')
                  .replace(/\b\w/g, (c: any) => c.toUpperCase())
                return index === place.types.length - 1 ? formattedType : `${formattedType}, `
              })}
            </Text>
          </View>
        </View>

        <Text style={{ color: 'gray', maxWidth: 250, fontSize: 13 }} numberOfLines={1} ellipsizeMode="tail">
          {place.formattedAddress}
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5, marginTop: 5 }}>
          <Text
            style={{
              textTransform: 'uppercase',
              fontWeight: 'bold',
              color: place.currentOpeningHours?.openNow ? 'green' : 'red',
              fontSize: 12,
            }}
          >
            {place.currentOpeningHours?.openNow ? 'Open' : 'Closed'}
          </Text>
          <Image
            source={require('../../../assets/location-pin.png')}
            style={{
              width: 11,
              height: 11,
              marginLeft: 8,
              marginRight: 3
            }}
          />
          <Text style={{ fontSize: 12 }}>2.3 km</Text>
          <View
            style={{
              height: 3,
              width: 3,
              backgroundColor: 'black',
              borderRadius: 7,
              marginLeft: 5,
              marginRight: 5
            }}
          ></View>
          <Text style={{ fontSize: 12 }}>20 mins</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <View
            style={{
              borderWidth: 1,
              borderColor: '#bdbdbd',
              padding: 5,
              borderRadius: 8,
              width: 100,
              flexDirection: 'row',
              alignItems: 'center',
              marginRight: 5
            }}
          >
            <Image
              source={require('../../../assets/starRating.png')}
              style={{
                width: 12,
                height: 12,
                marginRight: 5 // Add margin to separate the image and text
              }}
            />
            <Text
              style={{ fontWeight: 'bold', fontSize: 12, color: 'black', maxWidth: 80 }}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              20% discount in Circle K
            </Text>
          </View>

          <View
            style={{
              borderWidth: 1,
              borderColor: '#bdbdbd',
              padding: 5,
              borderRadius: 8,
              width: 100,
              flexDirection: 'row',
              alignItems: 'center' // Align items vertically in the center
            }}
          >
            <Image
              source={require('../../../assets/starRating.png')}
              style={{
                width: 12,
                height: 12,
                marginRight: 5 // Add margin to separate the image and text
              }}
            />
            <Text
              style={{ fontWeight: 'bold', fontSize: 12, color: 'black', maxWidth: 80 }}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              20% discount in Circle K
            </Text>
          </View>
        </View>
      </View>
    </View>

  )
}

export default NearByPlaceCard

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginVertical: 15
  }
})
