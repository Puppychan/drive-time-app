import { ResponseCode } from '@/common/response-code.enum';
import { formatTimestampToReadableTime } from '@/common/time.helper';
import { Voucher } from '@/lib/models/voucher.model';
import { fetchVouchersInActiveState } from '@/lib/services/voucher.service';
import { Dispatch } from '@reduxjs/toolkit';
import React, { useState, useEffect, SetStateAction } from 'react';
import { View, Text, FlatList, Button, ToastAndroid, StyleSheet, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal'


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

    const onClickVoucher = (voucherId: string) => {
        setModalVisible(false)
    }

    const renderItem = ({ item, index }: { item: Voucher, index: number }) => (
        <TouchableOpacity key={index} onPress={onClickVoucher}>
            <View className={`bg-cyan-100 mx-5 my-2 p-5 rounded-lg shadow-lg overflow-hidden`}>
                <Text className={`text-lg font-bold mb-2`}>{item.name}</Text>
                <Text className={`text-neutral-700 font-medium text-md`}>Discount: {item.discountPercent}%</Text>
                <Text className={`text-gray-600 italic`}>{formatTimestampToReadableTime(item.startDate)} - {formatTimestampToReadableTime(item.expireDate)}</Text>
                <Text className={`text-gray-700`}>Apply to: {item.applyType}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <Modal
            isVisible={modalVisible}
            onBackdropPress={() => setModalVisible(false)}
            onBackButtonPress={() => setModalVisible(false)}
            style={{ ...styles.modal, marginHorizontal: 20, height: '100%' }}
            // className="h-full m-10"
            animationIn="slideInUp"
            animationOut="slideOutDown"
        >
            <View style={{ ...styles.modalContent, marginVertical: 130, marginHorizontal: 17 }}>
                <Text className="font-bold text-2xl text-center">Vouchers</Text>
                <View className="w-full h-0.5  rounded-full bg-neutral-300"></View>
                <FlatList
                    data={vouchers}
                    keyExtractor={(item) => item.voucherId}
                    renderItem={renderItem}
                />
            </View>
        </Modal>
    );
};

export default VoucherListModal;

const styles = StyleSheet.create({
    modal: {
        justifyContent: 'center',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        flexDirection: 'column',
        gap: 30
    }
});