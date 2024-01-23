import { ResponseCode } from '@/common/response-code.enum';
import { Membership } from '@/lib/models/membership.model';
import { getAllMemberships } from '@/lib/services/membership.service';
import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, ToastAndroid } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


export default function Page() {
    console.log("memewbkdbnjfds");
    const [memberships, setMemberships] = useState<Membership[] | null>([]);

    useEffect(() => {
        getAllMemberships().then(res => {
            if (res.code !== ResponseCode.OK) {
                ToastAndroid.show(res.message ?? 'Cannot get list memberships', ToastAndroid.SHORT)
                setMemberships(null)
            } else {
                setMemberships(res.body.data)
            }

        });
    }, []);

    const handleUpdate = (id: string) => {
        // Handle update logic here
        console.log(`Update membership with id: ${id}`);
    };

    const handleDelete = (id: string) => {
        // Handle delete logic here
        console.log(`Delete membership with id: ${id}`);
    };

    return (
        <View>
            <Text>bjksdbfdjsk</Text>
            <FlatList
                data={memberships}
                keyExtractor={(item) => item.membershipId}
                renderItem={({ item }) => (
                    <View>
                        <Text>{item.name}</Text>
                        <Icon name="edit" size={30} color="#900" onPress={() => handleUpdate(item.id)} />
                        <Icon name="trash" size={30} color="#900" onPress={() => handleDelete(item.id)} />
                    </View>
                )}
            />
        </View>
    );
};