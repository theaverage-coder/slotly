import { Stack } from "expo-router";
import { CourseProvider } from "../../CourseContext";

export default function CourseLayout() {
    return (
        <CourseProvider>
            <Stack screenOptions={{ headerShown: false }}></Stack>
        </CourseProvider>
    )
}