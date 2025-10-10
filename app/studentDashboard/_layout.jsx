import { Tabs } from "expo-router";


export default function StudentLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: "rgba(33, 33, 33, 1)",
                    paddingVertical: 10,
                    paddingHorizontal: 20,
                    color: "rgba(255, 255, 255, 1)",
                    fontSize: 12,
                    fontWeight: 400,
                },
                tabBarActiveTintColor: "white",
                tabBarInactiveTintColor: "grey",
            }}>
            <Tabs.Screen name="(home)" options={{ title: 'Meetings' }} />
            <Tabs.Screen name="(course)" options={{ title: 'Courses' }} />
            <Tabs.Screen name="ProfileScreen" options={{ title: 'Profile' }} />
        </Tabs>
    );
}