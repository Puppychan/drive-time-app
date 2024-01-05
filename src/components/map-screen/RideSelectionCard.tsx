import { useState } from "react";
import { Button, FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { selectTimeTravel, selectIsRideSelectionVisible, toggleRideSelectionVisibility, toggleLoading } from "@/src/slices/navSlice";
import {styles} from "./ride-selection-card.style"

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
    image: any;
  }

  const RideSelectionCard = () => {
    const travelInformation = useSelector(selectTimeTravel);
    const dispatch = useDispatch();
    const [selected, setSelected] = useState<ItemType | null>(null);
  
    return (
      <View style={{ flex: 1, padding: 16 }}>
        <View>
          <Text style={styles.headerText}>Select a Drive - {travelInformation?.distance.text}</Text>
        </View>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => setSelected(item)}
              style={[
                styles.driveItem,
                {
                  backgroundColor: selected?.id === item.id ? '#99ccff' : '#ffffff',
                },
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
    );
  };
  

export default RideSelectionCard;
