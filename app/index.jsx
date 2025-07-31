import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FormProvider } from './onboarding/FormProvider';
import OnboardingDone from './onboarding/OnboardingDone';
import OnboardingStart from './onboarding/OnboardingStart';
import OnboardingStepFourScreen from './onboarding/OnboardingStepFourScreen';
import OnboardingStepOneScreen from './onboarding/OnboardingStepOneScreen';
import OnboardingStepThreeScreen from './onboarding/OnboardingStepThreeScreen';
import OnboardingStepTwoScreen from './onboarding/OnboardingStepTwoScreen';

const Stack = createNativeStackNavigator();

export default function Index() {

  return (
    <FormProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="OnboardingStart">
          <Stack.Screen name="Start" component={OnboardingStart} />
          <Stack.Screen name="OnboardingScreen1" component={OnboardingStepOneScreen} />
          <Stack.Screen name="OnboardingScreen2" component={OnboardingStepTwoScreen} />
          <Stack.Screen name="OnboardingScreen3" component={OnboardingStepThreeScreen} />
          <Stack.Screen name="OnboardingScreen4" component={OnboardingStepFourScreen} />
          <Stack.Screen name="OnboardingDone" component={OnboardingDone} />
        </Stack.Navigator>
      </NavigationContainer>
    </FormProvider>
  );
}
