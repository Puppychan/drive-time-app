import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  driverImage: {
    width: 70,
    height: 70,
    borderRadius: 35
  },
  driverInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 15
  },
  driverName: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 3
  },
  driverRatingContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  driverStar: {
    fontSize: 16,
    marginRight: 5
  },
  driverStarImage: {
    width: 16,
    height: 16
  },
  callImage: {
    width: 25,
    height: 25
  }
})