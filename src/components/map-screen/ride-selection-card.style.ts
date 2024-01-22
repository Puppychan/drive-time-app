// RideSelectionCardStyles.tsx
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  headerText: {
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 15,
    fontWeight: 'bold',
  },
  driveItem: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 8,
    paddingVertical: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
  },
  driveImage: {
    paddingLeft: 10,
    width: 65,
    height: 65,
    resizeMode: 'contain',
  },
  driveDetails: {
    marginLeft: 16,
    paddingLeft: 10,
    paddingRight: 15,
    justifyContent: 'center',
  },
  driveTitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  priceText: {
    fontSize: 14,
    fontWeight: 'bold',
    alignSelf: 'center',
    position: 'absolute',
    right: 12,
  },
  paymentInfo: {
    flexDirection: 'row',
    paddingTop: 10,
    justifyContent: 'space-between',
  },
  paymentMethod: {
    flexDirection: 'row',
  },
  paymentIcon: {
    fontSize: 15,
    marginRight: 10,
    color: '#3498db',
  },
  paymentText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
  },
  divider: {
    height: '100%',
    width: 2,
    backgroundColor: '#ccc',
    alignItems: 'center',
  },
  voucherInfo: {
    flexDirection: 'row',
    right: 40,
  },
  voucherIcon: {
    fontSize: 15,
    marginRight: 10,
    color: '#e44d26',
  },
  voucherText: {
    fontSize: 15,
    color: '#e44d26',
  },
  buttonContainer: {
    marginTop: 20,
    backgroundColor: 'red'
  },
  selectButton: {
    height: 50,
    backgroundColor: '#3498db',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

