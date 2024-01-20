import CityGuideScreen from "@/src/screens/CityGuideScreen";
import React from "react";
import { useRouter } from "expo-router";
import {View } from 'react-native'

export default function Page() {
    const router = useRouter();
    return (
        <View>
            <CityGuideScreen/>
        </View>
    );
}