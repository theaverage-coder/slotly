import { Tabs } from "expo-router";

export default function TeacherLayout() {
    return (
        <Tabs screenOptions={{ headerShown: false }}>
            <Tabs.Screen name="HomeScreen" options={{ title: 'Home' }} />
            <Tabs.Screen name="course" options={{ title: 'Courses' }} />
            <Tabs.Screen name="ProfileScreen" options={{ title: 'Profile' }} />
        </Tabs>
    )
}