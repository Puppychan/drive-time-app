import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  messageContainer: {
    maxWidth: 200,
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    alignSelf: 'flex-end',
    marginHorizontal: 10
  },
  sender1: {
    backgroundColor: 'black',
    alignSelf: 'flex-end'
  },
  sender2: {
    backgroundColor: 'rgba(128, 128, 128, 0.2)',
    alignSelf: 'flex-start'
  },
  sender1Text: {
    color: 'white',
    fontSize: 16
  },
  sender2Text: {
    color: 'black',
    fontSize: 16
  },
  sentTime: {
    fontSize: 14,
    marginHorizontal: 10,
    fontWeight: 'bold',
    color: 'rgba(128, 128, 128, 0.8)'
  },
  sender1Time: {
    color: 'rgba(128, 128, 128, 0.8)',
    alignSelf: 'flex-end'
  },
  sender2Time: {
    color: 'rgba(128, 128, 128, 0.8)',
    alignSelf: 'flex-start'
  }
})
