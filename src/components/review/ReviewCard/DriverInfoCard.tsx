import { View, Text, Dimensions, Image } from 'react-native'
import React, { useState } from 'react'

const DriverInfoCard = () => {
  return (
    <View style={{ marginHorizontal: 10, borderRadius: 10, backgroundColor: 'white', marginBottom: 10 }}>
      <View
        style={{
          minWidth: '100%',
          backgroundColor: '#fafafa',
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          padding: 10
        }}
      >
        <Text style={{ fontWeight: 'bold' }}>Driver</Text>
      </View>
      <View style={{height: 100}}>
        <View style={{ flexDirection: 'row', paddingTop: 20, paddingBottom: 20, paddingLeft: 10 }}>
          <View>
            <Image
              source={require('../../../../assets/user_profile.jpg')}
              style={{
                width: 60,
                height: 60,
                borderRadius: 30
              }}
            />
          </View>
          <View style={{ paddingLeft: 15, width: 150 }}>
            <Text style={{ fontWeight: 'bold' }}>Khanh Tran</Text>
            <View
              style={{
                height: 30,
                width: 50,
                flexDirection: 'row',
                backgroundColor: 'orange',
                borderRadius: 10,
                alignContent: 'center',
                marginTop: 10
              }}
            >
              <View style={{ padding: 5, height: 30 }}>
                {/* redux */}
                <Text style={{ textAlign: 'center', color: 'white', fontWeight: '600' }}>4.5</Text>
              </View>
              <View style={{ paddingTop: 10, paddingLeft: 2 }}>
                <Image
                  source={require('../../../../assets/star.png')} // consider
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 30
                  }}
                />
              </View>
            </View>
          </View>
          <View>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>29H254261</Text>
            <View>
              <Text>Evo CYAN</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}

export default DriverInfoCard
