import { auth, db } from "@/lib/firebase/firebase";
import { Chat, ChatScreen } from "@/src/screens/ChatScreen";
import { MapScreen } from "@/src/screens/MapScreen";
import { store } from "@/store";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { Provider } from "react-redux";
import { collection, addDoc, query, where, onSnapshot } from 'firebase/firestore'
import { faker } from "@faker-js/faker";

export default function Page() {
    const [mode, setMode] = useState<'map' | 'chat'>('map');

    const [chat, setChat] = useState<Chat | null>(null);
    const [driverId, setDriverId] = useState<string | null>(null);
    const [driver, setDriver] = useState<any>(null);
    const [option, setOption] = useState<any>(null);

    const customerId = auth.currentUser?.uid;

    useEffect(() => {
        if (!driverId || chat) return;

        const chatsRef = collection(db, 'chats');
        const q = query(chatsRef, where('members', 'array-contains', [customerId, driverId]));

        const unsubscribe = onSnapshot(q, async (snapshot) => {
            if (snapshot.empty) {
                // No existing chat, create a new one
                const doc = await addDoc(chatsRef, {
                    id: faker.string.uuid(),
                    members: [customerId, driverId],
                    createdAt: Date.now(),
                });
                setChat({ id: doc.id } as Chat);
            } else {
                // Existing chat found, set the chat state
                setChat(snapshot.docs[0].data() as Chat);
            }
        });

        // Clean up the subscription on unmount
        return () => unsubscribe();
    }, [driverId, customerId]);

    return (
        <View>
            <Provider store={store}>
                {(chat && driver && mode === 'chat') ?
                    <ChatScreen chat={chat}
                        recipient={driver}
                        onBack={() => {
                            setMode('map');
                        }} />
                    : <MapScreen fallbackOption={option} fallbackDriver={driver} onChat={(driverId, driver, option) => {
                        setMode('chat');
                        setDriverId(driverId);
                        setDriver(driver)
                        setOption(option)
                    }} />
                }
            </Provider>
        </View>
    )
}