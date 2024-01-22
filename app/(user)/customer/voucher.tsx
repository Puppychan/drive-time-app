import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { ToastAndroid, View } from 'react-native'
import VoucherScreen from "@/src/screens/VoucherScreen";
import { Text } from "react-native-paper";
import { fetchVouchers } from "@/lib/services/voucher.service";
import { ResponseCode } from "@/common/response-code.enum";
import { Voucher } from "@/lib/models/voucher.model";
import { FlatList } from "react-native-gesture-handler";
export default function Page() {
    const router = useRouter();
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

    return (
        <View>
            <FlatList
                data={vouchers}
                keyExtractor={(item: Voucher) => item.voucherId.toString()}
                renderItem={({ item }: { item: Voucher }) => (
                    <Text>{item.name}</Text>
                )}
            />
        </View>
    );
}