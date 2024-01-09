import React from 'react'; // Make sure this path is correct
import { useRouter } from "expo-router";
import { GooglePlacesInput } from '@/src/screens/GooglePlacesInputScreen';
import { Provider } from 'react-redux';
import { store } from '@/store';
import { View } from 'react-native';

export default function Page() {
    const router = useRouter();

    return (
        <View>
            <Provider store={store}>
                <GooglePlacesInput/>
            </Provider>
        </View>
    );
}
