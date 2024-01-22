import { ChatScreen } from "@/src/screens/ChatScreen";
import { MapScreen } from "@/src/screens/MapScreen";
import { store } from "@/store";
import { useState } from "react";
import { View } from "react-native";
import { Provider } from "react-redux";

export default function Page() {
    const [chatMode, setChatMode] = useState(false);

    return (
        <View>
            <Provider store={store}>
                {chatMode ?
                    <ChatScreen onBack={() => setChatMode(false)} />
                    : <MapScreen onChat={() => setChatMode(true)} />
                }
            </Provider>
        </View>
    )
}