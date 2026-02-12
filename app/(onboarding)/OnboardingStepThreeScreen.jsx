import { Keyboard, Pressable, StyleSheet, TextInput, View } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import ContinueButton from '../../components/ContinueButton';
import OnboardingStep from '../../components/OnboardingStep';
import { useForm } from './FormProvider';

export default function OnboardingStepThreeScreen({ }) {
    const { formData, setFormData } = useForm();

    return (
        <SafeAreaView style={styles.screenContainer}>


            <Pressable onPress={Keyboard.dismiss}>
                <View style={styles.screenContainer}>
                    <OnboardingStep number={3} header="Create Your Password" description="Protect your account so only you can book your slots"></OnboardingStep>
                    <View style={styles.inputPassword}>
                        <View style={styles.textField}>
                            <TextInput
                                style={styles.inputText}
                                placeholder="Password*"
                                value={formData.password}
                                onChangeText={(text) => setFormData({ ...formData, password: text })}
                                secureTextEntry
                            />
                        </View>
                    </View>
                    <ContinueButton nextScreen="/(onboarding)/OnboardingStepFourScreen" text="Continue" oppositeColours={false}></ContinueButton>
                </View>
            </Pressable>
        </SafeAreaView>

    );
}

const styles = StyleSheet.create({
    screenContainer: {
        backgroundColor: "rgb(17, 21, 28)",
    },
    inputPassword: {
        alignSelf: "stretch",
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: 50,
        rowGap: 24,
        height: "50%",
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