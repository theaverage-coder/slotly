import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CoursesBase from "../../../components/CoursesBase";

export default function CoursesScreen() {

    return (
        <SafeAreaView style={styles.screenContainer}>
            <CoursesBase />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: "rgb(17, 21, 28)",
        flexDirection: "column",
    }
})