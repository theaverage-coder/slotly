import { Stack } from "expo-router";


export default function CourseLayout() {
    return (
        <Stack initialRouteName="CoursesScreen" screenOptions={{ headerShown: false }}></Stack>
    )
}