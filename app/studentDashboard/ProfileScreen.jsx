import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfileBase from "../../components/ProfileBase";

export default function ProfileScreen() {

    return (
        <SafeAreaView style={styles.screenContainer}>
            <ProfileBase />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: "rgb(17, 21, 28)",
    }
})