import { useRouter } from 'expo-router';
import { Keyboard, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MyButton2 from '../../components/MyButton2';
import OnboardingStep from '../../components/OnboardingStep';
import { useForm } from './FormProvider';


export default function OnboardingStepOneScreen() {
    const { formData, setFormData } = useForm();
    const router = useRouter();
    const disabledBtn = !formData.firstName || !formData.lastName;

    return (
        <SafeAreaView style={styles.screenContainer}>
            <Pressable onPress={Keyboard.dismiss} style={{ flex: 1 }}>
                <OnboardingStep number={1} header="Let’s Get to Know You!" description="Just your name, no essays, we promise."></OnboardingStep>
                <View style={styles.inputNames}>
                    <View style={styles.textField}>
                        <TextInput
                            style={styles.inputText}
                            placeholder="First Name*"
                            value={formData.firstName}
                            onChangeText={(text) => setFormData({ ...formData, firstName: text })}
                        />
                    </View>
                    <View style={styles.textField}>
                        <TextInput
                            style={styles.inputText}
                            placeholder="Last Name*"
                            value={formData.lastName}
                            onChangeText={(text) => setFormData({ ...formData, lastName: text })}
                        />
                    </View>
                </View>
                <MyButton2
                    onPress={() => router.navigate("/OnboardingStepTwoScreen")}
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
    inputNames: {
        flex: 1,
        alignItems: "center",
        paddingTop: 50,
        rowGap: 24,
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