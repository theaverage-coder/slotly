import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native';
import { Circle, Svg } from 'react-native-svg';

import ContinueButton from './ContinueButton';
import { useForm } from './FormProvider';
import OnboardingStep from './OnboardingStep';

const { width, height } = Dimensions.get('window');

export default function OnboardingStepFourScreen({ navigation }) {
    const { formData, setFormData } = useForm();
    //const [role, setRole] = useState('');

    return (
        <View style={styles.screenContainer}>
            <OnboardingStep prevPagePath="OnboardingScreen3" number={4} header="Choose Your Role!" description="We’ll personalize your experience based on your role."></OnboardingStep>
            <View style={styles.inputRole}>
                <Pressable onPress={() => setFormData({ ...formData, role: "s" })} style={[styles.roleOption, (formData.role === "s") && styles.clickedRoleOption]}>
                    <Text style={styles.roleEmoji}>
                        {`🧑‍🎓`}
                    </Text>
                    <View style={styles.inputTextBox}>
                        <Text style={styles.inputText}>
                            {`Student`}
                        </Text>
                        <Svg style={styles.circle} width="20" height="21" viewBox="0 0 20 21" fill={role === "s" ? 'white' : 'none'} >
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
                        <Svg style={styles.circle} width="20" height="21" viewBox="0 0 20 21" fill={role === "t" ? 'white' : 'none'}>
                            <Circle cx="10" cy="10.2305" r="9.5" stroke="white" />
                        </Svg>
                    </View>
                </Pressable>
            </View>
            <ContinueButton nextScreen="OnboardingDone" text="Continue" oppositeColours={false}></ContinueButton>
        </View>
    );
}

const styles = StyleSheet.create({
    screenContainer: {
        backgroundColor: "rgba(33, 33, 33, 1)",
    },
    inputRole: {
        alignSelf: "stretch",
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: 50,
        rowGap: 24,
        height: height * 0.5,
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