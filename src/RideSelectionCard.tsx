import React, { useState } from "react";
import { Button, FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { selectTimeTravel } from "slices/navSlice";

const data = [
  {
    id: "Car-4-seat-1",
    title: "DriveTime Car4",
    multiplier: 1,
    image: require("../assets/normal.png"),
  },
  {
    id: "Car-4-seat-2",
    title: "DriveTime Car4 VIP",
    multiplier: 1.3,
    image: require("../assets/normal.png"),
  },
  {
    id: "Car-7-seat-1",
    title: "DriveTime Car7",
    multiplier: 1.5,
    image: require("../assets/car7.png"),
  },
  {
    id: "Car-7-seat-2",
    title: "DriveTime Car7 VIP",
    multiplier: 1.8,
    image: require("../assets/car7.png"),
  }

];

interface ItemType {
    id: string;
    title: string;
    multiplier: number;
    image: any; // Adjust the type of image as needed
  }

const RideSelectionCard = () => {
    const travelInformation = useSelector(selectTimeTravel);
    const [selected, setSelected] = useState<ItemType | null>(null);
  
    return (
      <View style={{ flex: 1, padding: 16 }}>
        <View>
          <Text style={{ textAlign: 'center', fontSize: 20, marginBottom: 15, fontWeight: 'bold' }}>Select a Drive - {travelInformation?.distance.text}</Text>
        </View>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()} // Ensure that the key is a string
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => setSelected(item)}
              style={{
                flexDirection: 'row',
                backgroundColor: selected?.id === item.id ? '#99ccff' : '#ffffff',
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
              }}
            >
              <Image
                style={{
                  paddingLeft: 10,
                  width: 65,
                  height: 65,
                  resizeMode: 'contain',
                }}
                source={item.image}
              />
  
              <View
                style={{
                  marginLeft: 16,
                  paddingLeft: 10,
                  paddingRight: 15,
                  justifyContent: 'center',
                }}
              >
                <Text style={{ fontSize: 14, fontWeight: 'bold' }}>{item.title}</Text>
                <Text>{travelInformation?.duration.text}</Text>
              </View>
  
              <Text style={{ fontSize: 14, fontWeight: 'bold', alignSelf: 'center', position: 'absolute', right: 12 }}>90000 VND</Text>
            </TouchableOpacity>
          )}
        />

        <View style={{ flexDirection: 'row', paddingTop: 10, justifyContent: 'space-between'}}>
            <View style={{ flexDirection: 'row'}}>
                <Text style={{ fontSize: 15, marginRight: 10, color: '#3498db' }}>💳</Text>
                <Text style={{ fontSize: 15, fontWeight:"bold", color: '#333' }}>ATM 1243</Text>
            </View>
            <View style={{ height: '100%', width: 2, backgroundColor: '#ccc', alignItems:'center' }} />
            <View style={{ flexDirection: 'row', right: 40}}>
                <Text style={{ fontSize: 15, marginRight: 10, color: '#e44d26' }}>🎁</Text>
                <Text style={{ fontSize: 15, color: '#e44d26' }}>Vouchers</Text>
            </View>
        </View>


        <View>

            <TouchableOpacity
                style={{
                height: 50,
                marginTop: 20,
                backgroundColor: '#3498db',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
                }}
            >
                <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Select {selected?.title}</Text>
            </TouchableOpacity>
        </View>
    </View>
    );
};
  

export default RideSelectionCard;
