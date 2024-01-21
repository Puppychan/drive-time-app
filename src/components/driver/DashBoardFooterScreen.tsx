import { useState, useEffect } from 'react'
import { View, TouchableOpacity, Text, Image } from 'react-native'

export const DriverDashBoardBottomView = ({ initialStatus = 'offline' }) => {
  const [status, setStatus] = useState(initialStatus)
  const [dotColor, setDotColor] = useState('red')
  const [statusText, setStatusText] = useState("You're Offline")

  // Update the state variables based on the provided status
  useEffect(() => {
    if (status === 'online') {
      setDotColor('rgba(144, 238, 144, 1)')
      setStatusText("You're Online")
    } else if (status === 'onTrip') {
      setDotColor('rgba(46, 218, 255, 1)')
      setStatusText('Trip In Progress...')
    } else {
      setDotColor('rgba(255, 127, 127, 1)')
      setStatusText("You're Offline")
    }
  }, [status])

  // Function to toggle between online and offline
  const toggleStatus = () => {
    const newStatus = status === 'online' ? 'offline' : 'online'
    setStatus(newStatus)
  }

  return (
    <View>
      <TouchableOpacity
        style={{
          width: '40%',
          backgroundColor: 'black',
          borderRadius: 25,
          alignSelf: 'center',
          marginBottom: 20
        }}
        onPress={toggleStatus}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <Image
            style={{ width: 18, height: 18, tintColor: 'white', marginRight: 5 }}
            source={require('../../../assets/ic_on_button.png')}
          />
          <Text
            style={{
              textAlign: 'center',
              fontSize: 18,
              color: 'white',
              padding: 5,
              paddingVertical: 10
            }}
          >
            {status === 'online' ? 'Go Offline' : 'Go Online'}
          </Text>
        </View>
      </TouchableOpacity>

      {/* Display the status with the colored dot */}
      <View
        style={{
          width: '100%',
          backgroundColor: 'white',
          marginBottom: 10,
          flexDirection: 'row',
          alignItems: 'center'
        }}
      >
        <View
          style={{
            width: 20,
            height: 20,
            borderRadius: 10,
            backgroundColor: dotColor,
            marginRight: 10,
            marginLeft: 30,
            margin: 20
          }}
        />
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{statusText}</Text>
      </View>
    </View>
  )
}

export default DriverDashBoardBottomView
