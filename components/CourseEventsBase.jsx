import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useCourseContext } from "../contexts/CourseContext";
import API_URL from '../utils/api';
import BackgroundSlotlyLogo from "./BackgroundSlotlyLogo";
import EventCard from "./EventCard";

export default function CourseEventsBase() {
    const { courseId } = useCourseContext();
    const [events, setEvents] = useState([]);

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