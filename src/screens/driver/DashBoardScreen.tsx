import React from 'react'
import { View, StyleSheet, Image } from 'react-native'
import { Text } from 'react-native-paper'

import { DriverDashBoardBottomView } from '@/src/components/driver/DashBoardFooterScreen'

export const DriverDashBoardScreen = () => {
  return (
    <View style={{ height: '100%', flexDirection: 'column', justifyContent: 'flex-end' }}>
      <Image
        style={{ ...StyleSheet.absoluteFillObject, resizeMode: 'stretch' }}
        source={require('../../../assets/ggMapPhone.jpg')}
      />

      <View style={styles.header}>
        <View />
        <View style={styles.profileContainer}>
          <Image style={styles.profileImage} source={require('../../../assets/user_profile.jpg')} />
          <View style={styles.ratingContainer}>
            <Image style={styles.ratingStar} source={require('../../../assets/starRating.png')} />
            <Text style={styles.ratingText}>4.85</Text>
          </View>
        </View>
      </View>

      <DriverDashBoardBottomView />
    </View>
    // <View style={{ flex: 1 }}>
    //   <View>

    //   </View>

    //   {/* Blue Rounded Rectangle */}
    //   <View
    //     style={{
    //       backgroundColor: 'blue',
    //       height: 120,
    //       width: '100%',
    //       bottom: 0,
    //       borderTopLeftRadius: 25,
    //       borderTopRightRadius: 25,
    //       justifyContent: 'flex-end',
    //       padding: 20
    //     }}
    //   >
    //     <Text> ho</Text>
    //   </View>
    // </View>
  )
}

const styles = StyleSheet.create({
  blueRectangle: {
    backgroundColor: 'blue',
    height: 50,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10
  },
  profileContainer: {
    margin: 5,
    marginTop: 30,
    position: 'relative',
    alignItems: 'center'
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    alignSelf: 'flex-end'
  },
  ratingContainer: {
    position: 'absolute',
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 5,
    bottom: -20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 1,
    paddingHorizontal: 15
  },
  ratingStar: {
    width: 16,
    height: 16,
    marginEnd: 5
  },
  ratingText: {
    fontSize: 16,
    fontWeight: 'bold'
  }
})
