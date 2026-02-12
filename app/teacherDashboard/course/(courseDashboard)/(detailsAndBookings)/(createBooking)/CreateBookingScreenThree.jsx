import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Modal, Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MyButton2 from "../../../../../../components/MyButton2";
import { useBookingContext } from "../../../../../../contexts/BookingContext";
import { useCourseContext } from "../../../../../../contexts/CourseContext";

export default function CreateBookingScreenThree() {
    const { daysAvailable, timeSlotDuration, setTimeSlotDuration, isSameHours, sameHours } = useBookingContext();
    const { courseId } = useCourseContext();
    const [modalIsVisible, setModalVisibility] = useState(false);
    const router = useRouter();

    const API_URL =
        Platform.OS === 'web'
            ? process.env.EXPO_PUBLIC_API_URL_WEB
            : process.env.EXPO_PUBLIC_API_URL_MOBILE;

    const handleCreateBooking = async () => {
        const token = await AsyncStorage.getItem("token");
        let officeHours = [];

        officeHours = Object.entries(daysAvailable).filter(([key, value]) =>
            value.isAvailable).map(([key, value], index) => ({ day: index, timeIntervals: isSameHours ? sameHours : value.timeIntervals }))

        try {
            const response = await fetch(`${API_URL}/api/bookings/createBooking`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    courseId: courseId,
                    officeHours: officeHours,
                    timeSlotDuration: timeSlotDuration,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                console.log("Succesfully created booking");
                router.replace("teacherDashboard/HomeScreen")
            }
        } catch (err) {
            console.log("Unsucessful");
            console.log(err);
        }
    };

    return (
        <SafeAreaView style={styles.screenContainer}>
            <View style={styles.timeSlotDurationContainer}>
                <Text style={[styles.text, { width: "55%" }]}>
                    Duration of each appointment:
                </Text>
                <Pressable style={styles.timeSlotDurationButton} onPress={() => setModalVisibility(true)}>
                    <Text >
                        {timeSlotDuration} minutes
                    </Text>
                </Pressable>

            </View>

            <Modal visible={modalIsVisible} transparent animationType='slide'>
                <View style={styles.modal}>
                    <View style={styles.modalContent}>
                        <Pressable onPress={() => setModalVisibility(false)}>
                            <Text>
                                Close
                            </Text>
                        </Pressable>
                        <Picker
                            selectedValue={timeSlotDuration}
                            onValueChange={(itemValue, itemIndex) => setTimeSlotDuration(itemValue)}>
                            <Picker.Item label="5 minutes" value={5} />
                            <Picker.Item label="10 minutes" value={10} />
                            <Picker.Item label="15 minutes" value={15} />
                            <Picker.Item label="20 minutes" value={20} />
                            <Picker.Item label="30 minutes" value={30} />
                            <Picker.Item label="60 minutes" value={60} />
                        </Picker>
                    </View>
                </View>
            </Modal>

            <MyButton2 onPress={handleCreateBooking} style={{ backgroundColor: "rgba(217, 217, 217, 1)" }}>
                <Text> Create Booking </Text>
            </MyButton2>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    screenContainer: {
        backgroundColor: "rgba(33, 33, 33, 1)",
        flex: 1,
        rowGap: 20,
    },
    modal: {
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    modalContent: {
        height: "40%",
        backgroundColor: "rgba(33, 33, 33, 1)",
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        padding: 15
    },
    timeSlotDurationButton: {
        backgroundColor: "rgba(217, 217, 217, 0.5)",
        padding: 5,
        borderRadius: 5
    },
    timeSlotDurationContainer: {
        flexDirection: "row",
        columnGap: 15,
        marginLeft: 5,
        height: "5%",
        alignItems: "center"
    },
    text: {
        color: "rgba(217, 217, 217, 1)"
    },
})