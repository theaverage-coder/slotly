import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Circle, Svg } from 'react-native-svg';

import { SafeAreaView } from 'react-native-safe-area-context';
import ContinueButton from '../../components/ContinueButton';
import OnboardingStep from '../../components/OnboardingStep';
import { useForm } from './FormProvider';


export default function OnboardingStepFourScreen({ }) {
    const { formData, setFormData } = useForm();

    return (
        <SafeAreaView style={styles.screenContainer}>
            <OnboardingStep number={4} header="Choose Your Role!" description="We’ll personalize your experience based on your role."></OnboardingStep>
            <View style={styles.inputRole}>
                <Pressable onPress={() => setFormData({ ...formData, role: "s" })} style={[styles.roleOption, (formData.role === "s") && styles.clickedRoleOption]}>
                    <Text style={styles.roleEmoji}>
                        {`🧑‍🎓`}
                    </Text>
                    <View style={styles.inputTextBox}>
                        <Text style={styles.inputText}>
                            {`Student`}
                        </Text>
                        <Svg style={styles.circle} width="20" height="21" viewBox="0 0 20 21" fill={formData.role === "s" ? 'white' : 'none'} >
                            <Circle cx="10" cy="10.2305" r="9.5" stroke="white" />
                        </Svg>
                    </View>
                </Pressable>
                <Pressable onPress={() => setFormData({ ...formData, role: "t" })} style={[styles.roleOption, (formData.role === "t") && styles.clickedRoleOption]}>
                    <Text style={styles.roleEmoji}>
                        {`🧑‍🏫`}
                    </Text>
                    <View style={styles.inputTextBox}>
                        <Text style={styles.inputText}>
                            {`Teacher`}
                        </Text>
                        <Svg style={styles.circle} width="20" height="21" viewBox="0 0 20 21" fill={formData.role === "t" ? 'white' : 'none'}>
                            <Circle cx="10" cy="10.2305" r="9.5" stroke="white" />
                        </Svg>
                    </View>
                </Pressable>
            </View>
            <ContinueButton nextScreen="/(onboarding)/OnboardingDone" text="Continue" oppositeColours={false}></ContinueButton>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screenContainer: {
        backgroundColor: "rgb(17, 21, 28)",
    },
    inputRole: {
        alignSelf: "stretch",
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: 50,
        rowGap: 24,
        height: "50%",
    },
    roleOption: {
        width: "95%",
        flexShrink: 0,
        height: 60,
        backgroundColor: "rgba(50, 50, 50, 1)",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 16,
        paddingLeft: 20
    },
    clickedRoleOption: {
        borderWidth: 1,
        borderColor: "white"
    },
    inputTextBox: {
        display: "flex",
        flexDirection: "row",
        flex: 1,
    },
    roleEmoji: {
        textAlign: "left",
        color: "rgba(255, 255, 255, 1)",
        fontFamily: "Urbanist",
        fontSize: 36,
        fontWeight: 400,
    },
    inputText: {
        flexShrink: 0,
        flex: 1,
        color: "rgba(255, 255, 255, 1)",
        fontFamily: "Urbanist",
        fontSize: 18,
        fontWeight: 400
    },
    circle: {
        paddingRight: 20
    }
})