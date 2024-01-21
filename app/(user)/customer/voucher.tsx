import React from "react";
import { useRouter } from "expo-router";
import {View } from 'react-native'
import { VoucherScreen } from "@/src/screens/VoucherScreen";
export default function Page() {
    const router = useRouter();
    return (
        <View>
            <VoucherScreen/>
        </View>
    );
}