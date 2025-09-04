import { Stack } from 'expo-router';
import { FormProvider } from './FormProvider';

export default function OnboardingLayout() {
    return (
        <FormProvider>
            <Stack screenOptions={{ headerShown: false }} />
        </FormProvider>


    );
}