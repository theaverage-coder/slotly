import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import MyButton2 from "../../../../../components/MyButton2";


export default function CourseEventsScreen() {
    const router = useRouter();

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <MyButton2 onPress={() => router.navigate("teacherDashboard/course/CreateEventScreenOne")}>
                <Text> Create Event </Text>
            </MyButton2>
        </SafeAreaView>
    )
}