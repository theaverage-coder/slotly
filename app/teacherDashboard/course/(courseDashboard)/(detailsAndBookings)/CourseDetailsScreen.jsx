import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import MyButton2 from "../../../../../components/MyButton2";
import { useCourseContext } from "../../../../../contexts/CourseContext";


export default function CourseDetailsScreen() {
    const { courseId } = useCourseContext();
    const [course, setCourse] = useState(null);
    const [booking, setBooking] = useState(null);
    const router = useRouter();

    const API_URL =
        Platform.OS === 'web'
            ? process.env.EXPO_PUBLIC_API_URL_WEB
            : process.env.EXPO_PUBLIC_API_URL_MOBILE;

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const response = await fetch(`${API_URL}/api/courses/getCourseById/${courseId}`);
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
    }, []);

    //useFocusEffect for bookings in case its modified ? 

    return (
        <View style={styles.screenContainer}>

            {!course ? (
                <></>
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
                    <View style={styles.line}></View>

                    <View style={styles.screenContent}>
                        <View>
                            <Text style={styles.headingText}> Manage Course </Text>
                            <View style={styles.optionsContainer}>
                                <Pressable style={styles.option}>
                                    <Text style={styles.optionText}> Edit course details</Text>
                                </Pressable>
                            </View>
                        </View>

                        <View>
                            <Text style={styles.headingText}> Manage Students </Text>
                            <View style={styles.optionsContainer}>
                                <Pressable style={styles.option}>
                                    <Text style={styles.optionText}> Invite students to join the course </Text>
                                </Pressable>
                                <View style={styles.optionLine} />
                                <Pressable style={styles.option}>
                                    <Text style={styles.optionText}> View enrolled students </Text>
                                </Pressable>
                            </View>
                        </View>

                        <View>
                            <Text style={styles.headingText}> Manage Booking </Text>
                            <View style={styles.optionsContainer}>
                                <Pressable style={[styles.option, styles.optionWithBottomBorder]}>
                                    <Text style={styles.optionText}> View Booking Details </Text>
                                </Pressable>
                                <View style={styles.optionLine} />
                                <Pressable style={styles.option}>
                                    <Text style={styles.optionText}> Modify Booking </Text>
                                </Pressable>
                            </View>
                        </View>

                    </View>


                    {!booking ? (
                        <MyButton2 onPress={() => router.navigate("teacherDashboard/course/CreateBookingScreenOne")}>
                            <Text> Set Booking Hours </Text>
                        </MyButton2>
                    ) : (
                        <MyButton2 style={{ backgroundColor: "rgba(217, 217, 217, 1)", textColor: "rgba(33, 33, 33, 1)" }}>
                            <Text> Modify Booking</Text>
                        </MyButton2>
                    )
                    }
                </>
            )
            }


            <MyButton2 style={{ backgroundColor: "rgba(110, 110, 110, 0.5)", }}>
                <Text style={{ color: "rgba(252, 84, 84, 0.5)" }}> Delete Course </Text>
            </MyButton2>
        </View>
    )
}

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: "rgba(33, 33, 33, 1)",
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
    screenContent: {
        flex: 1,
        rowGap: 25,
        width: "100%",
        padding: 20
    },

    optionsContainer: {
        backgroundColor: "rgba(92, 92, 92, 0.5)",
        borderRadius: 16,
        marginTop: 7,
        alignItems: "center"
    },
    headingText: {
        fontSize: 14,
        fontWeight: "bold",
        color: "rgba(217, 217, 217, 0.5)"
    },
    option: {
        paddingLeft: 12,
        justifyContent: "center",
        height: 50,
        width: "100%"
    },
    optionLine: {
        borderBottomWidth: 1,
        borderColor: "rgba(217, 217, 217, 0.2)",
        width: "90%"
    },
    optionText: {
        color: "white"
    }

})