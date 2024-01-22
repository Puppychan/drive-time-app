import { AccountType } from '@/lib/common/model-type'
import { auth } from '@/lib/firebase/firebase'
import { Account, AccountRole, genderList } from '@/lib/models/account.model'
import { addUserToDatabase, getUserById, updateUserProfile } from '@/lib/services/account.service'
import { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Dimensions, ToastAndroid } from 'react-native'
import Modal from 'react-native-modal'
import { CustomButton } from '../button/Buttons'
import { Input } from '../input/TextInput'
import { AppDropDown } from '../menu/DropDownMenu'
import { uploadImage } from '@/lib/firebase/storage'
import { AVATAR_REF } from '@/components/Constant'
import { ResponseCode } from '@/common/response-code.enum'
import { Timestamp } from 'firebase/firestore'

interface ModalProps {
  isVisible: boolean
  onSubmit: any;
}

const { height: windowHeight } = Dimensions.get('window')

const EditProfileModal = ({ isVisible, onSubmit }: ModalProps) => {
  const [user, setUser] = useState<AccountType>()
  const [isReady, setIsReady] = useState(false)
  const [gender, setGender] = useState(genderList[0].value)
  const [username, setUsername] = useState<string>('')
  const [firstName, setFirstName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')
  const [phone, setPhone] = useState<string>('')
  const [dob, setDob] = useState<string>('')
  const [avatarUri, setAvatarUri] = useState<any>(null)
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)

  useEffect(() => {
    const prepare = async () => {
      try {
        if (auth.currentUser) {
          let authUser = auth.currentUser
          const userProfile = await getUserById(authUser.uid) as AccountType
          if (userProfile) {
            setUser(userProfile)
            setUsername(userProfile.username)
            setFirstName(userProfile.firstName)
            setLastName(userProfile.lastName)
            setPhone(userProfile.phone)
            let birthday = userProfile.birthday?.toDate()
            let dob = ''
            if (birthday) {
              dob = birthday.getFullYear() + '-' + birthday.getMonth() + '-' + birthday.getDay()
            }
            setDob(dob)
          }
        }
      } catch (e) {
        console.log(e)
      }
    }

    prepare()
    setIsReady(true)
  }, [])

  const checkRequire = () => {
    let field = null;
    if (firstName.trim() === '') {
      field = "First Name";
    } else if (lastName.trim() === '') {
      field = "Last Name";
    } else if (username.trim() === '') {
      field = "Username";
    }  else if (phone.trim() === '') {
      field = "Phone";
    }

    if (field) ToastAndroid.show(`${field} is required`, ToastAndroid.SHORT);
    return field ? false : true;
  }

  const handleSave = async () => {
    try {
      if (!auth.currentUser || !user) {
        ToastAndroid.show(`Unauthorized`, ToastAndroid.SHORT);
        return
      }

      let authUser = auth.currentUser
      // check if all required input fields are filled
      if (!checkRequire()) return;
  
      // upload avatar photo (if any) to storage and get the downloadurl from it
      if (avatarUri) {
        const res = await uploadImage(avatarUri, `${AVATAR_REF}/${authUser.uid}.jpg`);
        if (res.code === ResponseCode.OK) {
          const {downloadUrl} = res.body
          setAvatarUrl(downloadUrl)
        }
        else {
          console.log("Upload image failed: " , res)
        }
      }
  
      const account: AccountType = {
        ...user,
        firstName: firstName,
        lastName: lastName,
        phone: phone,
        avatar: avatarUrl,
        birthday: (dob && Timestamp.fromDate(new Date(dob))) || user?.birthday
      }


      const res = await updateUserProfile(authUser, account)
      if (res.code === ResponseCode.OK) {
        ToastAndroid.show(`Updated profile successfully`, ToastAndroid.SHORT);
        onSubmit()
      }
    }
    catch (error: any) {
      console.log("~~~~ edit-profile.tsx handleSubmit() line 136:", error)
      let message = error.message ?? "Please try again"
      ToastAndroid.show(`Failed to update profile. ${message}`, ToastAndroid.LONG);
    }

  }

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
        <View style={{ marginBottom: 4 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Profile Information</Text>
        </View>
        <View style={styles.formContainer}>
          <Input 
            label="Username" 
            placeHolder="Username"
            editable={false}
            value={username}
            onChangeText={setUsername}/>
          <View style={styles.inline}>
            <View style={styles.elementSameRow}>
              <Input 
                label="First Name" 
                placeHolder="First Name" 
                required={true} 
                value={firstName}
                onChangeText={setFirstName}/>  
            </View>
            <View style={styles.elementSameRow}>
              <Input 
                label="Last Name" 
                placeHolder="Last Name" 
                required={true} 
                value={lastName}
                onChangeText={setLastName} />
            </View>
          </View>
          <Input 
            label="Phone" 
            placeHolder="Phone Number" 
            required={true} 
            value={phone}
            onChangeText={setPhone}/>
          <Input 
            label="Date of Birth" 
            placeHolder="yyyy-MM-dd" 
            value={dob}
            onChangeText={setDob}/>
          <AppDropDown
            label="Gender"
            options={genderList}
            selectedValue={gender}
            setSelectedValue={setGender}
          />
          {/* <CustomButton title='Select Avatar' onPress={chooseImage} type={ButtonType.outlined}/> */}
        </View>
        <CustomButton title="Save" onPress={handleSave} style={{ height: 55, borderRadius: 8, marginBottom: 10 }} />
      </View>
    </Modal>
  )
}
export default EditProfileModal

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
    marginHorizontal: 10
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
  },
  inline: {
    flexDirection: 'row',
    gap: 10,
  },
  elementSameRow: {
    flex: 1,
  }
})
