import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Linking, Alert } from "react-native";
import { Audio } from 'expo-av';
import Ring from '../components/animation/ring.circle';

export const SOSScreen = () => {
    const [timer, setTimer] = useState(15);
    const [timerReachedZero, setTimerReachedZero] = useState(false);
    const [sound, setSound] = useState<Audio.Sound | undefined>(undefined);

    async function playSound() {
        console.log('Loading Sound');
        const { sound } = await Audio.Sound.createAsync(require('../../assets/sos_morsecode.mp3'),
            { shouldPlay: true, isLooping: true }
        );

        setSound(sound)
        console.log('Playing Sound');
        await sound.playAsync();
    }

    useEffect(() => {
        // play the file tone.mp3
        try {
            if (!sound) {
                playSound()
            }
        } catch (e) {
            console.log(`cannot play the sound file`, e)
        }

        const interval = setInterval(() => {
            setTimer((prevTimer: number) => {
                if (prevTimer > 0) {
                    return prevTimer - 1;
                } else {
                    sound?.unloadAsync()
                    setTimerReachedZero(true);
                    clearInterval(interval); // Stop the interval once timer reaches 0
                    return 0;
                }
            });
        }, 1000);

        // Clean up the interval when the component is unmounted
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (timerReachedZero) {
            initiateCall();
        }
    }, [timerReachedZero]);

    const initiateCall = async () => {
        try {
            const phoneNumber = '113';
            Linking.openURL(`tel:${phoneNumber}`)
        } catch (error) {
            console.error("Error initiating call:", error);
        }
    };

    const handleCancel = () => {
        sound?.unloadAsync()
        Alert.alert("Cancel Button Pressed", "Go Back to Profile view");
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.topCentered}>
                <Text style={{ fontSize: 25 }}>Emergency SOS</Text>
            </View>
            <View style={styles.middleContainer}>
                <View style={styles.circle}>
                    {/* Render the Ring component for the ringing effect */}
                    {[...Array(3).keys()].map((_, index) => (
                        <Ring key={index} index={index} />
                    ))}
                    <Text style={styles.timerText}>{timer}</Text>
                </View>
            </View>
            <View style={styles.bottomButtonContainer}>
                <TouchableOpacity style={styles.bottomButton} onPress={handleCancel}>
                    <Text style={styles.bottomButtonText}>Cancel</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    bottomButtonContainer: {
        position: 'absolute',
        bottom: 20,
        left: 0,
        right: 0,
        alignItems: 'center',
    },
    bottomButton: {
        backgroundColor: 'gray',
        borderRadius: 25,
        paddingVertical: 15,
        paddingHorizontal: 30,
    },
    bottomButtonText: {
        color: 'white',
        fontSize: 16,
    },
    topCentered: {
        justifyContent: "flex-start",
        alignItems: "center",
        marginTop: 100,
    },
    middleContainer: {
        flex: 1,
        alignItems: "center",
    },
    circle: {
        width: 130,
        height: 130,
        borderRadius: 65,
        backgroundColor: 'rgba(255, 0, 0, 0.8)',
        justifyContent: "center",
        alignItems: "center",
        marginTop: 120
    },
    timerText: {
        fontSize: 45,
        color: "white",
    },
});
