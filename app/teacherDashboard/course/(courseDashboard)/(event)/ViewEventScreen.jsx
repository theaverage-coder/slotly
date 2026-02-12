import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from "@react-native-vector-icons/ionicons";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Modal, Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import MyButton2 from "../../../../../components/MyButton2";

export default function ViewEventScreen() {
    const { eventObj } = useLocalSearchParams();
    const event = JSON.parse(eventObj);
    const [isModalVisible, setModalVisibility] = useState(false);
    const [students, setStudents] = useState([]);
    const [course, setCourse] = useState(null);
    const insets = useSafeAreaInsets();

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
        handleGetStudents();
    }, [])

    const handleDeleteEvent = async () => {
        const token = await AsyncStorage.getItem("token");

        try {
            await fetch(`${API_URL}/api/events/deleteEvent/${event._id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            })
        } catch (err) {
            console.log(err)
        }
    }

    const handleGetStudents = async () => {
        const token = await AsyncStorage.getItem("token");

        try {
            const response = await fetch(`${API_URL}/api/events/getStudents/${event._id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            });

            if (response.ok) {
                const data = await response.json();
                setStudents(data.students);
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <View style={styles.screenContainer}>
            {!event || !course ? (
                <></>
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

                    <Modal
                        visible={isModalVisible}
                        animationType="slide"
                    >
                        <View style={[
                            {
                                paddingTop: insets.top,
                                paddingBottom: insets.bottom,
                                paddingLeft: insets.left,
                                paddingRight: insets.right,
                            },
                            styles.modalContainer,
                        ]}>
                            <Pressable onPress={() => setModalVisibility(false)} style={styles.closeBtn}>
                                <Text style={styles.white}>
                                    Close
                                </Text>
                            </Pressable>
                            <Text style={[styles.white, styles.modalTitle]}> Attendees </Text>
                            <View style={styles.modalContent}>
                                <FlatList
                                    data={students}
                                    keyExtractor={item => item.email}
                                    renderItem={({ item }) =>
                                        <View style={{ marginBottom: 10 }}>
                                            <View style={{ flexDirection: "row" }}>
                                                <Ionicons size={20} color="white" name="person" />
                                                <Text style={styles.white}> {item.firstName} {item.lastName} </Text>
                                            </View>
                                            <View style={{ flexDirection: "row", paddingLeft: 30 }}>
                                                <Ionicons size={20} color="white" name="mail-outline" />
                                                <Text style={styles.white}> {item.email} </Text>
                                            </View>
                                        </View>
                                    } />
                            </View>
                        </View>
                    </Modal>

                    <MyButton2 onPress={() => setModalVisibility(true)}
                        style={{ backgroundColor: "white", borderRadius: 10 }}>
                        <Text>
                            View all attendees
                        </Text>
                    </MyButton2>
                    <MyButton2 onPress={handleDeleteEvent}
                        style={{ backgroundColor: "rgba(217, 217, 217, 0.49)", borderRadius: 10 }}>
                        <Text style={{ color: "red" }}>
                            Delete Event
                        </Text>
                    </MyButton2>
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