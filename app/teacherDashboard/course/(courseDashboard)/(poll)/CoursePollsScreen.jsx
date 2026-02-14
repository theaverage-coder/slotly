import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import CoursePollsBase from "../../../../../components/CoursePollsBase";
import MyButton2 from "../../../../../components/MyButton2";

export default function CoursePollsScreen() {
    const router = useRouter();

    return (
        <View style={styles.screenContainer}>
            <CoursePollsBase />

            <MyButton2 onPress={() => router.navigate("teacherDashboard/course/CreatePollScreenOne")} style={{ backgroundColor: "rgba(217, 217, 217, 1)" }}>
                <Text> Create Poll </Text>
            </MyButton2>
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