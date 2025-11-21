import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DashboardHeader from "../../components/DashboardHeader";
import { useUser } from "../../contexts/UserContext";

export default function ProfileScreen() {
    const { user } = useUser();

    return (
        <SafeAreaView style={styles.screenContainer}>
            <DashboardHeader page={2} />

            <Text> Slotly LOGO </Text>

            <Text> Profile Screen </Text>
            <Text> Name : {user.firstName}  {user.lastName}</Text>
            <Text> Email : {user.email} </Text>
            <Text> Change Password </Text>
            <Text> Delete Account </Text>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: "rgba(33, 33, 33, 1)",
    }
})