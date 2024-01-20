import { MapScreen } from "@/src/screens/MapScreen";
import { store } from "@/store";
import { useRouter } from "expo-router";
import { View } from "react-native";
import { Provider } from "react-redux";

export default function Page() {
    const router = useRouter();

    return (
        <View>
            <Provider store={store}>
                <MapScreen/>
            </Provider>
        </View>
    )
}