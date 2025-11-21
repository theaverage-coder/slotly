import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DashboardHeader from "../../components/DashboardHeader";

export default function HomeScreen() {
    return (
        <SafeAreaView style={styles.screenContainer}>
            <DashboardHeader page={0} />
            <Text> Home Screen </Text>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: "rgba(33, 33, 33, 1)",
    }
})