import { Stack } from 'expo-router';
import { FormProvider } from './FormProvider';

export default function OnboardingLayout() {
    return (
        <FormProvider>
            <Stack screenOptions={{
                headerShown: false
            }}>
                <Stack.Screen name="OnboardingStart" />
                <Stack.Screen name="OnboardingStepOneScreen" />
                <Stack.Screen name="OnboardingStepTwoScreen" />
                <Stack.Screen name="OnboardingStepThreeScreen" />
                <Stack.Screen name="OnboardingStepFourScreen" />
                <Stack.Screen name="OnboardingDone" />
                <Stack.Screen name="Login" />
            </Stack>

        </FormProvider>


    );
}