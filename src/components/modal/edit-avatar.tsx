import { auth } from '@/lib/firebase/firebase'
import { User } from 'firebase/auth'
import { updateAvatar } from '@/lib/services/account.service'
import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Dimensions, ToastAndroid, Image } from 'react-native'
import Modal from 'react-native-modal'
import { ButtonType, CustomButton } from '../button/Buttons'
import { Input } from '../input/TextInput'
import * as ImagePicker from 'expo-image-picker';

interface ModalProps {
  isVisible: boolean
  onSubmit: any;
}

const EditAvatarModal = ({ isVisible, onSubmit }: ModalProps) => {
  const [isReady, setIsReady] = useState(false)
  const [image, setImage] = useState<string | null>(null);
  const [authUser, setAuthUser] = useState<User>()

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  useEffect(() => {
    const prepare = async () => {
      try {
        if (auth.currentUser) {
          setAuthUser(auth.currentUser)
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
      if (authUser) {
        if (authUser.photoURL === image) {
          ToastAndroid.show("No change was made", ToastAndroid.SHORT)
          return;
        }
        await updateAvatar(authUser.uid, image)
        ToastAndroid.show("Updated profile picture", ToastAndroid.SHORT)
        onSubmit()
        return;
      }
      ToastAndroid.show("Unauthorize", ToastAndroid.SHORT)
    }
    catch (e) {
      console.log(e)
      ToastAndroid.show("Update failed. Please try again", ToastAndroid.SHORT)
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
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Profile Picture</Text>
          </View>
          <View>
            <Text style={{ fontSize: 16, color: 'gray' }}>
              Upload your profile picture
            </Text>
          </View>
        </View>
        <Image 
          style={styles.userProfileImage}
          source={image ? { uri: image } : require('@/assets/user_profile.jpg') } 
        />
        <View style={styles.buttonsContainer}>
          <CustomButton type={ButtonType.outlined} title="Choose from gallery" onPress={pickImage}/>
          <CustomButton title="Save" onPress={handleSave}/>
        </View>

      </View>
    </Modal>
  )
}
export default EditAvatarModal

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
  userProfileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    overflow: 'hidden',
    alignSelf: 'center'
  },
  buttonsContainer: {
    flexDirection: 'column',
    gap: 10
  },
})
