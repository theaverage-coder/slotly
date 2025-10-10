import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUser } from '../UserContext';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useUser();

    const handleLogin = async () => {
        try {
            await login(email, password)
        } catch (error) {

        }
    };

    return (
        <SafeAreaView>
            <View style={styles.textField}>
                <TextInput
                    style={styles.inputText}
                    placeholder="Email"
                    value={email}
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
            <Pressable style={styles.loginButton} onPress={handleLogin}>
                <Text> Login </Text>
            </Pressable>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
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
    }
}
)