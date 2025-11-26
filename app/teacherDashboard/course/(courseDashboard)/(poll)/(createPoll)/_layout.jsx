import { Stack } from "expo-router";
import { PollProvider } from "../../../../../../contexts/PollContext";

export default function PollLayout() {
    return (
        <PollProvider>
            <Stack screenOptions={{ headerShown: false }}>
            </Stack>
        </PollProvider>
    )
}