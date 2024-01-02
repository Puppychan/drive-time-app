import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { ScrollView, View, StyleSheet, Image } from 'react-native'
import { Appbar, Card, Title, Paragraph, Button, IconButton, List } from 'react-native-paper'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { horizontalLeftView, verticalLeftView } from '@/common/utils/custom-view.style'

import SearchInput from '@/components/SearchInput'
import CircleIcon from '@/components/CircleIcon'
import { useThemeColors } from '@/components/Colors'
import { DEFAULT_THEME } from '@/common/constants/default-value.constant'
import FullScreenCard from '@/components/cards/FullScreenCard'
import { HorizontalDivider } from './components/divider/HorizontalDivider'
import { TouchableOpacity } from 'react-native-gesture-handler'

// TODO: change to dynamic later
const homeInfo = '123 Main St'

const HomePage = () => {
  const navigation = useNavigation()
  const colorsTheme = useThemeColors(DEFAULT_THEME)

  const onClickHomeSection = () => {
    navigation.navigate('GooglePlacesInput')
  }

  const onClickExploreNearby = () => {
    navigation.navigate('Explore')
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.insideContainer}>
        <SearchInput />

        {/* Home section */}
        <TouchableOpacity onPress={onClickHomeSection}>
          <View style={{ ...horizontalLeftView, gap: 15 }}>
            {/* <MaterialIcons name="home" size={24} color="black" /> */}
            <CircleIcon
              name="home"
              size={24}
              color={colorsTheme.background}
              backgroundColor={colorsTheme.opposite}
            />

            <View style={{ ...verticalLeftView, flexGrow: 1 }}>
              <Title>Home</Title>
              <Paragraph>123 Main St</Paragraph>
            </View>
            <CircleIcon name="arrow-right" size={35} color={colorsTheme.opposite} />
          </View>
        </TouchableOpacity>

        {/* Recent card */}

        {/* Explore Nearby Card */}
        <FullScreenCard
          imageUrl="https://source.unsplash.com/random?travel"
          title="Explore nearby"
          subtitle="Find the perfect ride for your next trip"
          onClick={onClickExploreNearby}
        />

        <HorizontalDivider height={7} {...{ margin: 10 }} />

        {/* Suggestions */}
        <View style={styles.suggestions}>
          <Title>Suggestions</Title>
          {/* Add see more if more than 4 suggestions */}
          <Button>See more</Button>
        </View>
        <ScrollView horizontal={true}>
          <List.Section>
            <List.Subheader>Some title</List.Subheader>
            <List.Item title="First Item" left={() => <List.Icon icon="folder" />} />
            <List.Item title="Second Item" left={() => <List.Icon icon="folder" />} />
          </List.Section>
        </ScrollView>

        {/* Ways to plan with Uber */}
        <View style={styles.planning}>
          <Title>Ways to plan with Uber</Title>
          <Image
            source={{ uri: 'https://source.unsplash.com/random?city' }}
            style={styles.planningImage}
          />
        </View>
      </View>

      {/* Bottom Navigation */}
      <Appbar style={styles.bottom}>
        <Appbar.Action icon="home" onPress={() => {}} />
        <Appbar.Action icon="magnify" onPress={() => {}} />
        <Appbar.Action icon="bell" onPress={() => {}} />
        <Appbar.Action icon="account" onPress={() => {}} />
      </Appbar>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  insideContainer: {
    margin: 15,
    gap: 15
  },
  pickupCard: {
    margin: 10
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  suggestions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10
  },
  planning: {
    padding: 10
  },
  planningImage: {
    width: '100%',
    height: 200
  },
  bottom: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0
  }
})

export default HomePage
