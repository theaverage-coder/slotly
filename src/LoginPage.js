import { Alert, Text, TextInput, View } from "react-native";

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        if (!email || !password) {
            Alert.alert('Please enter both email and password');
            return;
        }
        //BACKEND CALL IE. ENTER INFO INTO DATABASE
    };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Email:</Text>
      <TextInput
      value={email}
      onChangeText={setEmail}
      placeholder="Enter email"
      keyboardType="email-address"
      autoCapitalize="none"
      />

      <Text>Password: </Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder={"Enter password"}
        secureTextEntry
      />

      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}