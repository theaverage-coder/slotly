import { Stack } from "expo-router";
import { CourseProvider } from "../../../contexts/CourseContext";


export default function CourseLayout() {
    return (
        <CourseProvider>
            <Stack screenOptions={{ headerShown: false }} />
        </CourseProvider>
    )
}