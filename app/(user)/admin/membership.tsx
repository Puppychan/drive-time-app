import { ResponseCode } from '@/common/response-code.enum';
import { Membership } from '@/lib/models/membership.model';
import { getAllMemberships } from '@/lib/services/membership.service';
import { OrderByDirection } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, ToastAndroid, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


const isSelected = (selectedSort: string, targetValue: string) => {
    return selectedSort === targetValue
}

const sortOptions = [`Latest`, `Oldest`, `Min Points ↓`, `Min Points ↑`]

export default function Page() {
    const [memberships, setMemberships] = useState<Membership[] | null>([]);
    const [selectedSort, setSelectedSort] = useState('')

    useEffect(() => {
        const getMemberships = async () => {
            const res = await getAllMemberships()
            if (res.code !== ResponseCode.OK) {
                ToastAndroid.show(res.message ?? 'Cannot get list memberships', ToastAndroid.SHORT)
                setMemberships(null)
            } else {
                setMemberships(res.body.data)
            }

        }
        getMemberships()
    }, []);

    useEffect(() => {
        let sortBy = 'updatedAt', sortOrder: OrderByDirection = 'asc'
        switch (selectedSort) {
            case `Latest`:
                sortBy = 'updatedAt'
                sortOrder = 'desc'
                break;
            case `Oldest`:
                sortBy = 'updatedAt'
                sortOrder = 'asc'
                break;
            case `Min Points ↓`:
                sortBy = 'minPoints'
                sortOrder = 'desc'
                break;
            case `Min Points ↑`:
                sortBy = 'minPoints'
                sortOrder = 'asc'
                break;
        }

        const fetchData = async () => {
            const data = await getAllMemberships(sortBy, sortOrder);
            if (data.code === ResponseCode.OK) {
                setMemberships(data.body.data);
            } else {
                setMemberships(null);
                ToastAndroid.show(data.message ?? 'Could not fetch membership', ToastAndroid.LONG);
            }
        };
        fetchData();

    }, [selectedSort])



    const handleUpdate = (id: string) => {
        // Handle update logic here
        console.log(`Update membership with id: ${id}`);
    };

    const handleDelete = (id: string) => {
        // Handle delete logic here
        console.log(`Delete membership with id: ${id}`);
    };

    const handleSortClick = (sortValue: string) => {
        setSelectedSort(sortValue)
    }

    if (!memberships) {
        return <View className="bg-white w-full pt-20 min-h-screen flex justify-center items-center">
            <Text className={`text-lg text-neutral-500 font-bold mb-2`}>Loading....</Text>
        </View>
    }

    return (
        <View className="bg-white w-full pt-12 min-h-screen flex flex-col items-center gap-y-4">
            {/* <Text>bjksdbfdjsk</Text> */}
            <FlatList
                className="mx-5"
                data={sortOptions}
                style={{ minHeight: 35, maxHeight: 35 }}
                horizontal
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item: value }) => (
                    <TouchableOpacity
                        onPress={() => handleSortClick(value)}
                        className={`${isSelected(selectedSort, value) ? `bg-emerald-200` : `bg-neutral-300`} px-6 py-2 rounded-full h-fit mx-2`}
                    >
                        <Text className={`${isSelected(selectedSort, value) ? 'font-bold' : 'font-regular'}`}>{value}</Text>
                    </TouchableOpacity>
                )}
            />
            {memberships.length != 0 ?
                <View className="w-screen py-7 px-4">
                    <View className="flex flex-row gap-2 w-full items-center py-3 border-b-2 border-b-slate-400 px-2">
                        <Text className="font-bold grow">Membership</Text>
                        <Text className="font-medium">Min Points</Text>
                        <Text className="font-medium">Discount</Text>
                        <Text className="font-medium">Actions</Text>
                    </View>
                    <FlatList
                        data={memberships}
                        className="w-full py-2"
                        keyExtractor={(item) => item.membershipId.toString()}
                        renderItem={({ item }) => (
                            <View className="flex flex-row gap-2 w-full items-center py-3 border-b-2 border-b-slate-400 px-2">

                                <Text className="font-bold grow">{item.name}</Text>
                                <Text className="font-medium">{item.minPoints}</Text>
                                <Text className="font-medium">{item.discount}%</Text>
                                <Icon name="edit" className="px-4" size={30} color="#900" onPress={() => handleUpdate(item.membershipId)} />
                                <Icon name="trash" className="px-4" size={30} color="#900" onPress={() => handleDelete(item.membershipId)} />
                            </View>
                        )}
                    />
                </View> : <Text className={`justify-self-center text-lg text-neutral-500 font-bold mb-2`}>There is no membership</Text>}
        </View>
    );
};