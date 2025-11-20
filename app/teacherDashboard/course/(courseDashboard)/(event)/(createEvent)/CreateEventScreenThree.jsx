import { Platform, StyleSheet, Text, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MyButton2 from "../../../../../../components/MyButton2";
import { useCourseContext } from "../../../../../../contexts/CourseContext";
import { useEventContext } from "../../../../../../contexts/EventContext";

export default function CreateEventScreenThree() {
    const { event, setEvent } = useEventContext();
    const { courseId } = useCourseContext();

    const API_URL =
        Platform.OS === 'web'
            ? process.env.EXPO_PUBLIC_API_URL_WEB
            : process.env.EXPO_PUBLIC_API_URL_MOBILE;

    const handleCreateEvent = async () => {
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
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newEvent),
            });

            if (response.ok) {
                console.log("Event created!");
            }
        } catch (err) {
            console.log("Failed to create event:", err);
        }
    }
    return (
        <SafeAreaView style={styles.screenContainer}>
            <TextInput
                placeholder="Add event details and/or reminders eg. equipment to bring"
                value={event.description}
                onChangeText={(text) => setEvent(prev => ({ ...prev, description: text }))}
            />

            <MyButton2 onPress={handleCreateEvent} style={{ backgroundColor: "rgba(217, 217, 217, 1)", textColor: "rgba(33, 33, 33, 1)" }}>
                <Text> Create Event </Text>
            </MyButton2>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: "rgba(33, 33, 33, 1)"
    }
})