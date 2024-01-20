import React from "react";
import { useRouter } from "expo-router";
import {View } from 'react-native'
import ReviewScreen from "@/src/screens/ReviewScreen";
export default function Page() {
    const router = useRouter();
    return (
        <View>
            <ReviewScreen/>
        </View>
    );
}