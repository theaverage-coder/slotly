import { Dimensions, Keyboard, Pressable, StyleSheet, TextInput, View } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import ContinueButton from '../../components/ContinueButton';
import OnboardingStep from '../../components/OnboardingStep';
import { useForm } from './FormProvider';

const { width, height } = Dimensions.get('window');

export default function OnboardingStepTwoScreen({ }) {
    const { formData, setFormData } = useForm();
    //const [email, setEmail] = useState('');

    return (
        <SafeAreaView style={styles.screenContainer}>
            <Pressable onPress={Keyboard.dismiss}>
                <View style={styles.screenContainer}>
                    <OnboardingStep number={2} header="What’s Your Email?" description="You’ll need this to log in and receive booking updates."></OnboardingStep>
                    <View style={styles.inputEmail}>
                        <View style={styles.textField}>
                            <TextInput
                                style={styles.inputText}
                                placeholder="Email address*"
                                value={formData.email}
                                onChangeText={(text) => setFormData({ ...formData, email: text })}
                                keyboardType='email-address'
                            />
                        </View>
                    </View>
                    <ContinueButton nextScreen="/(onboarding)/OnboardingStepThreeScreen" text="Continue" oppositeColours={false}></ContinueButton>
                </View>
            </Pressable>
        </SafeAreaView>
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