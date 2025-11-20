import { useRouter } from "expo-router";
import { useState } from "react";
import { Platform, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MyButton2 from "../../../../../components/MyButton2";
import { useCourseContext } from "../../../../../contexts/CourseContext";

export default function CourseEventsScreen() {
    const router = useRouter();
    const { courseId } = useCourseContext();
    const [events, setEvents] = useState([]);

    const API_URL =
        Platform.OS === 'web'
            ? process.env.EXPO_PUBLIC_API_URL_WEB
            : process.env.EXPO_PUBLIC_API_URL_MOBILE;

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <MyButton2 onPress={() => router.navigate("teacherDashboard/course/CreateEventScreenOne")}>
                <Text> Create Event </Text>
            </MyButton2>
        </SafeAreaView>
    )
}