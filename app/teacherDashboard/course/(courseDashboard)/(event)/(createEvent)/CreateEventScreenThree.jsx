import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { Keyboard, Platform, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MyButton2 from "../../../../../../components/MyButton2";
import { useCourseContext } from "../../../../../../contexts/CourseContext";
import { useEventContext } from "../../../../../../contexts/EventContext";

export default function CreateEventScreenThree() {
    const { event, setEvent } = useEventContext();
    const { courseId } = useCourseContext();
    const router = useRouter();

    const API_URL =
        Platform.OS === 'web'
            ? process.env.EXPO_PUBLIC_API_URL_WEB
            : process.env.EXPO_PUBLIC_API_URL_MOBILE;

    const handleCreateEvent = async () => {
        const token = await AsyncStorage.getItem("token");

        const newEvent = {
            course: courseId,
            title: event.title,
            startTime: event.startTime,
            endTime: event.endTime,
            location: event.location,
            ...(event.isLimitedCapacity ? { capacity: event.capacity } : { capacity: -1 }),
            ...(event.description !== "" && { description: event.description }),
        }

        try {
            const response = await fetch(`${API_URL}/api/events/createEvent`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(newEvent),
            });

            if (response.ok) {
                console.log("Event created!");
                router.navigate("teacherDashboard/course/CourseEventsScreen")
            }
        } catch (err) {
            console.log("Failed to create event:", err);
        }
    }
    return (
        <SafeAreaView style={styles.screenContainer}>
            <Pressable onPress={Keyboard.dismiss} style={{ flex: 1 }}>
                <View style={styles.header}>
                    <Text style={styles.title}>
                        Add Reminders or Additional Details
                    </Text>
                    <Text style={styles.description}>
                        Add event details and/or reminders eg. equipment to bring
                    </Text>
                </View>
                <View style={styles.inputFields}>
                    <TextInput
                        style={styles.textField}
                        placeholder="Additional details"
                        value={event.description}
                        onChangeText={(text) => setEvent(prev => ({ ...prev, description: text }))}
                    />
                </View>
                <MyButton2
                    onPress={handleCreateEvent}
                    style={{ backgroundColor: "rgba(217, 217, 217, 1)" }}>
                    <Text> Create Event </Text>
                </MyButton2>
            </Pressable>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: "rgba(33, 33, 33, 1)"
    },
    header: {
        gap: 15,
        marginLeft: 15,
    },
    title: {
        color: "rgba(255, 255, 255, 1)",
        fontFamily: "Urbanist",
        fontSize: 34,
        fontWeight: 700
    },
    description: {
        color: "rgba(117, 117, 117, 1)",
        fontFamily: "Urbanist",
        fontSize: 18,
        fontWeight: 500
    },
    inputFields: {
        flex: 1,
        alignItems: "center",
        paddingTop: 30,
        gap: 20
    },
    textField: {
        width: "95%",
        height: 60,
        backgroundColor: "rgba(50, 50, 50, 1)",
        justifyContent: "center",
        borderRadius: 16,
        paddingLeft: 20,
        color: "rgba(255, 255, 255, 1)",
    },
})