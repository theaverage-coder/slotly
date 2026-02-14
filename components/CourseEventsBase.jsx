import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { FlatList, Platform, StyleSheet, Text, View } from "react-native";
import { useCourseContext } from "../contexts/CourseContext";
import { useUser } from "../contexts/UserContext";
import BackgroundSlotlyLogo from "./BackgroundSlotlyLogo";
import EventCard from "./EventCard";

export default function CourseEventsBase() {
    const router = useRouter();
    const { courseId } = useCourseContext();
    const [events, setEvents] = useState([]);
    const { user } = useUser();

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
        <View style={{ flex: 1 }}>
            {events.length === 0 ? (
                <View style={styles.noEventsTextContainer}>
                    <BackgroundSlotlyLogo />
                    <Text style={styles.noEventsText}>
                        No ongoing events
                    </Text>
                </View>
            ) : (
                <FlatList
                    style={styles.eventsList}
                    contentContainerStyle={{ gap: 20, alignItems: "center" }}
                    data={events}
                    keyExtractor={item => item._id}
                    renderItem={({ item }) => <EventCard event={item} />}
                />
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    noEventsTextContainer: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1
    },
    noEventsText: {
        fontSize: 20,
        color: "white"
    },
})