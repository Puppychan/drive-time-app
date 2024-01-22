import { useState } from 'react'
import { Button, FlatList, Image, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'

import {
  selectTimeTravel,
  selectIsRideSelectionVisible,
  toggleRideSelectionVisibility,
  toggleLoading
} from '@/src/slices/navSlice'

// import { styles } from './ride-selection-card.style'
import { StyleSheet } from 'react-native'

const data = [
  {
    id: 'Car-4-seat-1',
    title: 'DriveTime Car4',
    multiplier: 1,
    image: require('../../../assets/normal.png')
  },
  {
    id: 'Car-4-seat-2',
    title: 'DriveTime Car4 VIP',
    multiplier: 1.3,
    image: require('../../../assets/normal.png')
  },
  {
    id: 'Car-7-seat-1',
    title: 'DriveTime Car7',
    multiplier: 1.5,
    image: require('../../../assets/car7.png')
  },
  {
    id: 'Car-7-seat-2',
    title: 'DriveTime Car7 VIP',
    multiplier: 1.8,
    image: require('../../../assets/car7.png')
  }
]

interface ItemType {
  id: string
  title: string
  multiplier: number
  image: any
}

const RideSelectionCard = () => {
  const travelInformation = useSelector(selectTimeTravel)
  const dispatch = useDispatch()
  const [selected, setSelected] = useState<ItemType | null>(null)

  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>
          Select a Drive -{travelInformation?.distance.text}
        </Text>
      </View>
      <FlatList
        style={styles.driverItemContainer}
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => setSelected(item)}
            style={[
              styles.driveItem,
              {
                backgroundColor: selected?.id === item.id ? '#99ccff' : '#ffffff'
              }
            ]}
          >
            <Image style={styles.driveImage} source={item.image} />
            <View style={styles.driveDetails}>
              <Text style={styles.driveTitle}>{item.title}</Text>
              <Text>{travelInformation?.duration.text}</Text>
            </View>
            <Text style={styles.priceText}>90000 VND</Text>
          </TouchableOpacity>
        )}
      />

      <View style={styles.paymentInfo}>
        <View style={styles.paymentMethod}>
          <Text style={styles.paymentIcon}>💳</Text>
          <Text style={styles.paymentText}>ATM 1243</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.voucherInfo}>
          <Text style={styles.voucherIcon}>🎁</Text>
          <Text style={styles.voucherText}>Vouchers</Text>
        </View>
      </View>

      <Text> Hello world </Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.selectButton}
          onPress={() => {
            dispatch(toggleRideSelectionVisibility());
            dispatch(toggleLoading());
          }}
        >
          <Text style={styles.buttonText}>Select {selected?.title}</Text>
        </TouchableOpacity>
      </View>
    </View>
  )

}
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    height: 150,
    paddingHorizontal: 16,
    paddingTop: 36,
    paddingBottom: 150,
    backgroundColor: 'black',
    borderTopLeftRadius: 20, // Set top left border radius
    borderTopRightRadius: 20, // Set top right border radius
    overflow: 'hidden', // This ensures that children don't overlap the rounded corners
  },
  headerContainer: {
    backgroundColor: 'transparent'
  },
  headerText: {
    textAlign: 'center',
    fontSize: 23,
    marginBottom: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  driverItemContainer: {
    paddingHorizontal: 10,
    marginVertical: 20,
    // minHeight: 200,
  },
  driveItem: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 8,
    paddingVertical: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
  },
  driveImage: {
    paddingLeft: 10,
    width: 65,
    height: 65,
    resizeMode: 'contain',
  },
  driveDetails: {
    marginLeft: 16,
    paddingLeft: 10,
    paddingRight: 15,
    justifyContent: 'center',
  },
  driveTitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  priceText: {
    fontSize: 14,
    fontWeight: 'bold',
    alignSelf: 'center',
    position: 'absolute',
    right: 12,
  },
  paymentInfo: {
    flexDirection: 'row',
    paddingTop: 10,
    justifyContent: 'space-between',
  },
  paymentMethod: {
    flexDirection: 'row',
  },
  paymentIcon: {
    fontSize: 15,
    marginRight: 10,
    color: '#3498db',
  },
  paymentText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
  },
  divider: {
    height: '100%',
    width: 2,
    backgroundColor: '#ccc',
    alignItems: 'center',
  },
  voucherInfo: {
    flexDirection: 'row',
    right: 40,
  },
  voucherIcon: {
    fontSize: 15,
    marginRight: 10,
    color: '#e44d26',
  },
  voucherText: {
    fontSize: 15,
    color: '#e44d26',
  },
  buttonContainer: {
    marginTop: 20,
    backgroundColor: 'red'
  },
  selectButton: {
    height: 50,
    backgroundColor: '#3498db',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});


export default RideSelectionCard