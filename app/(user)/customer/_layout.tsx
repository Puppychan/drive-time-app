import Footer from '@/src/components/footer/Footer'
import { store } from '@/store'
import { Stack } from 'expo-router'
import { useState } from 'react'
import { Button, Modal, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Provider } from 'react-redux'

const headerCustomStyle = {
  headerStyle: {
    backgroundColor: 'black',
  },
  headerTitleStyle: {
    color: 'white'
  },
  headerTintColor: 'white' // This will change the color of the back button
}

export default function _layout() {
  // const [modalVisible, setModalVisible] = useState(false);

  // const SortModal = () => (
  //   <Modal
  //     animationType="slide"
  //     transparent={true}
  //     visible={modalVisible}
  //     onRequestClose={() => {
  //       setModalVisible(!modalVisible);
  //     }}
  //   >
  //     <View style={{ marginTop: 22 }}>
  //       <View>
  //         <Text>Select sort order</Text>

  //         {/* Add your sort options here */}

  //         <Button
  //           title="Close"
  //           onPress={() => {
  //             setModalVisible(!modalVisible);
  //           }}
  //         />
  //       </View>
  //     </View>
  //   </Modal>
  // );
  return (
    <Provider store={store}>


      <View style={{ flex: 1 }}>
        {/* Your stack navigator and screens */}
        <Stack>
          <Stack.Screen
            name="home"
            options={{
              headerBackVisible: false,
              headerTitle: "Home Drive Time",
              ...headerCustomStyle,
            }}
          />
          <Stack.Screen
            name="voucher"
            options={{
              headerBackVisible: false,
              headerTitle: "Voucher List",
              // headerRight: () => (
              //   <TouchableOpacity

              //     onPress={async () => setModalVisible(true)}>
              //     <Text className="text-white">Sort</Text>
              //   </TouchableOpacity>
              // ),
              ...headerCustomStyle
            }}
          />
          <Stack.Screen
            name="profile"
            options={{
              headerBackVisible: false,
              headerTitle: "Profile",
              ...headerCustomStyle
            }}
          />
          <Stack.Screen
            name="nearby_place"
            options={{
              headerTitle: "Nearby Place",
              ...headerCustomStyle
            }}
          />

        </Stack>

        {/* Your reusable Footer component */}
        <Footer />
      </View >
    </Provider>
  )
}