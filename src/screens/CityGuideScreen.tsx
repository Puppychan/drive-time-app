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
import { styles } from '../components/google-place-input/google-places-input.style'

interface ButtonProps {
  buttonId: string
  label: string
}

interface ImageButtonProps {
  buttonId: string
  label: string
  image: ImageSourcePropType
}

const buttons: ButtonProps[] = [
  { buttonId: 'recent', label: 'Recent' },
  { buttonId: 'suggested', label: 'Suggested' },
  { buttonId: 'saved', label: 'Saved' }
]

const imageButtons: ImageButtonProps[] = [
  {
    buttonId: 'convinence_store',
    label: 'Convinence Store',
    image: require('../../assets/car.png')
  },
  { buttonId: 'barber_shop', label: 'Barber Shop', image: require('../../assets/car.png') },
  { buttonId: 'coffee_shop', label: 'Coffee Shop', image: require('../../assets/car.png') },
  {
    buttonId: 'japanese_restaurant',
    label: 'Japanese Restaurant',
    image: require('../../assets/car.png')
  },
  { buttonId: 'bar', label: 'Bar', image: require('../../assets/car.png') }
]

const CityGuideScreen = () => {
  const [placeList, setPlaceList] = useState([])
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null)

  // find the nearest place from the current location
  useEffect(() => {
    GetNearBySearchPlaces()
  }, [])

  const GetNearBySearchPlaces = async () => {
    GlobalAPI.nearByPlace()
      .then((res) => {
        // console.log(JSON.stringify(res.data.places))
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
  }
  const handlePressFilter = (buttonId: string) => {
    setSelectedFilter(buttonId)
    console.log('buttonId', buttonId)
    console.log('selectedFilter', selectedFilter)
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
      <View style={{ flexDirection: 'row' }}>
        <Image
          source={require('../../assets/starRating.png')}
          style={{
            width: 12,
            height: 12,
            marginRight: 5 // Add margin to separate the image and text
          }}
        />

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
        <View style={selectedFilter === buttonId ? styles.selectedImage : styles.borderImage}>
          <Image
            source={image}
            // style={selectedOption === buttonId ? styles.selectedImage : styles.image}
            style={styles.image}
          />
        </View>
        <Text style={styles.imageButtonText}>{label}</Text>
      </View>
    </TouchableOpacity>
  )
  return (
    <View>
      <View style={{ height: 120 }}>
        <ScrollView
          style={{ flexDirection: 'row', marginHorizontal: 12 }}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
        >
          {imageButtons.map(renderImageButton)}
        </ScrollView>
      </View>
      <View style={{ flexDirection: 'row', marginHorizontal: 12 }}>
        {buttons.map(renderButton)}
      </View>
      <FlatList
        data={placeList}
        renderItem={({ item, index }) => (
          <View>
            <NearByPlaceCard place={item} />
          </View>
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
