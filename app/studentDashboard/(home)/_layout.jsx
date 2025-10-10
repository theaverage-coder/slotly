import { Stack } from "expo-router";

export default function Layout() {
    return (
        <Stack initialRouteName="HomeScreen" screenOptions={{ headerShown: false }} />
    )
}