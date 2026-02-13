import { useRouter } from 'expo-router';
import { Keyboard, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MyButton2 from '../../components/MyButton2';
import OnboardingStep from '../../components/OnboardingStep';
import { useForm } from './FormProvider';

export default function OnboardingStepThreeScreen() {
    const { formData, setFormData } = useForm();
    const router = useRouter();
    const disabledBtn = !formData.password;

    return (
        <SafeAreaView style={styles.screenContainer}>
            <Pressable onPress={Keyboard.dismiss} style={{ flex: 1 }}>
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
                <MyButton2
                    onPress={() => router.navigate("/OnboardingStepFourScreen")}
                    disabled={disabledBtn}
                    style={[{ backgroundColor: "white" }, disabledBtn && { opacity: 0.3 }]} >
                    <Text> Continue </Text>
                </MyButton2>
            </Pressable>
        </SafeAreaView>

    );
}

const styles = StyleSheet.create({
    screenContainer: {
        backgroundColor: "rgb(17, 21, 28)",
        flex: 1
    },
    inputPassword: {
        alignItems: "center",
        paddingTop: 50,
        rowGap: 24,
        flex: 1
    },
    textField: {
        width: "95%",
        height: 60,
        backgroundColor: "rgb(33, 45, 64)",
        justifyContent: "center",
        borderRadius: 16,
        paddingLeft: 20
    },
    inputText: {
        color: "rgba(117, 117, 117, 1)",
        fontSize: 16,
        fontWeight: 500,
    },
})