import { useRouter } from 'expo-router'
import { UserProfileScreen } from '@/src/screens/ProfileScreen';
import { SOSScreen } from '@/src/screens/SOS_Screen';
export default function Page() {
  return <UserProfileScreen />;
  // return <SOSScreen />
}