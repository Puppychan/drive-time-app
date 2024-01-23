import { ResponseCode } from '@/common/response-code.enum';
import { Account } from '@/lib/models/account.model';
import { getAllUsers } from '@/lib/services/account.service';
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ToastAndroid } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


const Users = () => {
    const [users, setUsers] = useState<Account[] | null>([]);

    useEffect(() => {
        getAllUsers().then(res => {
            if (res.code != ResponseCode.OK) {
                setUsers(null)
                ToastAndroid.show(res.message ?? 'Cannot fetch user list', ToastAndroid.SHORT)
            } else {
                setUsers(res.body.data)
            }
        });
    }, []);


    const handleUpdate = (id: string) => {
        // Handle update logic here
        console.log(`Update account with id: ${id}`);
    };

    const handleDelete = (id: string) => {
        // Handle delete logic here
        console.log(`Delete account with id: ${id}`);
    };

    return (
        <View className="flex p-5">
            <FlatList
                data={users}
                keyExtractor={(item) => item.userId}
                renderItem={({ item }) => (
                    <View className="flex py-2 flex-row gap-x-2 border-b-2 border-b-neutral-400">
                        <Text>{item.username}</Text>
                        <Text>{item.email}</Text>
                        <Icon name="edit" className="px-4" size={30} color="#900" onPress={() => handleUpdate(item.userId)} />
                        <Icon name="trash" className="px-4" size={30} color="#900" onPress={() => handleDelete(item.userId)} />
                    </View>
                )}
            />
        </View>
    );
};

export default Users;
