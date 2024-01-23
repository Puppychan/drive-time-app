import { ResponseCode } from '@/common/response-code.enum';
import { Account } from '@/lib/models/account.model';
import { getAllUsers } from '@/lib/services/account.service';
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ToastAndroid } from 'react-native';


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

    return (
        <View style={styles.container}>
            <FlatList
                data={users}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Text>{item.name}</Text>
                    </View>
                )}
            />
        </View>
    );
};

export default Users;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    item: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc'
    }
});