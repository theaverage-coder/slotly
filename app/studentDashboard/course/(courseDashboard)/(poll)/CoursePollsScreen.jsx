import { StyleSheet, View } from "react-native";
import CoursePollsBase from "../../../../../components/CoursePollsBase";

export default function CoursePollsScreen() {

    return (
        <View style={styles.screenContainer}>
            <CoursePollsBase />
        </View>
    )
}

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: "rgb(17, 21, 28)",
        paddingTop: 30
    }
})