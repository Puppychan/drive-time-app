import { MapScreen } from "@/src/screens/MapScreen";
import { store } from "@/store";
import { View } from "react-native";
import { Provider } from "react-redux";

export default function Page() {
    return (
        <View>
            <Provider store={store}>
                <MapScreen />
            </Provider>
        </View>
    )
}