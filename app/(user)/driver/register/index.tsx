import { CustomButton } from '@/src/components/button/Buttons'
import { Colors } from '@/components/Colors'
import { Input } from '@/src/components/input/TextInput'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { StyleSheet, Text, ToastAndroid, View } from 'react-native'
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { getFirestore, collection, addDoc } from "firebase/firestore";
// import { auth } from "@/lib/firebase/firebase";

export default function Page() {
  const router = useRouter()
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState('')

  const handleNext = () => {
    if (email.trim() === '') {
      // window.alert('Email is required');

      // ToastAndroid.show("Email is required", ToastAndroid.SHORT);
      return
    } else if (password.trim() === '') {
      // window.alert('Password is required');

      // ToastAndroid.show("Password is required", ToastAndroid.SHORT);
      return
    }

    // createUserWithEmailAndPassword(auth, email, password)
    //   .then((userCredential) => {
    //     // Signed up
    //     const user = userCredential.user;
    //     router.push("/driver/register/driver-profile");

    //   })
    //   .catch((error) => {
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    //     // ..
    //   });

    router.push('/driver/register/driver-profile')
  }

  return (
    <View style={styles.formContainer}>
      <Text style={styles.formTitle}>Driver Sign Up</Text>
      <View style={styles.form}>
        <Input
          label="Email"
          placeHolder="Email"
          required={true}
          value={email}
          onChangeText={setEmail}
        />
        <Input
          label="Password"
          placeHolder="Password"
          secureTextEntry={true}
          required={true}
          value={password}
          onChangeText={setPassword}
        />
        <CustomButton title="Next" onPress={handleNext} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  formContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 30,
    backgroundColor: Colors.cream,
    width: '100%',
    maxWidth: 400,
    paddingVertical: 50,
    paddingHorizontal: 20,
    borderRadius: 10
  },
  formTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.navy_black
  },
  form: {
    flexDirection: 'column',
    gap: 15,
    width: '100%'
  }
})
