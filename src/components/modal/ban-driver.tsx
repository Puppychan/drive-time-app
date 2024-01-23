import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Dimensions, ToastAndroid } from 'react-native'
import Modal from 'react-native-modal'
import { CustomButton } from '../button/Buttons'
import { Input } from '../input/TextInput'
interface ModalProps {
  isVisible: boolean
  onSubmit: any;
}

const { height: windowHeight } = Dimensions.get('window')
const modalHeight = windowHeight * 0.8

const BanDriverModal = ({ isVisible, onSubmit }: ModalProps) => {
  const [email, setEmail] = useState<string>('')
  const [reason, setReason] = useState<string>('')
  const handleSave = async () => {
    try {
        onSubmit()
        // ToastAndroid.show("Saved SOS Conatact successfully", ToastAndroid.SHORT)
    }
    catch (e) {
      console.log(e)
      ToastAndroid.show("Failed to ban driver. Please try again", ToastAndroid.SHORT)
    }
  };


  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={() => {onSubmit()}}
      onBackButtonPress={() => onSubmit()}
      style={[styles.modal, { height: 100 }]}
      animationIn="slideInUp"
      animationOut="slideOutDown"
    >
      <View style={styles.modalContent}>
        <View>
          <View style={{ marginBottom: 4 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Ban Driver</Text>
          </View>
          <View>
            <Text style={{ fontSize: 16, color: 'gray' }}>
              Enter the driver email to ban that driver 
            </Text>
          </View>
        </View>
        <View style={styles.formContainer}>
          <Input
            label='Driver Email'
            required={true}
            value={email}
            onChangeText={setEmail}
            placeHolder="Driver Email"
          />
          <Input
            label='Reason'
            required={true}
            value={reason}
            onChangeText={setReason}
            placeHolder="The reason to ban this driver"
          />
        </View>
        <CustomButton title="Ban" onPress={handleSave} style={{ height: 55, borderRadius: 8, marginBottom: 10 }} />
      </View>
    </Modal>
  )
}
export default BanDriverModal

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    padding: 16,
    backgroundColor: 'blue',
    borderRadius: 8
  },
  modal: {
    justifyContent: 'center',
    marginHorizontal: 20
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    flexDirection: 'column',
    gap: 30
  },
  formContainer: {
    flexDirection: 'column',
    gap: 10
  }
})