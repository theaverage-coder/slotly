import { useEffect, useState } from "react";
import { FlatList, Platform, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCourseContext } from "../../../../../contexts/CourseContext";
import { useUser } from "../../../../../contexts/UserContext";

export default function BookAppointmentScreen() {
    const { courseId } = useCourseContext();
    const [availableSlots, setAvailableSlots] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
    const [startDate, setStartDate] = useState(new Date());
    const { user } = useUser();
    const [bookingId, setBookingId] = useState(null);
    const [timeSlotDuration, setTimeSlotDuration] = useState(null);

    const API_URL =
        Platform.OS === 'web'
            ? process.env.EXPO_PUBLIC_API_URL_WEB
            : process.env.EXPO_PUBLIC_API_URL_MOBILE;


    const fetchAvailableTimeslots = async () => {
        try {
            const response = await fetch(`${API_URL}/api/bookings/getAvailableTimeSlots/${courseId}/${startDate}`)
            const data = await response.json();
            setAvailableSlots(data.availableSlots);
            setBookingId(data.bookingId);
            setTimeSlotDuration(data.timeSlotDuration);
            setStartDate(startDate.setDate(startDate.getDate() + 14));
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchAvailableTimeslots();
    }, []);

    const handleBookAppointment = async () => {
        try {
            const response = await fetch(`${API_URL}/api/appointments/bookAppointment`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    selectedTimeSlot: selectedTimeSlot,
                    selectedDate: selectedDate,
                    bookingId: bookingId,
                    studentId: user._id,
                    timeSlotDuration: timeSlotDuration
                })
            });

            if (response.ok) {
                console.log("Appointment booked!");
            }

        } catch (err) {
            console.log(err);
        }
    }
    return (
        <SafeAreaView>
            {(!availableSlots) ? (
                <></>
            ) : (
                <View>
                    <FlatList
                        data={Object.keys(availableSlots)}
                        horizontal={true}
                        keyExtractor={item => item}
                        onEndReachedThreshold={0.7}
                        onEndReached={fetchAvailableTimeslots()}
                        renderItem={({ item }) =>
                            <Pressable onPress={() => setSelectedDate(item)}>
                                <Text>
                                    {item.getMonth()}
                                    {item.getDate()}
                                </Text>
                            </Pressable>
                        }
                    >
                    </FlatList>
                </View>
            )}
            {(!selectedDate) ? (
                <Text> Select a date to view available times </Text>
            ) : (
                <View>
                    <FlatList
                        data={availableSlots[selectedDate]}
                        keyExtractor={item => item}
                        renderItem={({ item }) =>
                            <Pressable onPress={() => setSelectedTimeSlot}>
                                <Text> {item} </Text>
                            </Pressable>
                        }
                    >
                    </FlatList>
                </View>
            )}
            {(!selectedTimeSlot) ? (
                <></>
            ) : (
                <Pressable onPress={handleBookAppointment}>
                    <Text> Make an appointment</Text>
                </Pressable>
            )}
        </SafeAreaView>
    );
}