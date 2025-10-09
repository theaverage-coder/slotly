import { Text, View } from "react-native-web";
import { useUser } from "../UserContext";

export default function ProfileScreen() {
    const { user } = useUser();

    return (
        <View>
            <Text> Profile Screen </Text>
            <Text> Name : {user.firstName}  {user.lastName}</Text>
            <Text> Email : {user.email} </Text>
        </View>
    );
}