import { useNavigation, router } from 'expo-router'
import { Image, StyleSheet, ToastAndroid, TouchableOpacity, View } from 'react-native'
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import { Appbar, Button, Paragraph, Title } from 'react-native-paper'

import { useThemeColors } from '@/components/Colors'
import { generateRandomAccounts } from '@/lib/data/generate-account.data'
import { AccountRole } from '@/lib/models/account.model'
import { DEFAULT_THEME } from '@/src/common/constants/default-value.constant'
import {
  INSTRUCTION_LIST,
  SHORT_INSTRUCTION_LIST
} from '@/src/common/constants/instruction-list.constant'
import { SUGGESTION_LIST } from '@/src/common/constants/suggestion-list.constant'
import { horizontalLeftView, verticalLeftView } from '@/src/common/utils/custom-view.style'
import FullScreenCard from '@/src/components/cards/FullScreenCard'
import InstructionCard from '@/src/components/cards/InstructionCard'
import ServiceCard from '@/src/components/cards/ServiceCard'
import CircleIcon from '@/src/components/image/CircleIcon'
import SearchInput from '@/src/components/input/SearchInput'

import ReviewScreen from './ReviewScreen'
import { CustomButton } from '../components/button/Buttons'
import { HorizontalDivider } from '../components/divider/HorizontalDivider'
import { Driver } from '../../lib/models/driver.model'
import { Transport, TransportColor, TransportType } from '../../lib/models/transport.model'

// TODO: change to dynamic later
const homeInfo = '123 Main St'
const usernameInfo = 'John Doe'

const HomeScreen = () => {
  const navigation = useNavigation()
  const colorsTheme = useThemeColors(DEFAULT_THEME)

  const onClickHomeSection = () => {
    // navigation.navigate('Profile')
    router.push('/driver/register/driver-profile')
  }

  const onClickSeeMore = (type: 'suggestion' | 'instruction') => {}

  const onClickExploreNearby = () => {
    router.push('/(user)/customer/nearby_place')
  }

  const onClickSuggestions = () => {
    router.push('/(user)/customer/nearby_place')
  }

  const onClickInstruction = () => {
    // navigation.navigate(link)
    router.push('/(user)/customer/voucher')
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.insideContainer}>
          <Title style={styles.welcome}>Welcome, {usernameInfo}</Title>

          <SearchInput />

          {/* Home section */}
          <TouchableOpacity onPress={onClickHomeSection}>
            <View style={{ ...horizontalLeftView, gap: 15 }}>
              {/* <MaterialIcons name="home" size={24} color="black" /> */}
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

          {/* Recent card */}

          {/* <CustomButton
            title="Register Driver"
            onPress={() => {
              router.push('/driver/register')
            }} */}

          <Button
            onPress={() => {
              router.push('/driver/register')
            }}
          >
            Register Driver
          </Button>

          {/* Explore Nearby Card */}
          <FullScreenCard
            imageUrl={{ uri: 'https://source.unsplash.com/random?travel' }}
            title="Explore nearby"
            subtitle="Find the perfect ride for your next trip"
            onClick={onClickExploreNearby}
          />

          {/* Divider */}
          <HorizontalDivider height={7} {...{ marginVertical: 10 }} />

          {/* Suggestions */}
          <View style={styles.subsection}>
            <Title>Suggestions</Title>
            {/* Add see more if more than 4 suggestions */}
            {SUGGESTION_LIST.length > 4 && (
              <Button
                // title="See More"
                onPress={() => {
                  onClickSeeMore('suggestion')
                }}
              >
                See More
              </Button>
            )}
          </View>
          <FlatList
            horizontal
            data={SUGGESTION_LIST}
            renderItem={({ item, index }) => (
              <ServiceCard
                // iconImage={suggestionImages[index]}
                iconImage={item.iconImage}
                title={item.name}
                onClick={onClickSuggestions}
              />
            )}
            ItemSeparatorComponent={() => <View style={{ width: 20 }} />} // Gap width
            keyExtractor={(item) => item.id}
            // You can add this line to remove the horizontal scrollbar
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingRight: 50 }} // Increase this value if needed
          />

          {/* Divider */}
          <HorizontalDivider height={7} {...{ marginVertical: 10 }} />

          {/* Ways to plan with Uber */}
          <View style={styles.subsection}>
            <Title>Instruction</Title>
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
          />

          {/* Divider */}
          <HorizontalDivider height={7} {...{ marginVertical: 10 }} />

          {/* Discover Map */}
          <Title>Around You</Title>
          <View>{/* <MapScreen/> */}</View>
          {/* <Image
            source={{
              uri: 'https://static.vecteezy.com/system/resources/previews/007/017/843/non_2x/abstract-polygon-world-map-illustration-geometric-structure-in-blue-color-for-presentation-booklet-website-and-other-design-projects-polygonal-background-free-vector.jpg'
            }}
            style={styles.planningImage}
          /> */}
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <Appbar style={styles.bottom}>
        <Appbar.Action icon="home" onPress={() => {}} />
        <Appbar.Action icon="magnify" onPress={() => {}} />
        <Appbar.Action icon="bell" onPress={() => {}} />
        <Appbar.Action icon="account" onPress={() => {}} />
      </Appbar>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10
  },
  insideContainer: {
    // padding: 15,
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
