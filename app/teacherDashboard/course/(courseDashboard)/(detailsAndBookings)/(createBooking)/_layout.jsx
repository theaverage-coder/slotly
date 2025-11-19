import { Stack } from "expo-router";
import { BookingProvider } from "../../../../../../contexts/BookingContext";


export default function BookingLayout() {
    return (
        <BookingProvider>
            <Stack screenOptions={{ headerShown: false }}>
            </Stack>
        </BookingProvider>
    )
}