import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
  ScrollView
} from 'react-native'
import React, { useEffect, useState } from 'react'
import NearByPlaceCard from '../components/nearby-place-card/nearby-place-card'
import GlobalAPI from '../../lib/services/nearby-place.service'
import { styles } from '../components/city-guide/city-guide.style'
import { getScreenSize } from '../common/helpers/default-device-value.helper'
import { store } from '@/store'
import { Provider, useSelector } from 'react-redux'

interface ButtonProps {
  buttonId: string
  label: string
}

interface ImageButtonProps {
  buttonId: string
  label: string
  image: ImageSourcePropType
}

interface Place {
  currentOpeningHours: {
    openNow: boolean;
    periods: any[]; // Update this based on the actual type of periods
    weekdayDescriptions: string[];
  };
  displayName: {
    languageCode: string;
    text: string;
  };
  formattedAddress: string;
  iconMaskBaseUri: string;
  photos: {
    authorAttributions: any[]; // Update this based on the actual type of authorAttributions
    heightPx: number;
    name: string;
    widthPx: number;
  }[];
  rating: number;
  types: string[];
  userRatingCount: number;
}

const buttons: ButtonProps[] = [
  { buttonId: 'Nearby', label: 'Nearby' },
  { buttonId: 'Promo', label: 'Promo' },
  { buttonId: 'Rating', label: 'Rating' },
  { buttonId: 'Recommended', label: 'Recommended' }
]

const imageButtons: ImageButtonProps[] = [
  {
    buttonId: 'convenience_store',
    label: 'Convinence Store',
    image: require('../../assets/convenience-store.png')
  },
  { buttonId: 'coffee_shop', label: 'Coffee Shop', image: require('../../assets/coffee-shop.png') },
  {
    buttonId: 'shopping_mall',
    label: 'Shopping Mall',
    image: require('../../assets/mall.png')
  },
  { buttonId: 'bar', label: 'Bar', image: require('../../assets/night-club.png') }
]

const { height: screenHeight } = getScreenSize()

const CityGuideScreen = () => {
  const [placeList, setPlaceList] = useState<Place[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  // const [selectedFilter, setSelectedFilter] = useState<string | null>(null)const [selectedFilter, setSelectedFilter] = useState<string[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string[]>([]);


  // find the nearest place from the current location
  useEffect(() => {
    GetNearBySearchPlaces()
  }, [])

  const GetNearBySearchPlaces = async () => {
    GlobalAPI.nearByPlace()
      .then((res) => {
        // console.log(JSON.stringify(res.data.places))
        console.log('res', res.data.places.length)
        setPlaceList(res.data.places)
      })
      .catch((err) => {
        console.log('err', err)
      })
  }

  const handlePress = (buttonId: string) => {
    setSelectedOption(buttonId)
    console.log('buttonId', buttonId)
    console.log('selectedFilter', selectedFilter)
    console.log('selectedFilter', placeList)
  }

  const handlePressFilter = (buttonId: string) => {
    if (selectedFilter.includes(buttonId)) {
      // If present, remove it
      setSelectedFilter((prevFilter) => prevFilter.filter((id) => id !== buttonId));
    } else {
      // If not present, add it
      setSelectedFilter((prevFilter) => [...prevFilter, buttonId]);
    }
    console.log('buttonId', buttonId)
    console.log('selectedFilter', selectedFilter)
  }
  const filterPlaces = () => {
    if (selectedFilter.length === 0) {
      return placeList;
    } else {
      return placeList.filter(place => place.types.some(type => selectedFilter.includes(type)));
    }
  };
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
      <View style={{ flexDirection: 'row' }}>
        {/* <Image
          source={require('../../assets/starRating.png')}
          style={{
            width: 12,
            height: 12,
            marginRight: 5 // Add margin to separate the image and text
          }}
        /> */}

        <Text style={styles.buttonText}>{label}</Text>
      </View>
    </TouchableOpacity>
  )
  const renderImageButton = ({ buttonId, label, image }: ImageButtonProps) => (
    <TouchableOpacity
      key={buttonId}
      style={[
        styles.filterImageButton,
        // selectedFilter === buttonId && styles.selectedImageButton,
        { marginRight: 10 }
      ]}
      onPress={() => handlePressFilter(buttonId)}
    >
      <View style={styles.ImageButtonContainer}>
        <View style={selectedFilter.includes(buttonId) ? styles.selectedImage : styles.borderImage}>
          {selectedFilter.includes(buttonId) && (
            <Image
              source={require('../../assets/check.png')}
              style={{
                position: 'absolute',
                top: 3,  // Adjust the top position as needed
                left: 57, // Adjust the left position as needed
                width: 15,
                height: 15,
                zIndex: 1, // Make sure the checkmark is above the main image
              }}
            />
          )}
          <Image
            source={image}
            // style={selectedOption === buttonId ? styles.selectedImage : styles.image}
            style={styles.image}
          />
        </View>
        <Text style={selectedFilter.includes(buttonId) ? styles.selectedImageButtonText : styles.imageButtonText}>{label}</Text>
      </View>
    </TouchableOpacity>
  )
  return (
    <View style={{ height: screenHeight }}>
      <View style={{ height: 120 }}>
        <ScrollView
          style={{ flexDirection: 'row', marginHorizontal: 12 }}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
        >
          {imageButtons.map(renderImageButton)}
        </ScrollView>
      </View>
      <View style={{ height: 50 }}>
        <ScrollView
          style={{ flexDirection: 'row', marginHorizontal: 12 }}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
        >
          {buttons.map(renderButton)}
        </ScrollView>
      </View>
      <FlatList
        data={filterPlaces()}
        renderItem={({ item, index }) => (
          <Provider store={store}>

            <NearByPlaceCard place={item} />
          </Provider>

        )}
        horizontal={false}
        style={{ height: 230, marginTop: 10 }}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}

export default CityGuideScreen
