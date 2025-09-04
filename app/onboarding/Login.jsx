import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleLogin = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/users/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }
                ),
            });

            const data = await response.json();
            console.log(data);

            if (response.ok) {
                console.log("Successful login");
                if (data.role == "s") {
                    router.push("/studentDashboard/MainLayout");
                } else {
                    router.push("/teacherDashboard/MainLayout")
                }
            }
        } catch (err) {
            Alert.alert("Unsucessful");
            console.log(err);
        }
    };
    return (
        <View>
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
        </View>
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