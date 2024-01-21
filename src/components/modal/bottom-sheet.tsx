import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Dimensions } from 'react-native'
import Modal from 'react-native-modal'
import { CustomButton } from '../button/Buttons'
interface BottomSheetProps {
  isVisible: boolean
  onSubmit: (email: string) => void;
}

const { height: windowHeight } = Dimensions.get('window')
const modalHeight = windowHeight * 0.8
const BottomSheet = ({ isVisible, onSubmit }: BottomSheetProps) => {
  const [email, setEmail] = useState<string>('')
  const handleSend = () => {

    onSubmit(email);
  };
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={() => onSubmit('')} // Clear email state when modal is closed
      onBackButtonPress={() => onSubmit('')}
      style={[styles.modal, { height: 100 }]}
      animationIn="slideInUp"
      animationOut="slideOutDown"
    >
      <View style={styles.modalContent}>
        <View style={{ marginBottom: 15 }}>
          <View style={{ marginBottom: 10 }}>
            <View style={{ marginBottom: 4 }}>
              <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Forgot password?</Text>
            </View>
            <View style={{ marginBottom: 10 }}>
              <Text style={{ fontSize: 16, color: 'gray' }}>
                You will get the new password via email!
              </Text>
            </View>
          </View>
          <View style={{ marginBottom: 10 }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Recover email:</Text>
          </View>
          <View style={{marginBottom: 10}}>
            <TextInput
              style={styles.input}
              placeholder="E.g. huuquoc7603@gmail.com"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
          </View>
        </View>
        <CustomButton title="Send" onPress={handleSend} style={{ height: 55, borderRadius: 8, marginBottom: 10 }} />
      </View>
    </Modal>
  )
}
export default BottomSheet

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
    justifyContent: 'flex-end',
    margin: 0
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16
  },
  input: {
    height: 55,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    fontSize: 16
  },
  inputTitle: {
    fontSize: 18,
    marginBottom: 10
  }
})
