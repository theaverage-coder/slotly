import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MyButton2 from '../../components/MyButton2';
import OnboardingStep from '../../components/OnboardingStep';
import { useForm } from './FormProvider';

export default function OnboardingStepFourScreen() {
    const { formData, setFormData } = useForm();
    const router = useRouter();

    return (
        <SafeAreaView style={styles.screenContainer}>
            <OnboardingStep number={4} header="Choose Your Role!" description="We’ll personalize your experience based on your role."></OnboardingStep>
            <View style={styles.inputRole}>
                <Pressable onPress={() => setFormData({ ...formData, role: "s" })} style={[styles.roleOption, (formData.role === "s") && styles.clickedRoleOption]}>
                    <View style={styles.inputTextBox}>
                        <Text style={styles.roleEmoji}>
                            {`🧑‍🎓`}
                        </Text>
                        <Text style={styles.label}>
                            Student
                        </Text>
                        <Ionicons size={25} color="white" name={formData.role === "s" ? "checkmark-circle" : "checkmark-circle-outline"} />
                    </View>
                </Pressable>
                <Pressable onPress={() => setFormData({ ...formData, role: "t" })} style={[styles.roleOption, (formData.role === "t") && styles.clickedRoleOption]}>
                    <View style={styles.inputTextBox}>

                        <Text style={styles.roleEmoji}>
                            {`🧑‍🏫`}
                        </Text>
                        <Text style={styles.label}>
                            Teacher
                        </Text>
                        <Ionicons size={25} color="white" name={formData.role === "t" ? "checkmark-circle" : "checkmark-circle-outline"} />
                    </View>
                </Pressable>
            </View>
            <MyButton2 onPress={() => router.navigate("/OnboardingDone")} style={{ backgroundColor: "white" }} >
                <Text> Continue </Text>
            </MyButton2>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screenContainer: {
        backgroundColor: "rgb(17, 21, 28)",
        flex: 1
    },
    inputRole: {
        alignItems: "center",
        paddingTop: 50,
        rowGap: 24,
        flex: 1
    },
    roleOption: {
        width: "95%",
        height: 60,
        backgroundColor: "rgb(33, 45, 64)",
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 16,
        paddingHorizontal: 20
    },
    clickedRoleOption: {
        borderWidth: 1,
        borderColor: "white"
    },
    inputTextBox: {
        flexDirection: "row",
        flex: 1,
        alignItems: "center",
    },
    roleEmoji: {
        fontSize: 36,
    },
    label: {
        color: "rgba(255, 255, 255, 1)",
        fontSize: 18,
        fontWeight: 400,
        flex: 1
    },
})