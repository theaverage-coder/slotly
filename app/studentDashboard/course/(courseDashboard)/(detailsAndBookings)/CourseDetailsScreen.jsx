import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from "@react-native-vector-icons/ionicons";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { Alert, FlatList, Platform, StyleSheet, Text, View } from "react-native";
import MyButton2 from "../../../../../components/MyButton2";
import { useCourseContext } from "../../../../../contexts/CourseContext";

export default function CourseDetailsScreen() {
    const { courseId } = useCourseContext();
    const [course, setCourse] = useState(null);
    const [booking, setBooking] = useState(null);
    const router = useRouter();
    const daysOfWeek = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];


    const API_URL =
        Platform.OS === 'web'
            ? process.env.EXPO_PUBLIC_API_URL_WEB
            : process.env.EXPO_PUBLIC_API_URL_MOBILE;

    useFocusEffect(useCallback(() => {
        const fetchCourse = async () => {
            try {
                const response = await fetch(`${API_URL}/api/courses/getCourseById/${courseId}`)

                if (response.ok) {
                    const data = await response.json();
                    setCourse(data);
                }
            } catch (err) {
                console.log(err);
            }
        }

        const fetchBooking = async () => {
            try {
                const response = await fetch(`${API_URL}/api/bookings/getBooking/${courseId}`);
                if (response.ok) {
                    const data = await response.json();
                    setBooking(data);
                }
            } catch (err) {
                console.log(err);
            }
        }
        fetchCourse();
        fetchBooking();
    }, []));

    const handleLeaveCourse = async () => {
        const token = await AsyncStorage.getItem("token");

        try {
            const response = await fetch(`${API_URL}/api/courses/leaveCourse/${courseId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            });

            if (response.ok) {
                console.log("Left course")
                router.push("studentDashboard/course/CoursesScreen");
            }
            else {
                Alert.alert("Failed to leave course.")
            }
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <View style={styles.screenContainer}>
            {(!course) ? (
                <Text> {courseId} </Text>
            ) : (
                <>
                    <View style={styles.courseTitleContainer}>
                        <Text style={styles.courseTitle}>
                            {course.courseCode}: {course.courseName}
                        </Text>
                    </View>
                    <View style={styles.semesterContainer}>
                        <Text style={styles.semesterText}> {course.semester} </Text>
                    </View>
                    <View style={styles.line} />
                    <View style={styles.screenContent}>
                        <View>
                            <Text style={styles.headingText}> Professor</Text>
                            <Text style={[styles.white, { paddingLeft: 10 }]}>
                                {course.prof.firstName} {course.prof.lastName}
                            </Text>
                        </View>
                        <View>
                            <Text style={styles.headingText}> Email </Text>
                            <Text style={[styles.white, { paddingLeft: 10 }]}>
                                {course.prof.email}
                            </Text>
                        </View>
                        <Text style={styles.headingText}>Office Hours </Text>
                        {booking ? (
                            <>
                                <View style={{ flex: 1 }}>
                                    <FlatList
                                        data={booking.officeHours}
                                        keyExtractor={item => item.day}
                                        renderItem={({ item }) =>
                                            <View style={styles.dayContainer}>
                                                <View style={styles.locationContainer}>
                                                    <Ionicons size={20} color="rgb(134, 134, 134)" name="today-outline" />
                                                    <Text style={styles.dayOfWeek}> {daysOfWeek[item.day]} </Text>
                                                </View>
                                                {item.timeIntervals.map((interval) => (
                                                    <View style={styles.timeContainer} key={interval.start}>
                                                        <Text style={styles.white}> {new Date(interval.start).toLocaleTimeString([], {
                                                            hour: '2-digit',
                                                            minute: '2-digit'
                                                        })}
                                                            -
                                                            {new Date(interval.end).toLocaleTimeString([], {
                                                                hour: '2-digit',
                                                                minute: '2-digit'
                                                            })}
                                                        </Text>
                                                        {interval.location && (
                                                            <View style={styles.locationContainer}>
                                                                <Ionicons size={15} color="white" name="pin" />
                                                                <Text style={styles.white}> {interval.location}</Text>
                                                            </View>
                                                        )}
                                                    </View>
                                                ))}
                                            </View>}
                                    />
                                </View>
                            </>
                        ) : (
                            <View style={styles.noOfficeHoursContainer}>
                                <Text style={styles.noOfficeHoursText}> Your professor hasn't set any office hours yet</Text>
                            </View>
                        )}
                    </View>
                    <MyButton2
                        onPress={() => router.push("studentDashboard/course/BookAppointmentScreen")}
                        style={booking ? { backgroundColor: "rgba(217, 217, 217, 1)" } : { backgroundColor: "rgba(217, 217, 217, 0.2)" }}
                        disabled={!booking}>
                        <Text> Book an Appointment</Text>
                    </MyButton2>
                    <MyButton2 onPress={handleLeaveCourse} style={{ backgroundColor: "rgba(217, 217, 217, 0.2)" }}>
                        <Text style={{ color: "rgb(218, 33, 33)" }}> Leave Course</Text>
                    </MyButton2>
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: "rgb(17, 21, 28)",
        alignItems: "center"
    },
    courseTitleContainer: {
        padding: 20,
        alignItems: "center",
        paddingBottom: 10
    },
    courseTitle: {
        color: "white",
        fontSize: 25,
        fontWeight: "bold",
        textAlign: "center"
    },
    semesterContainer: {
        alignItems: "center",
    },
    semesterText: {
        color: "white",
        fontSize: 18
    },
    line: {
        borderBottomWidth: 1,
        marginTop: 15,
        width: "90%",
        borderColor: "rgba(217, 217, 217, 0.5)",
    },
    headingText: {
        fontSize: 14,
        fontWeight: "bold",
        color: "rgba(217, 217, 217, 0.5)",
        marginBottom: 5
    },
    dayContainer: {
        marginLeft: 30,
        marginBottom: 8
    },
    screenContent: {
        flex: 1,
        rowGap: 15,
        width: "100%",
        paddingHorizontal: 20,
        paddingTop: 20
    },
    timeContainer: {
        marginLeft: 40,
        marginVertical: 8,
        gap: 5
    },
    dayOfWeek: {
        color: "rgb(134, 134, 134)",
        fontSize: 15,
        fontWeight: "bold",
    },
    locationContainer: {
        flexDirection: "row",
        alignItems: "center"
    },
    white: {
        color: "white"
    },
    availabilitiesText: {
        color: "white",
        fontSize: 20
    },
    noOfficeHoursContainer: {
        justifyContent: "center",
        flex: 1,
        alignItems: "center"
    },
    noOfficeHoursText: {
        color: "white",
        fontSize: 15,

    }
})