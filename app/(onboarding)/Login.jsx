import Ionicons from '@react-native-vector-icons/ionicons';
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
    const [showPassword, setShowPassword] = useState(true);

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
                <Pressable onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons size={40} color="white" name="arrow-back-circle" />
                </Pressable>
                <View style={[StyleSheet.absoluteFillObject, styles.screenContent]}>
                    <SlotlyLogo size={80} />
                    <Text style={{ color: "white", fontSize: 18 }}> Log In to Start Scheduling</Text>
                    <View style={styles.inputFields} behavior='padding'>
                        <View style={styles.textField}>
                            <TextInput
                                style={styles.inputText}
                                placeholder="Email"
                                value={email}
                                keyboardType='email-address'
                                onChangeText={(text) => setEmail(text)}
                            />
                        </View>
                        <View style={[styles.textField, styles.showPassword]}>
                            <TextInput
                                secureTextEntry={showPassword}
                                style={styles.inputText}
                                placeholder="Password"
                                value={password}
                                onChangeText={(text) => setPassword(text)}
                            />
                            <Pressable onPress={() => setShowPassword(!showPassword)}>
                                <Ionicons size={20} color="rgba(117, 117, 117, 1)" name={showPassword ? "eye-off" : "eye"} />
                            </Pressable>
                        </View>
                    </View>
                    <MyButton2 style={styles.loginButton} onPress={handleLogin}>
                        <Text> Login </Text>
                    </MyButton2>
                </View>
            </Pressable>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: "rgb(17, 21, 28)",
    },
    screenContent: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        rowGap: 30,
    },
    backButton: {
        marginLeft: 15,
        marginTop: 20
    },
    inputFields: {
        rowGap: 10,
        width: "90%",
        alignItems: "center",
        marginBottom: 30
    },
    textField: {
        width: "95%",
        height: 60,
        backgroundColor: "rgb(33, 45, 64)",
        justifyContent: "center",
        borderRadius: 16,
        paddingHorizontal: 20
    },
    inputText: {
        flex: 1,
        flexShrink: 0,
        color: "rgba(117, 117, 117, 1)",
        fontFamily: "Urbanist",
        fontSize: 16,
        fontWeight: 500,
    },
    showPassword: {
        flexDirection: "row",
        alignItems: "center"
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