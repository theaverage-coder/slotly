// shows details of event eg. title, location, signedUp/capacity,
// if not signed up -> button at bottom to sign up which pulls up a modal to confirm
// if signed up -> tells you that you have already joined the event, gives an option to deregister
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from "@react-native-vector-icons/ionicons";
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
        const token = await AsyncStorage.getItem("token");

        try {
            const response = await fetch(`${API_URL}/api/events/joinEvent/${event._id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
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
        const token = await AsyncStorage.getItem("token");

        try {
            const response = await fetch(`${API_URL}/api/events/leaveEvent/${event._id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
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
            {!event || !course ? (
                <></>
            ) : (
                <>
                    {isJoined && (
                        <View style={[styles.horizontalContainer, styles.joinedEventBanner]}>
                            <Ionicons size={50} color="white" name="checkmark-circle" />
                            <Text style={styles.joinedEventText}> Joined Event </Text>
                        </View>
                    )}
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}> {event.title} </Text>
                    </View>
                    <View style={styles.detailsContainer}>
                        <Text style={styles.courseText}> {course.courseCode}: {course.courseName} </Text>

                        <Text style={styles.sectionHeader}> Details </Text>

                        <View style={styles.horizontalContainer}>
                            <Ionicons size={15} color="white" name="calendar" />
                            <Text style={styles.detailsText}>{new Date(event.startTime).toDateString()} </Text>
                        </View>
                        <View style={styles.horizontalContainer}>
                            <Ionicons size={15} color="white" name="time" />
                            <Text style={styles.detailsText}>
                                {new Date(event.startTime).toLocaleTimeString([], {
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })} -
                                {new Date(event.endTime).toLocaleTimeString([], {
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })}
                            </Text>
                        </View>
                        <View style={styles.horizontalContainer}>
                            <Ionicons size={15} color="white" name="location" />
                            <Text style={styles.detailsText}> {event.location} </Text>
                        </View>
                        <View style={styles.horizontalContainer}>
                            <Ionicons size={15} color="white" name="people" />
                            <Text style={styles.detailsText}> {event.capacity === -1
                                ? `${event.students.length}`
                                : `${event.students.length} / ${event.capacity}`} students signed up</Text>

                        </View>
                        <View style={styles.descriptionContainer}>
                            <Text style={styles.sectionHeader}> Description </Text>
                            <View style={styles.descriptionBox}>
                                <Text style={styles.detailsText}> {event.description} </Text>
                            </View>
                        </View>

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
    },
    titleContainer: {
        alignItems: "center",
        marginTop: 20
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
        paddingLeft: 20,
        rowGap: 12,
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
        fontSize: 15,
    },
    descriptionContainer: {
        marginTop: 20,
        gap: 10
    },
    descriptionBox: {
        paddingHorizontal: 25,
        width: "60%",
        justifyContent: "center",
    },
    horizontalContainer: {
        flexDirection: "row",
        gap: 10,
        paddingLeft: 20,
        alignItems: "center"
    },
    joinedEventBanner: {
        backgroundColor: "rgb(125, 78, 87)",
        height: "10%",
        gap: 5
    },
    joinedEventText: {
        color: "white",
        fontSize: 18
    }
})