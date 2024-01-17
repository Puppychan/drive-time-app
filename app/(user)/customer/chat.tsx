import React from "react";
import { useRouter } from "expo-router";
import {View } from 'react-native'
import ChatScreen from "@/src/screens/ChatScreen";
export default function Page() {
    const router = useRouter();
    return (
        <View>
            <ChatScreen/>
        </View>
    );
}