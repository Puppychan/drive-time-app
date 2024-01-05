import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, ImageBackground, TextInput, TouchableOpacity } from 'react-native'

const SignInScreen = () => {
  return (
    <ImageBackground source={require('../assets/saigon.jpg')} style={styles.backgroundImage}>
      <View style={styles.overlay} />
      <View style={styles.container}>
        <Text style={styles.titleText}>Login</Text>
        <TextInput style={styles.input} placeholder="Username" />
        <TextInput style={styles.input} placeholder="Password" secureTextEntry={true} />
        <TouchableOpacity style={styles.loginButton}>
          <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.forgotPasswordButton}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>
        <StatusBar style="auto" />
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover'
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.75)'
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'stretch',
    paddingBottom: 250,
    paddingHorizontal: 30
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#fff'
  },
  input: {
    width: '100%',
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 16,
    padding: 10,
    borderRadius: 8
  },
  loginButton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 8,
    marginBottom: 16
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  forgotPasswordButton: {
    alignSelf: 'center'
  },
  forgotPasswordText: {
    color: '#fff',
    fontSize: 16,
    textDecorationLine: 'underline'
  }
})

export { SignInScreen }
