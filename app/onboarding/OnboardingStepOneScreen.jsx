import { Dimensions, StyleSheet, TextInput, View } from 'react-native';

import ContinueButton from './ContinueButton';
import { useForm } from './FormProvider';
import OnboardingStep from './OnboardingStep';

const { width, height } = Dimensions.get('window');

export default function OnboardingStepOneScreen({ }) {
    const { formData, setFormData } = useForm();

    //const [firstName, setFirstName] = useState('');
    //const [lastName, setLastName] = useState('');

    return (
        <View style={styles.screenContainer}>
            <OnboardingStep prevPagePath="Start" number={1} header="Let’s Get to Know You!" description="Just your name, no essays, we promise."></OnboardingStep>
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
            <ContinueButton nextScreen="OnboardingScreenTwo" text="Continue" oppositeColours={false}></ContinueButton>
        </View>
    );
}

const styles = StyleSheet.create({
    screenContainer: {
        backgroundColor: "rgba(33, 33, 33, 1)",
    },
    inputNames: {
        alignSelf: "stretch",
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: 50,
        rowGap: 24,
        height: height * 0.5,
        //borderWidth: 2,
        //borderColor: 'pink'
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