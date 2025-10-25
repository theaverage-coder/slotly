import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Platform, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function BookAppointmentScreen() {
    const { courseId } = useLocalSearchParams();
    const [booking, setBooking] = useState(null);
    const API_URL =
        Platform.OS === 'web'
            ? process.env.EXPO_PUBLIC_API_URL_WEB
            : process.env.EXPO_PUBLIC_API_URL_MOBILE;

    useEffect(() => {
        const fetchBooking = async () => {
            try {
                const response = await fetch(`${API_URL}/api/bookings/getBooking/${courseId}`)
                const data = await response.json();
                setBooking(data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchBooking();
    }, []);

    return (
        <SafeAreaView>
            {(!booking) ? (
                <></>
            ) : (
                <View></View>
            )}
        </SafeAreaView>
    );
}