import Ionicons from '@react-native-vector-icons/ionicons';
import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { useUser } from "../contexts/UserContext";

export default function ViewEventBase({ event }) {
    const { user } = useUser();
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

    useFocusEffect(useCallback(() => {
        fetchCourse();
    }, [])
    );

    return (
        <View style={{ flex: 1 }}>
            {!course ? (
                <> </>
            ) : (
                <>
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
                            <Text style={styles.detailsText}>
                                {event.capacity === -1
                                    ? `${event.students.length}`
                                    : `${event.students.length} / ${event.capacity}`} students signed up
                            </Text>

                        </View>
                        <View style={styles.descriptionContainer}>
                            <Text style={styles.sectionHeader}> Description </Text>
                            <View style={styles.descriptionBox}>
                                <Text style={styles.detailsText}> {event.description} </Text>
                            </View>
                        </View>
                    </View>
                </>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: "rgb(17, 21, 28)",
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
    },
    // Modal styles
    modalContainer: {
        flex: 1,
        backgroundColor: "rgb(17, 21, 28)",
    },
    modalContent: {
        paddingLeft: 20,
        flex: 1
    },
    closeBtn: {
        marginTop: 10,
        marginLeft: 15
    },
    modalTitle: {
        fontSize: 25,
        textAlign: "center",
        marginVertical: 20,
        fontWeight: "bold"
    },
    white: {
        color: "white"
    },
    attendeesBtn: {
        width: "90%",
        height: "10%",
        borderRadius: 10,
        backgroundColor: "white"
    }
})