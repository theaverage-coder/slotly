import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { Alert, FlatList, Keyboard, Platform, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import MyButton2 from "../../../../../components/MyButton2";
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
    const [message, setMessage] = useState("");
    const router = useRouter();

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
            //setStartDate(startDate.setDate(startDate.getDate() + 14));
        } catch (err) {
            console.log(err);
        }
    };

    useFocusEffect(useCallback(() => {
        fetchAvailableTimeslots();
    }, [])
    );

    const handleBookAppointment = async () => {
        const token = await AsyncStorage.getItem("token");

        try {
            const response = await fetch(`${API_URL}/api/appointments/bookAppointment`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    selectedTimeSlot: selectedTimeSlot,
                    bookingId: bookingId,
                    timeSlotDuration: timeSlotDuration,
                    message: message,
                })
            });

            if (response.ok) {
                Alert.alert("Appointment booked!");
                router.back();
            } else {
                console.log("Failed to book appointment");
            }

        } catch (err) {
            console.log(err);
        }
    }

    const getMonthAndDay = (str) => {
        return str.split("-");
    }

    const getTimeString = (date) => {
        return new Date(date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    }

    return (
        <Pressable style={styles.screenContainer} onPress={Keyboard.dismiss}>
            {(!availableSlots) ? (
                <Text> No available time slots</Text>
            ) : (
                <>
                    <View style={styles.title}>
                        <Text style={styles.titleText}> Pick a Date and Time </Text>
                    </View>
                    <View>
                        <FlatList
                            data={Object.keys(availableSlots)}
                            horizontal={true}
                            keyExtractor={item => item}
                            //onEndReachedThreshold={0.9}
                            //onEndReached={fetchAvailableTimeslots()}
                            renderItem={({ item }) => {
                                const monthAndDay = getMonthAndDay(item);
                                return (
                                    <Pressable
                                        style={[styles.dateCard, availableSlots[item].length !== 0 && styles.availableDate, selectedDate === item && styles.selectedDate]}
                                        onPress={() => setSelectedDate(item)}>
                                        <Text style={[styles.dayOfWeekText, availableSlots[item].length !== 0 ? styles.white : styles.grey]}>
                                            {monthAndDay[0]}
                                        </Text>
                                        <Text style={availableSlots[item].length !== 0 ? styles.white : styles.grey}>
                                            {monthAndDay[1]} {monthAndDay[2]}
                                        </Text>
                                    </Pressable>
                                )
                            }}
                        >
                        </FlatList>
                    </View>
                </>
            )}
            <View style={styles.timeSlotsContainer}>
                {(!selectedDate) ? (
                    <Text style={styles.header}> Select a date to view available times </Text>
                ) : (
                    <>
                        <Text style={styles.header}> Available Times </Text>
                        <FlatList
                            data={availableSlots[selectedDate]}
                            keyExtractor={item => item}
                            numColumns={4}
                            contentContainerStyle={{
                                alignItems: 'center',
                            }}
                            renderItem={({ item }) =>
                                <Pressable
                                    style={[styles.timeSlotCard, item === selectedTimeSlot && styles.selectedTimeSlot]}
                                    onPress={() => setSelectedTimeSlot(item)}>
                                    <Text style={item !== selectedTimeSlot && styles.white}> {getTimeString(item)} </Text>
                                </Pressable>
                            }
                        >
                        </FlatList>
                    </>
                )}
            </View>
            {(!selectedTimeSlot) ? (
                <></>
            ) : (
                <>
                    <View style={styles.messageContainer}>
                        <TextInput
                            style={styles.textField}
                            multiline={true}
                            placeholder="Add a message for your professor (ie. what the meeting is about)"
                            value={message}
                            onChangeText={(text) => setMessage(text)}
                        />
                    </View>

                    <MyButton2 onPress={handleBookAppointment} style={{ backgroundColor: "rgba(217, 217, 217, 1)", borderRadius: 10 }}>
                        <Text> Make an appointment</Text>
                    </MyButton2>
                </>
            )}
        </Pressable>
    );
}

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: "rgb(17, 21, 28)",
    },
    title: {
        marginVertical: 20,
        paddingLeft: 15
    },
    titleText: {
        color: "white",
        fontSize: 25,
        fontWeight: "bold",
    },
    dateCard: {
        marginHorizontal: 7,
        height: 80,
        width: 60,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(33, 45, 64, 0.2)",
        borderRadius: 10,
    },
    availableDate: {
        backgroundColor: "rgb(33, 45, 64)",
    },
    selectedDate: {
        borderWidth: 3,
        borderColor: "rgb(125, 78, 87)"
    },
    dayOfWeekText: {
        fontWeight: "bold",
        fontSize: 18,
        marginBottom: 5
    },
    timeSlotsContainer: {
        marginVertical: 30,
        flex: 1
    },
    timeSlotCard: {
        width: 70,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        marginHorizontal: 7,
        marginVertical: 10,
        backgroundColor: "rgb(33, 45, 64)",
    },
    selectedTimeSlot: {
        backgroundColor: "rgb(165, 104, 115)",
        borderWidth: 0,
    },
    textField: {
        width: "95%",
        height: 120,
        backgroundColor: "rgb(33, 45, 64)",
        borderRadius: 16,
        padding: 20,
        color: "rgba(255, 255, 255, 1)",
        marginBottom: 20
    },
    messageContainer: {
        alignItems: "center",
    },
    header: {
        color: "white",
        fontWeight: "bold",
        marginLeft: 15
    },
    white: {
        color: "white"
    },
    grey: {
        color: "grey"
    }
})