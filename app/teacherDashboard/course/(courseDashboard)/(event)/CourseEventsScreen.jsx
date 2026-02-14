import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import CourseEventsBase from "../../../../../components/CourseEventsBase";
import MyButton2 from "../../../../../components/MyButton2";

export default function CourseEventsScreen() {
    const router = useRouter();

    return (
        <View style={styles.screenContainer}>
            <CourseEventsBase />

            <MyButton2 onPress={() => router.navigate("teacherDashboard/course/CreateEventScreenOne")} style={{ backgroundColor: "rgba(217, 217, 217, 1)" }}>
                <Text> Create Event </Text>
            </MyButton2>
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