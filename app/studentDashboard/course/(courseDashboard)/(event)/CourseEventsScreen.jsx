import { StyleSheet, View } from "react-native";
import CourseEventsBase from "../../../../../components/CourseEventsBase";

export default function CourseEventsScreen() {

    return (
        <View style={styles.screenContainer}>
            <CourseEventsBase />
        </View>
    )
}

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: "rgb(17, 21, 28)",
        paddingTop: 20

    }
})