import { Dimensions, StyleSheet, TextInput, View } from 'react-native';

import ContinueButton from './ContinueButton';
import { useForm } from './FormProvider';
import OnboardingStep from './OnboardingStep';

const { width, height } = Dimensions.get('window');

export default function OnboardingStepTwoScreen({ navigation }) {
    const { formData, setFormData } = useForm();
    //const [email, setEmail] = useState('');

    return (
        <View style={styles.screenContainer}>
            <OnboardingStep prevPagePath="/onboarding/OnboardingStepOneScreen" number={2} header="What’s Your Email?" description="You’ll need this to log in and receive booking updates."></OnboardingStep>
            <View style={styles.inputEmail}>
                <View style={styles.textField}>
                    <TextInput
                        style={styles.inputText}
                        placeholder="Email address*"
                        value={formData.email}
                        onChangeText={(text) => setFormData({ ...formData, email: text })}
                    />
                </View>
            </View>
            <ContinueButton nextScreen="/onboarding/OnboardingStepThreeScreen" text="Continue" oppositeColours={false}></ContinueButton>
        </View>
    );
}

const styles = StyleSheet.create({
    screenContainer: {
        backgroundColor: "rgba(33, 33, 33, 1)",
    },
    inputEmail: {
        alignSelf: "stretch",
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: 50,
        rowGap: 24,
        height: height * 0.5,
    },
    textField: {
        width: "95%",
        flexShrink: 0,
        height: 60,
        backgroundColor: "rgba(50, 50, 50, 1)",
        display: "flex",
        justifyContent: "center",
        borderRadius: 16,
        paddingLeft: 20
    },
    inputText: {
        flex: 1,
        flexShrink: 0,
        color: "rgba(117, 117, 117, 1)",
        fontFamily: "Urbanist",
        fontSize: 16,
        fontWeight: 500,
    },
})