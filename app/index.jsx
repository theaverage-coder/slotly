import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Redirect } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
const Stack = createNativeStackNavigator();

export default function Index() {

  return (
    <SafeAreaProvider>
      <Redirect href="./OnboardingStart" />
    </SafeAreaProvider>
    //<MainLayout></MainLayout>
  );
}
