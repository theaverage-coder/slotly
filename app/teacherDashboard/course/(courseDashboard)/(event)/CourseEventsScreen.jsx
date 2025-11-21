import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { FlatList, Platform, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import EventCard from "../../../../../components/EventCard";
import MyButton2 from "../../../../../components/MyButton2";
import { useCourseContext } from "../../../../../contexts/CourseContext";

export default function CourseEventsScreen() {
    const router = useRouter();
    const { courseId } = useCourseContext();
    const [events, setEvents] = useState([]);

    const API_URL =
        Platform.OS === 'web'
            ? process.env.EXPO_PUBLIC_API_URL_WEB
            : process.env.EXPO_PUBLIC_API_URL_MOBILE;

    useFocusEffect(useCallback(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch(`${API_URL}/api/events/getAllEvents/${courseId}`);
                if (response.ok) {
                    const data = await response.json();
                    setEvents(data);
                }
            } catch (err) {
                console.log("Failed to retrieve events: ", err);
            }
        }

        fetchEvents();
    }, [])
    );

    return (
        <SafeAreaView style={styles.screenContainer}>
            <View style={{ flex: 1 }}>
                {events.length === 0 ? (
                    <View style={styles.noEventsTextContainer}>
                        <Text style={styles.noEventsText}>
                            No ongoing events
                        </Text>
                    </View>
                ) : (
                    <FlatList
                        data={events}
                        keyExtractor={item => item._id}
                        renderItem={({ item }) => <EventCard event={item} />}
                    />
                )}
            </View>

            <MyButton2 onPress={() => router.navigate("teacherDashboard/course/CreateEventScreenOne")} style={{ backgroundColor: "rgba(217, 217, 217, 1)", textColor: "rgba(33, 33, 33, 1)" }}>
                <Text> Create Event </Text>
            </MyButton2>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: "rgba(33, 33, 33, 1)",
    },
    noEventsTextContainer: {
        justifyContent: "center",
        alignItems: "center"
    },
    noEventsText: {
        fontSize: 15,
    }
})