import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUser } from "../../contexts/UserContext";

export default function ProfileScreen() {
    const { user } = useUser();

    return (
        <SafeAreaView>
            <Text> Profile Screen </Text>
            <Text> Name : {user.firstName}  {user.lastName}</Text>
            <Text> Email : {user.email} </Text>
        </SafeAreaView>
    );
}