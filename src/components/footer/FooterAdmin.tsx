import { useRouter } from "expo-router";
import { StyleSheet } from "react-native";
import { Appbar } from "react-native-paper";

const FooterAdmin = () => {
    const router = useRouter()
    return (
        <Appbar style={styles.bottom}>
            <Appbar.Action icon="home" onPress={() => { router.push('/admin/home') }} />
            <Appbar.Action icon={require('@/assets/admin_dashboard.png')} onPress={() => { router.push('/admin/dashboard') }} />
            <Appbar.Action icon="account" onPress={() => { router.push('/admin/profile') }} />
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
        paddingHorizontal: 40, // Horizontal padding so the edges of the screen are not occupied
    },
    // If you want to style individual icons, you can do so here
    icon: {
        color: '#fff', // White color for the icons
    },
});
export default FooterAdmin