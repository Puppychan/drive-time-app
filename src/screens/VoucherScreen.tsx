import { ResponseCode } from "@/common/response-code.enum";
import { Voucher } from "@/lib/models/voucher.model";
import { fetchVouchers } from "@/lib/services/voucher.service";
import { useCallback, useEffect, useState } from "react";
import { StyleSheet, ToastAndroid, TouchableOpacity, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Text } from "react-native-paper";

const VoucherScreen = () => {
  const [vouchers, setVouchers] = useState([]);

  useEffect(() => {
    const loadVouchers = async () => {
      try {
        const data = await fetchVouchers();
        if (data.code === ResponseCode.OK) {
          // Ensure that data.body.data is an array of vouchers
          console.log(data.body.data);
          setVouchers(data.body.data);
        }
        else {
          ToastAndroid.show(data.message ?? 'Could not fetch voucher', ToastAndroid.LONG)
        }
      } catch (error) {
        ToastAndroid.show('Could not fetch voucher', ToastAndroid.LONG)
      }
    };
    loadVouchers();
  }, []);

  useEffect(() => {
    console.log("Vouchers now", vouchers);
  }, [vouchers])

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={vouchers}
        keyExtractor={(item: Voucher) => item.voucherId.toString()}
        renderItem={({ item }: { item: Voucher }) => (
          <View style={{ height: 100, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <TouchableOpacity
              style={styles.driveItem}
            >
              <View style={styles.driveDetails}>
                {/* Ensure that each voucher has a name property */}
                <Text style={styles.driveTitle}>{item.name}</Text>
                <Text>1 day</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      />

      <Text>{JSON.stringify(vouchers)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
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
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5
  },
  driveImage: {
    paddingLeft: 10,
    width: 65,
    height: 65,
    resizeMode: 'contain'
  },
  driveDetails: {
    marginLeft: 16,
    paddingLeft: 10,
    paddingRight: 15,
    justifyContent: 'center'
  },
  driveTitle: {
    fontSize: 14,
    fontWeight: 'bold'
  },
  priceText: {
    fontSize: 14,
    fontWeight: 'bold',
    alignSelf: 'center',
    position: 'absolute',
    right: 12
  },
  paymentInfo: {
    flexDirection: 'row',
    paddingTop: 10,
    justifyContent: 'space-between'
  },
  paymentMethod: {
    flexDirection: 'row'
  },
  paymentIcon: {
    fontSize: 15,
    marginRight: 10,
    color: '#3498db'
  },
  paymentText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333'
  },
  divider: {
    height: '100%',
    width: 2,
    backgroundColor: '#ccc',
    alignItems: 'center'
  },
  voucherInfo: {
    flexDirection: 'row',
    right: 40
  },
  voucherIcon: {
    fontSize: 15,
    marginRight: 10,
    color: '#e44d26'
  },
  voucherText: {
    fontSize: 15,
    color: '#e44d26'
  },
  buttonContainer: {
    marginTop: 20
  },
  selectButton: {
    height: 50,
    backgroundColor: '#3498db',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold'
  }
})

export default VoucherScreen