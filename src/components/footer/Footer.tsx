import { useRouter } from "expo-router";
import { StyleSheet } from "react-native";
import { Appbar } from "react-native-paper";

const Footer = () => {
    const router = useRouter()
    return (
        <Appbar style={styles.bottom}>
            <Appbar.Action icon="home" onPress={() => { router.push('/customer/home') }} />
            <Appbar.Action icon="ticket-confirmation" onPress={() => { router.push('/customer/voucher') }} />
            {/* <Appbar.Action icon="bell" onPress={() => { router.push('/customer/history') }} /> */}
            <Appbar.Action icon="account" onPress={() => { router.push('/customer/profile') }} />
        </Appbar>
    );
};

const styles = StyleSheet.create({
    bottom: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#111', // A dark background color similar to Uber's style
        justifyContent: 'space-between', // This spreads out the icons evenly
    },
    // If you want to style individual icons, you can do so here
    icon: {
        color: '#fff', // White color for the icons
    },
});
export default Footer