import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TeacherLayout() {
    return (
        <Tabs screenOptions={{ headerShown: false }}>
            <Tabs.Screen name="HomeScreen" options={{
                title: 'Meetings',
                tabBarIcon: ({ focused }) => (
                    <Ionicons size={24} color="white" name={focused ? "reader" : "reader-outline"} />
                )
            }} />
            <Tabs.Screen name="course" options={{
                title: 'Courses',
                tabBarIcon: ({ focused }) => (
                    <Ionicons size={24} color="white" name={focused ? "school" : "school-outline"} />
                )
            }} />
            <Tabs.Screen name="ProfileScreen" options={{
                title: 'Profile',
                tabBarIcon: ({ focused }) => (
                    <Ionicons size={24} color="white" name={focused ? "person" : "person-outline"} />
                )
            }} />
        </Tabs>
    )
}