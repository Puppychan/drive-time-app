
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from '../../components/Buttons'
import { Input } from '../../components/TextInput'
import { AppDropDown } from '../../components/DropDownMenu'
import { useState } from 'react'

const genderList = [
  {label: 'Female', value: 'Female'},
  {label: 'Male', value: 'Male'},
  {label: 'Other', value: 'Other'}
]

export default function Register() {
  const [gender, setGender] = useState(genderList[0].value)

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.formContainer}>
        <Text style={styles.formTitle}>Register</Text>
        <View style={styles.formInputs}>
          <Input
            label="Email"
            placeHolder="Email"
            required={true}
          />
          <Input
            label="Username"
            placeHolder="Username"
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
        </View>
        <Button
          title='Submit'
        />

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  formTitle: {
    fontSize: 20
  },
  formContainer: {
    margin: 10,
    flexDirection: 'column',
    alignItems: 'center',
    gap: 20,
  },
  formInputs: {
    flexDirection: 'column',
    gap: 15,

  }
})