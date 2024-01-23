import { router } from 'expo-router'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import { Button, Paragraph, Title } from 'react-native-paper'

import { useThemeColors } from '@/components/Colors'
import { AccountRole } from '@/lib/models/account.model'
import { DEFAULT_THEME } from '@/src/common/constants/default-value.constant'
import {
  INSTRUCTION_LIST,
  SHORT_INSTRUCTION_LIST
} from '@/src/common/constants/instruction-list.constant'
import { verticalLeftView } from '@/src/common/utils/custom-view.style'
import FullScreenCard from '@/src/components/cards/FullScreenCard'
import InstructionCard from '@/src/components/cards/InstructionCard'
import ServiceCard from '@/src/components/cards/ServiceCard'
import CircleIcon from '@/src/components/image/CircleIcon'
import SearchInput from '@/src/components/input/SearchInput'
import { useEffect, useState } from 'react'
import { auth } from '@/lib/firebase/firebase'
import { User } from 'firebase/auth'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Constant } from '@/components/Constant'
import { LocationObject } from 'expo-location';
import * as Location from "expo-location";
import { useDispatch } from 'react-redux'

const HomeScreen = () => {
  const colorsTheme = useThemeColors(DEFAULT_THEME)
  const [user, setUser] = useState<User | null>()
  const [role, setRole] = useState<string>(AccountRole.Customer)
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [location, setLocation] = useState<LocationObject | null>(null);
  const dispatch = useDispatch()

  useEffect(() => {
    const prepare = async () => {
      if (auth.currentUser) {
        setUser(auth.currentUser)
        let role = await AsyncStorage.getItem(Constant.USER_ROLE_KEY)
        setRole(role ?? AccountRole.Customer)
      }
    }
    prepare()

  }, [])

  const onClickHomeSection = () => {
    // navigation.navigate('Profile')
    router.replace(`/${role.toLowerCase()}/profile`)
  }

  const onClickSeeMore = (type: 'suggestion' | 'instruction') => { }

  const onClickExploreNearby = () => {
    router.push('/(user)/customer/nearby_place')
  }

  const onClickSuggestions = (index: number) => {
    router.push('/(user)/customer/book_driver')
  }

  const onClickInstruction = () => {
    // navigation.navigate(link)
    router.push('/(user)/customer/voucher')
  }

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync();
      // Update the type of location state
      dispatch(
        setCurrentLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        })
      )
      console.log("abcb", location)
      setLocation(location);
    })();
  }, []);
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.insideContainer}>
          <Title className='text-3xl p-4 pb-0 font-semibold'>Welcome, {user?.displayName ?? "User"}</Title>
          <SearchInput />

          <TouchableOpacity className='mx-4 bg-white border border-black/10 px-4 py-1 rounded-lg' onPress={onClickHomeSection}>
            <View className='flex flex-row gap-4 items-center'>
              <CircleIcon
                name="home"
                size={24}
                color={colorsTheme.background}
                backgroundColor={colorsTheme.opposite_bg}
              />

              <View style={{ ...verticalLeftView, flexGrow: 1 }}>
                <Title>Home</Title>
                <Paragraph>123 Main St</Paragraph>
              </View>
              <CircleIcon name="arrow-right" size={35} color={colorsTheme.opposite_bg} />
            </View>
          </TouchableOpacity>

          <View className='h-0.5 w-full bg-black/10' />

          <View className='px-4'>
            <FullScreenCard
              imageUrl={{ uri: 'https://source.unsplash.com/random?travel' }}
              title="Explore nearby"
              subtitle="Find the perfect ride for your next trip"
              onClick={onClickExploreNearby}
            />
          </View>


          <View style={styles.subsection}>
            <Title className='text-2xl px-2'>Suggestions</Title>
          </View>

          <View className='flex flex-row gap-2 px-8'>
            <ServiceCard
              iconImage={require('../../assets/normal.png')}
              title='Book Car'
              onClick={() => onClickSuggestions(1)}
            />
            <ServiceCard
              iconImage={require('../../assets/motorbike.png')}
              title='Book Motorbike'
              onClick={() => onClickSuggestions(2)}
            />
          </View>

          <View className='flex flex-row gap-2 px-8'>
            <ServiceCard
              iconImage={require('../../assets/reserve.png')}
              title='Reserve Trip'
              onClick={() => onClickSuggestions(3)}
            />
            <ServiceCard
              iconImage={require('../../assets/popular.png')}
              title='Popular Places'
              onClick={() => onClickSuggestions(4)}
            />
          </View>

          {/* Ways to plan with Uber */}
          <View className='mt-4 flex flex-row justify-between px-2'>
            <Title className='text-2xl px-2'>Instructions</Title>
            {/* Add see more if more than 4 instructions */}
            {INSTRUCTION_LIST.length > 4 && (
              <Button
                // title="See More"
                onPress={() => {
                  onClickSeeMore('instruction')
                }}
              >
                See More
              </Button>
            )}
          </View>

          <FlatList
            horizontal
            data={SHORT_INSTRUCTION_LIST}
            renderItem={({ item }) => (
              <InstructionCard
                imageUrl={{ uri: item.image }}
                title={item.name}
                subtitle={item.description}
                onClick={onClickInstruction}
              />
            )}
            keyExtractor={(item) => item.id}
            // You can add this line to remove the horizontal scrollbar
            showsHorizontalScrollIndicator={false}
            className='px-4'
          />

          {/* <View className='h-0.5 w-full mt-4 bg-black/10' /> */}
          {/* Discover Map */}
          {/* <Title>Around You</Title> */}
          {/* <View>
            <MapScreen/>
          </View> */}
          {/* <Image
            source={{
              uri: 'https://static.vecteezy.com/system/resources/previews/007/017/843/non_2x/abstract-polygon-world-map-illustration-geometric-structure-in-blue-color-for-presentation-booklet-website-and-other-design-projects-polygonal-background-free-vector.jpg'
            }}
            style={styles.planningImage}
          /> */}
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 25
  },
  insideContainer: {
    gap: 15,
    marginTop: 20,
    marginBottom: 50
  },
  welcome: {
    fontSize: 30,
    paddingBottom: 10
  },
  pickupCard: {
    margin: 10
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  subsection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10
  },
  planningImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 10,
    marginVertical: 10,
    shadowColor: '#202020',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 5
  },
  bottom: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0
  }
})

export default HomeScreen

