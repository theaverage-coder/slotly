import { useState } from "react";
import OnboardingStepFourScreen from './OnboardingStepFourScreen';
import OnboardingStepOneScreen from './OnboardingStepOneScreen';
import OnboardingStepThreeScreen from './OnboardingStepThreeScreen';
import OnboardingStepTwoScreen from './OnboardingStepTwoScreen';

export default function OnboardingForm() {
    const [page, setPage] = useState(1);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        role: "",
    });

    const PageDisplay = () => {
        if (page === 1) {
            return <OnboardingStepOneScreen></OnboardingStepOneScreen>;
        } else if (page === 2) {
            return <OnboardingStepTwoScreen></OnboardingStepTwoScreen>;
        } else if (page === 3) {
            return <OnboardingStepThreeScreen></OnboardingStepThreeScreen>;
        } else {
            return <OnboardingStepFourScreen></OnboardingStepFourScreen>;
        }
    };

    return (
        <View>
        </View>
    );
};
