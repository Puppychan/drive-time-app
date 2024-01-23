import { View, Text, Dimensions, Image } from 'react-native'
import React, { useState } from 'react'

const RouteInfo = () => {
  return (
    <View style={{ height: 350, marginHorizontal: 10, borderRadius: 10, backgroundColor: 'white' }}>
      <View
        style={{
          minWidth: '100%',
          backgroundColor: '#fafafa',
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          padding: 10
        }}
      >
        <Text style={{ fontWeight: 'bold' }}>Your route</Text>
      </View>
      <View>
        <View style={{marginHorizontal: 10, marginVertical: 10, marginTop: 15}}>
          <Text style={{ fontSize: 15, fontWeight: 'bold' }}> Trip code: asdfasdfasdfasdfasdf</Text>
          <Text>12:25 - 08/01/2024</Text>
        </View>
        <View
          style={{
            marginHorizontal: 10,
            borderRadius: 10,
            backgroundColor: '#f3f3f3',
            paddingHorizontal: 10,
            height: 80,
            marginTop: 10,
            marginBottom: 10
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 15
            }}
          >
            <View style={{ alignItems: 'center', marginRight: 20, marginLeft: 14 }}>
              <Text style={{ fontSize: 20, fontWeight: 'bold' }}>7.1 km </Text>
              <Text style={{ fontSize: 15 }}>Distance</Text>
            </View>
            <View style={{ height: 35, width: 3, backgroundColor: 'lightgray', marginLeft: 15 }} />
            <View style={{ alignItems: 'center', marginLeft: 30 }}>
              <Text style={{ fontSize: 20, fontWeight: 'bold' }}>18 minute(s) </Text>
              <Text style={{ fontSize: 15 }}>Travel Time</Text>
            </View>
          </View>
        </View>
        <View style={{marginTop: 15}}>
          <View style={{flexDirection: 'row', marginHorizontal: 10}}>
            <View style={{marginTop : 2}}>
              <Image
                source={require('../../../../assets/start.png')}
                style={{
                  width: 30,
                  height: 30,
                }}
              />
            </View>
            <View>
              <Text style={{ fontWeight: 'bold', marginLeft: 10 }}>Rmit University</Text>
              <Text style={{ marginLeft: 10 }}>702 Nguyen Van Linh</Text>
            </View>
          </View>

          <View style={{ height: 0.5, width: 330, backgroundColor: 'lightgray', marginHorizontal: 20, marginVertical: 15 }} />
          <View style={{flexDirection: 'row', marginHorizontal: 10}}>
            <View style={{marginTop : 2}}>
              <Image
                source={require('../../../../assets/end.png')}
                style={{
                  width: 30,
                  height: 30,
                }}
              />
            </View>
            <View>
              <Text style={{ fontWeight: 'bold', marginLeft: 10 }}>Cresent Mall</Text>
              <Text style={{ marginLeft: 10 }}>101 Ton Dat Tien</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}

export default RouteInfo
