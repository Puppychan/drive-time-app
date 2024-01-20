import { View, Text, Dimensions, Image } from 'react-native'
import React, { useState } from 'react'
import StarRating from 'react-native-star-rating-widget'

const TripInsurance = () => {
  const [rating, setRating] = useState(0)
  return (
    <View
      style={{
        height: 110,
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
        <Text style={{ fontWeight: 'bold' }}>Trip Insurance</Text>
      </View>
      <View style={{ margin: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
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
            <Text style={{ fontSize: 15 }}> View Insurance certificate</Text>
          </View>
        </View>
        <View style={{marginTop: 8}}>
          <Image
            source={require('../../../../assets/right-arrow.png')}
            style={{
              width: 20,
              height: 20,
              borderRadius: 30
            }}
          />
        </View>
      </View>
    </View>
  )
}

export default TripInsurance
