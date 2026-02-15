import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HomeBase from "../../components/HomeBase";

export default function HomeScreen() {
    return (
        <SafeAreaView style={styles.screenContainer}>
            <HomeBase />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: "rgb(17, 21, 28)",
    }
})