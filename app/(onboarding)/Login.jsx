import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Keyboard, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MyButton2 from '../../components/MyButton2';
import SlotlyLogo from '../../components/SlotlyLogo';
import { useUser } from '../../contexts/UserContext';
export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useUser();
    const router = useRouter();

    const handleLogin = async () => {
        try {
            await login(email, password)
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <SafeAreaView style={styles.screenContainer}>
            <Pressable onPress={Keyboard.dismiss} style={{ flex: 1 }}>
                <View style={styles.screenContent}>
                    <SlotlyLogo size={80} />
                    <Text style={{ color: "white", fontSize: 18 }}> Log In to Start Scheduling</Text>
                    <View style={styles.inputFields}>
                        <View style={styles.textField}>
                            <TextInput
                                style={styles.inputText}
                                placeholder="Email"
                                value={email}
                                keyboardType='email-address'
                                onChangeText={(text) => setEmail(text)}
                            />
                        </View>
                        <View style={styles.textField}>
                            <TextInput
                                style={styles.inputText}
                                placeholder="Password"
                                value={password}
                                onChangeText={(text) => setPassword(text)}
                            />
                        </View>
                        <Text style={[{ width: "85.5%", textAlign: "right" }, styles.text]}> Forgot Password? </Text>

                    </View>

                </View>
                <MyButton2 style={styles.loginButton} onPress={handleLogin}>
                    <Text> Login </Text>
                </MyButton2>
                <View style={styles.signUpInsteadText}>
                    <Text style={styles.text}> Don't have an account? </Text>
                    <Pressable onPress={() => router.navigate("/(onboarding)/OnboardingStepOneScreen")}>
                        <Text>
                            Sign Up Here
                        </Text>
                    </Pressable>
                </View>
            </Pressable>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: "rgba(33, 33, 33, 1)",

    },
    screenContent: {
        height: "60%",
        alignItems: "center",
        justifyContent: "flex-end",
        rowGap: 50,
        marginBottom: 30

    },
    inputFields: {
        rowGap: 10,
        width: "90%",
        alignItems: "center"
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
    loginButton: {
        backgroundColor: "white",
        color: "black",
        width: "85.5%"
    },
    text: {
        color: "rgba(117, 117, 117, 1)",
    },
    signUpInsteadText: {
        marginTop: 10,
        alignItems: "center"
    }
}
)