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
    const renderItem = ({ item }: { item: Voucher }) => (
        <View className='bg-gray-200 mx-5 my-2 p-5 rounded-lg shadow-md'>
            <Text className='text-lg font-bold mb-2'>{item.name}</Text>
            <Text className='text-gray-700'>Apply to: {item.applyType}</Text>
        </View>
    );
    return (
        <View className='bg-blue-400 w-full flex flex-col gap-10 p-10'>
            <View className='bg-red-200 mx-5 my-2 p-5 rounded-lg shadow-md'>
                <Text className='text-lg font-bold mb-2'>Hello</Text>
                <Text className='text-gray-700'>Apply to: asbfsjk</Text>
            </View>
            <FlatList
                data={vouchers}
                keyExtractor={(item: Voucher) => item.voucherId.toString()}
                renderItem={renderItem}
            />
        </View>
    );
}