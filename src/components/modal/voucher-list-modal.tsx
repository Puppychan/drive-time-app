import { ResponseCode } from '@/common/response-code.enum';
import { Voucher } from '@/lib/models/voucher.model';
import { fetchVouchersInActiveState } from '@/lib/services/voucher.service';
import { Dispatch } from '@reduxjs/toolkit';
import React, { useState, useEffect, SetStateAction } from 'react';
import { Modal, View, Text, FlatList, Button, ToastAndroid } from 'react-native';

type VoucherListModalProps = {
    modalVisible: boolean
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>
}

const VoucherListModal = ({ modalVisible, setModalVisible }: VoucherListModalProps) => {
    const [vouchers, setVouchers] = useState<Voucher[] | null>([]);

    useEffect(() => {
        fetchVouchersInActiveState().then(data => {
            if (data.code !== ResponseCode.OK) {
                ToastAndroid.show(data.message ?? 'Cannot fetch voucher list', ToastAndroid.SHORT)
                setVouchers(null)
            }
            else {
                setVouchers(data.body.data)
            }
        });
    }, []);

    return (
        <View>
            <Button title="Open Voucher List" onPress={() => setModalVisible(true)} />

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={{ marginTop: 22 }}>
                    <View>
                        <Text>Voucher List</Text>

                        <FlatList
                            data={vouchers}
                            keyExtractor={(item) => item.voucherId}
                            renderItem={({ item }) => (
                                <Text>{item.name}</Text>
                            )}
                        />

                        <Button
                            title="Close"
                            onPress={() => {
                                setModalVisible(!modalVisible);
                            }}
                        />
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default VoucherListModal;