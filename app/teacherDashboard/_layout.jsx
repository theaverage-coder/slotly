import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TeacherLayout() {
    return (
        <Tabs screenOptions={{
            headerShown: false,
            tabBarStyle: {
                backgroundColor: "rgba(33, 33, 33, 1)",
                paddingVertical: 10,
                paddingHorizontal: 20,
                color: "rgba(255, 255, 255, 1)",
                fontSize: 12,
                fontWeight: 400,
                borderTopWidth: 0,
            },
            tabBarActiveTintColor: "white",
            tabBarInactiveTintColor: "grey",
        }}>
            <Tabs.Screen name="HomeScreen" options={{
                title: 'Meetings',
                tabBarIcon: ({ focused }) => (
                    <Ionicons size={30} color="white" name={focused ? "reader" : "reader-outline"} />
                )
            }} />
            <Tabs.Screen name="course" options={{
                title: 'Courses',
                tabBarIcon: ({ focused }) => (
                    <Ionicons size={30} color="white" name={focused ? "school" : "school-outline"} />
                )
            }} />
            <Tabs.Screen name="ProfileScreen" options={{
                title: 'Profile',
                tabBarIcon: ({ focused }) => (
                    <Ionicons size={30} color="white" name={focused ? "person" : "person-outline"} />
                )
            }} />
        </Tabs>
    )
}