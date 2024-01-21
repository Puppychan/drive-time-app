import { auth } from '@/lib/firebase/firebase'
import { SOS } from '@/lib/models/sos.model'
import { getUserById } from '@/lib/services/account.service'
import { getSOSByUserId, saveSOS } from '@/lib/services/sos.service'
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

const SOSDetailModal = ({ isVisible, onSubmit }: ModalProps) => {
  const [sos, setSOS] = useState<SOS>()
  const [name, setName] = useState<string>('')
  const [phone, setPhone] = useState<string>('')
  const [address, setAddress] = useState<string>('')
  const [isReady, setIsReady] = useState(false)
  const [uid, setUid] = useState<string>('')
  useEffect(() => {
    const prepare = async () => {
      try {
        if (auth.currentUser?.uid && auth.currentUser?.uid !== undefined) {
          setUid(auth.currentUser?.uid)
          const sos = await getSOSByUserId(auth.currentUser?.uid)
          if (sos) {
            setSOS(sos)
            setName(sos.name)
            setPhone(sos.phone)
            setAddress(sos.address)
          }
        }
      } catch (e) {
        console.log(e)
      }
    }

    prepare()
    setIsReady(true)
  }, [])

  const handleSave = async () => {
    try {
      if (uid) {
        const sos : SOS = {
          name: name,
          phone: phone,
          address: address
        }
        await saveSOS(uid, sos)
        onSubmit()
        ToastAndroid.show("Saved SOS Conatact successfully", ToastAndroid.SHORT)
      }
      else {
        ToastAndroid.show("Failed to add SOS Contact. Please try again", ToastAndroid.SHORT)
      }
    }
    catch (e) {
      console.log(e)
      ToastAndroid.show("Failed to add SOS Contact. Please try again", ToastAndroid.SHORT)
    }
  };

  if (!isReady) return null

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
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>SOS Contact</Text>
          </View>
          <View>
            <Text style={{ fontSize: 16, color: 'gray' }}>
              We will reach out your SOS Contact when Safety Report is triggered
            </Text>
          </View>
        </View>
        <View style={styles.formContainer}>
          <Input
            label='Conatct Name'
            required={true}
            value={name}
            onChangeText={setName}
            placeHolder="Contact owner's name"
          />
          <Input
            label='Contact Phone'
            required={true}
            value={phone}
            onChangeText={setPhone}
            placeHolder="Contact number"
          />
          <Input
            label='Address'
            required={true}
            value={address}
            onChangeText={setAddress}
            placeHolder="Contact owner's address"
          />
        </View>
        <CustomButton title="Save" onPress={handleSave} style={{ height: 55, borderRadius: 8, marginBottom: 10 }} />
      </View>
    </Modal>
  )
}
export default SOSDetailModal

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
