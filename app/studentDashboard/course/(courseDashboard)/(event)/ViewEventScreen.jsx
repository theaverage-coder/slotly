// shows details of event eg. title, location, signedUp/capacity,
// if not signed up -> button at bottom to sign up which pulls up a modal to confirm
// if signed up -> tells you that you have already joined the event, gives an option to deregister

import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import MyButton2 from "../../../../../components/MyButton2";
import { useUser } from "../../../../../contexts/UserContext";

export default function ViewEventScreen() {
    const { initialEventObj } = useLocalSearchParams();
    const initialEvent = JSON.parse(initialEventObj);
    const [modalIsVisible, setModalVisibility] = useState(false);
    const { user } = useUser();
    const [event, setEvent] = useState(initialEvent);
    const [course, setCourse] = useState(null);

    const API_URL =
        Platform.OS === 'web'
            ? process.env.EXPO_PUBLIC_API_URL_WEB
            : process.env.EXPO_PUBLIC_API_URL_MOBILE;

    /*
    const fetchEvent = async () => {
        const res = await fetch(`${API_URL}/api/events/getEvent/${event._id}`);
        const data = await res.json();
        setEvent(data);
    };*/
    const fetchCourse = async () => {
        try {
            const response = await fetch(`${API_URL}/api/courses/getCourseById/${event.course}`);

            if (response.ok) {
                const data = await response.json();
                setCourse(data);

            }
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchCourse();
    }, [])

    const isFull = event?.students?.length >= event?.capacity;
    const isJoined = event?.students?.includes(user._id);

    const handleJoinEvent = async () => {
        try {
            const response = await fetch(`${API_URL}/api/events/joinEvent/${event._id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userId: user._id
                }),
            });

            const updatedEvent = await response.json();
            console.log("returned: ", updatedEvent)
            if (response.ok) {
                setEvent(updatedEvent);
                console.log("Joined event")
            }
        } catch (err) {
            console.log("Failed to join event", err)
        }
    }

    const handleLeaveEvent = async () => {
        try {
            const response = await fetch(`${API_URL}/api/events/leaveEvent/${event._id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userId: user._id
                }),
            });

            const updatedEvent = await response.json();

            if (response.ok) {
                setEvent(updatedEvent);
                console.log("Left event")
            }
        } catch (err) {
            console.log("Failed to leave event", err)
        }
    }

    return (
        <View style={styles.screenContainer}>
            {!event ? (
                <></>
            ) : (
                <>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}> {event.title} </Text>
                    </View>
                    <View style={styles.detailsContainer}>
                        <Text style={styles.courseText}> {course.courseCode}: {course.courseName} </Text>
                        <Text style={styles.detailsText}> CALENDAR ICON {new Date(event.startTime).toDateString()} </Text>
                        <Text style={styles.detailsText}>
                            CLOCK ICON
                            {new Date(event.startTime).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit'
                            })} -
                            {new Date(event.endTime).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit'
                            })}
                        </Text>
                        <View style={styles.descriptionContainer}>
                            <Text style={styles.sectionHeader}> Description </Text>
                            <View style={styles.descriptionBox}>
                                <Text> {event.description} </Text>
                            </View>
                        </View>
                        <Text style={styles.detailsText}> {event.students.length} / {event.capacity} students signed up</Text>
                        <Text style={styles.sectionHeader}> Location </Text>
                        <Text style={styles.detailsText}> {event.location} </Text>
                    </View>
                    {!isJoined ? (
                        !isFull ? (
                            <MyButton2 onPress={handleJoinEvent}
                                style={{ backgroundColor: "rgba(217, 217, 217, 1)", borderRadius: 10 }}>
                                <Text> Join Event </Text>
                            </MyButton2>
                        ) : (
                            <Text> Event is full. </Text>
                        )
                    ) : (
                        <MyButton2 onPress={handleLeaveEvent}
                            style={{ backgroundColor: "rgba(217, 217, 217, 0.49)", borderRadius: 10 }}>
                            <Text style={{ color: "red" }}> Leave Event </Text>
                        </MyButton2>

                    )}
                </>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: "rgba(33, 33, 33, 1)",
        paddingTop: 20
    },
    titleContainer: {
        alignItems: "center"
    },
    title: {
        color: "rgba(255, 255, 255, 1)",
        fontFamily: "Urbanist",
        fontSize: 34,
        fontWeight: 700,
        paddingLeft: 15,
        paddingBottom: 15
    },
    detailsContainer: {
        flex: 1,
        paddingLeft: 15,
        rowGap: 12
    },
    courseText: {
        color: "white",
        fontSize: 20
    },
    detailsText: {
        color: "white",
        fontSize: 15
    },
    sectionHeader: {
        color: "white",
        fontWeight: "bold",
        fontSize: 15
    },
    descriptionBox: {
        padding: 25,
        width: "60%",
        justifyContent: "center",
    }
})