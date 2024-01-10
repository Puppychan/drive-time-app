import { View, Text, Dimensions, Image } from 'react-native'
import React, { useState } from 'react'
import StarRating from 'react-native-star-rating-widget'

const PaymentInfo = () => {
  const [rating, setRating] = useState(0)
  return (
    <View
      style={{
        height: 230,
        marginHorizontal: 10,
        borderRadius: 10,
        backgroundColor: 'white',
        marginBottom: 10
      }}
    >
      <View
        style={{
          minWidth: '100%',
          backgroundColor: '#fafafa',
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          padding: 10
        }}
      >
        <Text style={{ fontWeight: 'bold' }}>Payment Infomation</Text>
      </View>
      <View style={{ margin: 10 }}>
        <View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
            <Text style={{ fontSize: 17 }}>Fare</Text>
            <Text style={{ fontSize: 15, fontWeight: 'bold' }}>40k</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
            <Text style={{ fontSize: 17 }}>Discount</Text>
            <Text style={{ fontSize: 15, fontWeight: 'bold' }}>-9k</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
            <Text style={{ fontSize: 17 }}>Insurance Fee</Text>
            <Text style={{ fontSize: 15, fontWeight: 'bold' }}>1k</Text>
          </View>
        </View>
      </View>
      <View style={{ height: 1, width: 340, backgroundColor: 'lightgray', marginLeft: 15 }} />
      <View style={{ marginHorizontal: 10, marginTop: 5 }}>
        <Text style={{ fontSize: 17 }}>Pay over</Text>
        <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image
              source={require('../../../../assets/shield.png')}
              style={{
                width: 30,
                height: 30,
                borderRadius: 30
              }}
            />
            <View style={{ marginTop: 5, marginLeft: 10 }}>
              <Text style={{ fontSize: 15 }}> Momo</Text>
            </View>
          </View>
          <View style={{ marginTop: 8 }}>
            <Text>29k</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

export default PaymentInfo
