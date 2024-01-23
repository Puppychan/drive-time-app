import { router, useRouter } from 'expo-router'
import { UserProfileScreen } from '@/src/screens/ProfileScreen';
import { SOSScreen } from '@/src/screens/SOS_Screen';
import { CallScreen } from '@/src/screens/CallScreen';
export default function Page() {
    return <CallScreen goToHomeScreen={() => router.replace('/(user)/customer/home')} />;
}