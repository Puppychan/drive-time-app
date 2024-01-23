import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { ToastAndroid, TouchableOpacity, View } from 'react-native'
import { Text } from "react-native-paper";
import { fetchVouchersInActiveState } from "@/lib/services/voucher.service";
import { ResponseCode } from "@/common/response-code.enum";
import { Voucher, voucherFilterMap } from "@/lib/models/voucher.model";
import { FlatList } from "react-native-gesture-handler";
import { formatTimestampToReadableTime } from "@/common/time.helper";
import { capitalizeAndSeparate } from "@/common/text.helper";
import Icon from 'react-native-vector-icons/Entypo';

const colors = ['bg-cyan-100', 'bg-indigo-100', 'bg-rose-100'];
type SelectedFilter = {
    [key: string]: string | null;
};
const isSelected = (selectedFilter: SelectedFilter, filter: string, targetValue: string) => {
    return selectedFilter[filter] === targetValue
}
export default function Page() {
    const router = useRouter();
    const [vouchers, setVouchers] = useState<Voucher[] | null>([]);
    const [selectedFilter, setSelectedFilter] = useState<SelectedFilter>({});

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
                    setVouchers(null)
                    ToastAndroid.show(data.message ?? 'Could not fetch voucher', ToastAndroid.LONG)
                }
            } catch (error) {
                ToastAndroid.show('Could not fetch voucher', ToastAndroid.LONG)
            }
        };
        loadVouchers();
    }, []);
    useEffect(() => {
        const selectedFilterValue = { ...selectedFilter }
        const fetchData = async () => {
            const data = await fetchVouchersInActiveState(selectedFilterValue);
            if (data.code === ResponseCode.OK) {
                setVouchers(data.body.data);
            } else {
                setVouchers(null);
                ToastAndroid.show(data.message ?? 'Could not fetch voucher', ToastAndroid.LONG);
            }
        };

        fetchData();
    }, [selectedFilter])

    const handleFilterClick = async (filter: string, value: string | null) => {
        setSelectedFilter({ [filter]: value });
    };
    if (!vouchers) {
        return <View className="bg-white w-full pt-20 min-h-screen flex justify-center items-center">
            <Text className={`text-lg text-neutral-500 font-bold mb-2`}>Loading....</Text>
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
        <View className="bg-white w-full pt-12 min-h-screen flex flex-col items-center gap-y-4">

            {/* Render the filter options */}
            {Object.entries(voucherFilterMap).map(([filter, values], index) => (
                <FlatList
                    className="mx-5"
                    data={values}
                    style={{ minHeight: 35, maxHeight: 35 }}
                    horizontal
                    keyExtractor={(item, index) => index.toString()}
                    ListHeaderComponent={() => (
                        <Text className="font-bold text-lg pr-5">{capitalizeAndSeparate(filter)}</Text>
                    )}
                    renderItem={({ item: value }) => (
                        <TouchableOpacity
                            onPress={() => handleFilterClick(filter, value)}
                            className={`${isSelected(selectedFilter, filter, value) ? `bg-emerald-200` : `bg-neutral-300`} px-6 py-2 rounded-full h-fit mx-2`}
                        >
                            <Text className={`${isSelected(selectedFilter, filter, value) ? 'font-bold' : 'font-regular'}`}>{value}</Text>
                        </TouchableOpacity>
                    )}
                    ListFooterComponent={() => (
                        selectedFilter[filter] && (
                            <TouchableOpacity onPress={() => handleFilterClick(filter, null)}
                                className={`bg-rose-300 px-6 py-2 rounded-full`}>
                                <Icon name="trash" size={15} color="#900" />
                            </TouchableOpacity>
                        )
                    )}
                />
            ))}

            {vouchers.length != 0 ? <FlatList
                data={vouchers}
                keyExtractor={(item: Voucher) => item.voucherId.toString()}
                renderItem={renderItem}
                className="flex flex-col gap-y-10"
            /> : <Text className={`justify-self-center text-lg text-neutral-500 font-bold mb-2`}>There is no voucher</Text>}
        </View>
    );
}