import { useRouter } from 'expo-router';
import { Keyboard, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MyButton2 from '../../components/MyButton2';
import OnboardingStep from '../../components/OnboardingStep';
import { useForm } from './FormProvider';

export default function OnboardingStepTwoScreen({ }) {
    const { formData, setFormData } = useForm();
    const router = useRouter();

    return (
        <SafeAreaView style={styles.screenContainer}>
            <Pressable onPress={Keyboard.dismiss} style={{ flex: 1 }}>
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
                <MyButton2 onPress={() => router.navigate("/OnboardingStepThreeScreen")} style={{ backgroundColor: "white" }} >
                    <Text> Continue </Text>
                </MyButton2>
            </Pressable>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screenContainer: {
        backgroundColor: "rgb(17, 21, 28)",
        flex: 1,
    },
    inputEmail: {
        alignItems: "center",
        paddingTop: 50,
        rowGap: 24,
        flex: 1,
    },
    textField: {
        width: "95%",
        height: 60,
        backgroundColor: "rgb(33, 45, 64)",
        justifyContent: "center",
        borderRadius: 16,
        paddingLeft: 20,

    },
    inputText: {
        color: "rgba(117, 117, 117, 1)",
        fontSize: 16,
        fontWeight: 500,
    },
})