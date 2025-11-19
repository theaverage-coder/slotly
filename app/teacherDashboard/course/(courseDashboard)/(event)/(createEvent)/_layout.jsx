import { Stack } from "expo-router";
import { EventProvider } from "../../../../../../contexts/EventContext";

export default function EventLayout() {
    return (
        <EventProvider>
            <Stack screenOptions={{ headerShown: false }}>
            </Stack>
        </EventProvider>
    )
}