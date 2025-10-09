import { Keyboard, Pressable, StyleSheet, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MyButton from '../../components/MyButton';
import OnboardingStep from '../../components/OnboardingStep';
import { useForm } from './FormProvider';


export default function OnboardingStepOneScreen({ }) {
    const { formData, setFormData } = useForm();

    return (
        <SafeAreaView style={styles.screenContainer}>
            <Pressable onPress={Keyboard.dismiss} >
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
                <MyButton nextScreen="/(onboarding)/OnboardingStepTwoScreen" text="Continue" backgroundColor="white" textColor="black" borderWidth={0} borderColor="white"></MyButton>
            </Pressable>
        </SafeAreaView>


    );
}

const styles = StyleSheet.create({
    screenContainer: {
        backgroundColor: "rgba(33, 33, 33, 1)",
        flex: 1
    },
    inputNames: {
        alignSelf: "stretch",
        flexShrink: 0,
        flexDirection: "column",
        alignItems: "center",
        paddingTop: 50,
        rowGap: 24,
    },
    textField: {
        width: "95%",
        flexShrink: 0,
        height: 60,
        backgroundColor: "rgba(50, 50, 50, 1)",
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