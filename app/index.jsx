import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Redirect } from 'expo-router';
const Stack = createNativeStackNavigator();

export default function Index() {

  return (
    <Redirect href="./OnboardingStart" />
    //<MainLayout></MainLayout>
  );
}
