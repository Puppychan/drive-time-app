import { useState, useEffect } from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import {
  selectTimeTravel,
  toggleRideSelectionVisibility,
  toggleLoading
} from '@/src/slices/navSlice'

import { StyleSheet } from 'react-native'
import { TransportType } from '@/lib/models/transport.model'
import { CarRequest, getBestMatchBooking } from '@/lib/services/car-matching.service'
import { getDriverListByStatusAndTransport } from '@/lib/services/account.service'
import { calculateTaxiFare } from '@/lib/services/ride.fee.service'

export interface ItemType {
  id?: string
  title?: string
  multiplier?: number
  image?: any
  type?: TransportType,
  amount?: number
}

const data: ItemType[] = [
  {
    id: 'Car-4-seat-1',
    title: 'DriveTime Car4',
    multiplier: 1,
    image: require('../../../assets/normal.png'),
    type: TransportType.Car
  },
  {
    id: 'Car-4-seat-2',
    title: 'DriveTime Car4 VIP',
    multiplier: 1.3,
    image: require('../../../assets/normal.png'),
    type: TransportType.Bike
  },
  {
    id: 'Car-7-seat-1',
    title: 'DriveTime Car7',
    multiplier: 1.5,
    image: require('../../../assets/car7.png'),
    type: TransportType.XLCar
  },
  {
    id: 'Car-7-seat-2',
    title: 'DriveTime Car7 VIP',
    multiplier: 1.8,
    image: require('../../../assets/car7.png'),
    type: TransportType.XLCar
  }
]



interface Props {
  requests: CarRequest[]
  onRideSelected: (
    { option, driverId }: { option: ItemType | null, driverId: string | null },
  ) => void
}

const RideSelectionCard = (props: Props) => {
  const travelInformation = useSelector(selectTimeTravel)
  const dispatch = useDispatch()

  const [option, setOption] = useState<ItemType | null>(null)
  const [driverId, setDriverId] = useState<string | null>(null)

  const handleRideSelected = async (item: ItemType) => {
    const res = await getDriverListByStatusAndTransport(true, item.type, "Car")
    const driverId = (await getBestMatchBooking(res.body.data, props.requests))?.[0]?.slice(1)

    setDriverId(driverId)
    props.onRideSelected({ option: item, driverId })
  }

  const distanceInKm = parseFloat(travelInformation?.distance.text) * 1.60934

  return (
    <View className='bg-black h-full'>
      <View className='flex justify-between flex-row p-4'>
        <Text className='text-white text-lg font-semibold'>
          Select an option
        </Text>
        <Text className='text-black bg-white px-4 py-0.5 font-bold rounded text-xl'>{travelInformation?.distance.text}</Text>
      </View>
      <View className='px-2 overflow-y-auto'>
        {data
          .slice(0, 3)
          .map((o) => (
            <TouchableOpacity
              key={o.id}
              onPress={() => {
                if (o.id === option?.id) {
                  setOption(null)
                  setDriverId(null)
                  props.onRideSelected({ option: null, driverId: null })
                } else {
                  setOption({
                    ...o, amount: calculateTaxiFare(
                      distanceInKm,
                      o.type
                    )
                  })
                  setDriverId(null)
                  props.onRideSelected({ option: o, driverId: null })
                }
              }}
              className={`${option?.id === o.id ? 'bg-white' : 'bg-white/70'
                } flex flex-row rounded-lg px-4 mb-2`}
            >
              <Image style={styles.driveImage} source={o.image} />
              <View style={styles.driveDetails}>
                <Text style={styles.driveTitle}>{o.title}</Text>
                <Text>{travelInformation?.duration.text}</Text>
              </View>
              <Text style={styles.priceText}>{
                o?.type ? `$${calculateTaxiFare(
                  distanceInKm,
                  o.type
                ).toFixed(2)}` : 'N/A'
              }</Text>
            </TouchableOpacity>
          ))}
      </View>

      <View className='mt-2 flex flex-row justify-between px-4'>
        <View className='text-lg flex flex-row gap-2'>
          <Text>💳</Text>
          <Text className='font-bold text-blue-200'>Card Payment</Text>
        </View>
        {/* Divider */}
        <View className='text-lg flex flex-row gap-2'>
          <Text>🎁</Text>
          <Text className='font-bold text-red-200'>Vouchers</Text>
        </View>
      </View>

      <TouchableOpacity
        className={`mt-4 bg-white rounded-lg py-2 px-4 text-black mx-4 ${(option) ? 'opacity-100' : 'opacity-50'}`}
        onPress={() => {
          if (!(option)) return
          dispatch(toggleRideSelectionVisibility());
          dispatch(toggleLoading());
          handleRideSelected(option)
        }}
        disabled={!(option)}
      >
        <Text className={`text-black font-semibold text-center text-xl flex items-center justify-center w-full ${(option) ? 'opacity-100' : 'opacity-50'
          }`}>{
            option ? "Book now" : "Please select an option"
          }</Text>
      </TouchableOpacity>
    </View>
  )

}
const styles = StyleSheet.create({
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