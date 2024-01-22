import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { ToastAndroid, TouchableOpacity, View } from 'react-native'
import { Text } from "react-native-paper";
import { fetchVouchersInActiveState } from "@/lib/services/voucher.service";
import { ResponseCode } from "@/common/response-code.enum";
import { Voucher } from "@/lib/models/voucher.model";
import { FlatList } from "react-native-gesture-handler";
import { formatTimestampToReadableTime } from "@/common/time.helper";

const colors = ['bg-indigo-100', 'bg-rose-100', 'bg-cyan-100'];
export default function Page() {
    const router = useRouter();
    const [vouchers, setVouchers] = useState([]);

    useEffect(() => {
        const loadVouchers = async () => {
            try {
                const data = await fetchVouchersInActiveState();
                if (data.code === ResponseCode.OK) {
                    // Ensure that data.body.data is an array of vouchers
                    // console.log(data.body.data);
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

    if (!vouchers) {
        return <View className="bg-white w-full pt-20 min-h-screen flex justify-center">
            <Text className={`text-lg text-neutral-500 font-bold mb-2`}>Loading....</Text>
        </View>
    }
    if (vouchers.length == 0) {
        return <View className="bg-white w-full pt-20 min-h-screen flex justify-center">
            <Text className={`text-lg text-neutral-500 font-bold mb-2`}>There is no voucher</Text>
        </View>
    }

    const renderItem = ({ item, index }: { item: Voucher, index: number }) => (
        <TouchableOpacity>
            <View className={`${colors[index % colors.length]} mx-5 my-2 p-5 rounded-lg shadow-lg overflow-hidden`}>
                <Text className={`text-lg font-bold mb-2`}>{item.name}</Text>
                <Text className={`text-gray-700`}>Code: {item.code}</Text>
                <View className="bg-neutral-400 h-0.5 w-full mt-1 mb-3"></View>
                <Text className={`text-neutral-700 font-medium text-md`}>Discount: {item.discountPercent}%</Text>
                <Text className={`text-gray-600 italic`}>{formatTimestampToReadableTime(item.startDate)} - {formatTimestampToReadableTime(item.expireDate)}</Text>
                <Text className={`text-gray-700`}>Apply to: {item.applyType}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View className="bg-white w-full pt-20 min-h-screen">
            {/* <Text className={`text-lg font-bold mb-2`}>{item.name}</Text> */}
            <FlatList
                data={vouchers}
                keyExtractor={(item: Voucher) => item.voucherId.toString()}
                renderItem={renderItem}
                className="flex flex-col gap-y-10"
            />
        </View>
    );
}