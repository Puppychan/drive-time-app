import { StyleSheet, Text, View } from 'react-native'
import { useState } from 'react'
import { useRouter } from "expo-router"
import { AppDropDown } from '@/components/DropDownMenu'
import { Button } from '@/components/Buttons'
import { Colors } from '@/components/Colors'
import { Input } from '@/components/TextInput'


const genderList = [
  {label: 'Female', value: 'Female'},
  {label: 'Male', value: 'Male'},
  {label: 'Other', value: 'Other'}
]

export default function Page() {
  const router = useRouter();

  const [gender, setGender] = useState(genderList[0].value);
  return (
    <View style={styles.formContainer}>
      <Text style={styles.formTitle}>Driver Profile</Text>
      <View style={styles.form}>
        <Input
          label="Full Name"
          placeHolder="Full name"
          required={true}
        />
        <Input
          label="Password"
          placeHolder="Password"
          secureTextEntry={true}
          required={true}
        />
        <AppDropDown
          label='Gender'
          options={genderList}
          selectedValue={gender}
          setSelectedValue={setGender}
        />
        <Button
          title='Submit'
          onPress={() => router.push("/")}
        />
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  formContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 30,
    backgroundColor: Colors.cream,
    width: "100%",
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
    width: "100%"
  }
})