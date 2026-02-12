import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from "@react-native-vector-icons/ionicons";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { FlatList, Keyboard, Modal, Platform, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import MyButton2 from "../../../../../components/MyButton2";
import { useCourseContext } from "../../../../../contexts/CourseContext";

export default function CourseDetailsScreen() {
    const { courseId } = useCourseContext();
    const [course, setCourse] = useState(null);
    const [booking, setBooking] = useState(null);
    const router = useRouter();
    const [modalIsVisible, setModalVisibility] = useState(false);
    const [modalType, setModalType] = useState("");
    const [students, setStudents] = useState([]);
    const [newCourse, setNewCourse] = useState({
        courseCode: "",
        courseName: "",
        semester: "",
    })
    const disabledEditCourseBtn = !newCourse.courseCode && !newCourse.courseName && !newCourse.semester;

    const insets = useSafeAreaInsets();

    const API_URL =
        Platform.OS === 'web'
            ? process.env.EXPO_PUBLIC_API_URL_WEB
            : process.env.EXPO_PUBLIC_API_URL_MOBILE;

    useFocusEffect(useCallback(() => {
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
    }, []));

    const handleGetStudents = async () => {
        const token = await AsyncStorage.getItem("token");

        try {
            const response = await fetch(`${API_URL}/api/courses/getAllStudents/${courseId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            });

            if (response.ok) {
                const data = await response.json();
                setStudents(data);
            }
        } catch (err) {
            console.log(err);
        }
    }

    const handleDeleteCourse = async () => {
        const token = await AsyncStorage.getItem("token");

        try {
            const response = await fetch(`${API_URL}/api/courses/deleteCourse/${courseId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            })

            if (response.ok) {
                console.log("Course delete")
                router.push("teacherDashboard/CoursesScreen");
            } else {
                console.log("Failed to delete course")
            }
        } catch (err) {
            console.log(err);
        }
    }

    const handleOpenModal = (type) => {
        if (type === "students") {
            handleGetStudents();
        }

        setModalType(type);
        setModalVisibility(true);
    }

    const handleSubmitCourseChanges = async () => {
        const token = await AsyncStorage.getItem("token");

        try {
            const response = await fetch(`${API_URL}/api/courses/editCourse/${courseId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(newCourse),
            })

            const updatedCourse = await response.json();
            if (response.ok) {
                setCourse(updatedCourse);
                console.log("Updated course")
                setNewCourse({
                    courseCode: "",
                    courseName: "",
                    semester: "",
                })
                setModalVisibility(false);
            }
        } catch (err) {
            console.log(err)
        }
    }

    const renderModalContent = () => {
        switch (modalType) {
            case "students":
                return (
                    <>
                        <Text style={[styles.white, styles.modalTitle]}> Enrolled Students </Text>
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
                    </>
                );
            case "deleteCourse":
                return (
                    <>
                        <Text style={[styles.white, styles.modalTitle]}> Delete Course </Text>
                        <View style={[{ alignItems: "center", flex: 1 }]}>
                            <Text style={[styles.white, { marginBottom: 25 }]}> Are you sure you want to delete this course? </Text>
                            <MyButton2 style={{ backgroundColor: "rgb(167, 167, 167)" }} onPress={handleDeleteCourse}>
                                <Text style={{ color: "rgb(156, 49, 49)" }}> Delete </Text>
                            </MyButton2>
                        </View >
                    </>
                );
            case "link":
                return (
                    <>
                        <Text style={[styles.white, styles.modalTitle]}> Sign Up Link </Text>
                        <View style={[{ alignItems: "center", flex: 1 }]}>
                            <Text style={[styles.white, { marginBottom: 25 }]}> Send your students this invite code so they can sign up </Text>
                            <View style={styles.signUpLinkContainer}>
                                <Text style={[styles.white, styles.signUpLinkText]}> {course.signUpLink} </Text>
                            </View>
                        </View >
                    </>
                );
            case "bookingDetails":
                const daysOfWeek = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];
                return (
                    <>
                        <Text style={[styles.white, styles.modalTitle]}> Booking Details </Text>
                        <View style={styles.modalContent}>
                            {!booking ? (
                                <View >
                                    <Text> You haven't set your office hours yet </Text>
                                    <Text> Create a booking so students can book appointments with you </Text>
                                </View>
                            ) : (
                                <View>
                                    <View style={[styles.locationContainer, { marginBottom: 15 }]}>
                                        <Ionicons size={20} color="white" name="timer-outline" />
                                        <Text style={[styles.white, { fontSize: 15 }]}> {booking.timeSlotDuration} minute time slots</Text>
                                    </View>
                                    <Text style={styles.inputLabel}> Availabilities </Text>
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
                            )
                            }
                        </View>
                    </>
                );
            case "editCourse":
                return (
                    <>
                        <Text style={[styles.white, styles.modalTitle]}> Edit Course </Text>
                        <View style={styles.modalContent}>
                            <View style={styles.inputContainer}>
                                <Text style={styles.inputLabel}> COURSE CODE</Text>
                                <TextInput
                                    style={styles.inputField}
                                    placeholder={course.courseCode}
                                    value={newCourse.courseCode}
                                    onChangeText={(text) => setNewCourse(prev => ({
                                        ...prev,
                                        courseCode: text
                                    }))}
                                />
                            </View>
                            <View style={styles.inputContainer}>
                                <Text style={styles.inputLabel}> COURSE NAME </Text>
                                <TextInput
                                    style={styles.inputField}
                                    placeholder={course.courseName}
                                    value={newCourse.courseName}
                                    onChangeText={(text) => setNewCourse(prev => ({
                                        ...prev,
                                        courseName: text
                                    }))}
                                />
                            </View>
                            <View style={styles.inputContainer}>
                                <Text style={styles.inputLabel}> SEMESTER </Text>
                                <TextInput
                                    style={styles.inputField}
                                    placeholder={course.semester}
                                    value={newCourse.semester}
                                    onChangeText={(text) => setNewCourse(prev => ({
                                        ...prev,
                                        semester: text
                                    }))}
                                />
                            </View>
                            <MyButton2
                                disabled={disabledEditCourseBtn}
                                onPress={handleSubmitCourseChanges}
                                style={[{ backgroundColor: "rgba(217, 217, 217, 1)" }, disabledEditCourseBtn && styles.disabledButton]}>
                                <Text> Submit Changes</Text>
                            </MyButton2>
                        </View>
                    </>
                )
            default:
                return null;
        }
    }

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
                                <Pressable style={styles.option} onPress={() => handleOpenModal("editCourse")}>
                                    <Text style={styles.optionText}> Edit course details</Text>
                                </Pressable>
                                <View style={styles.optionLine} />

                                <Pressable style={styles.option} onPress={() => handleOpenModal("deleteCourse")}>
                                    <Text style={[styles.optionText, { color: "rgba(252, 84, 84, 0.5)" }]}> Delete course </Text>
                                </Pressable>
                            </View>
                        </View>

                        <View>
                            <Text style={styles.headingText}> Manage Students </Text>
                            <View style={styles.optionsContainer}>
                                <Pressable style={styles.option} onPress={() => handleOpenModal("link")}>
                                    <Text style={styles.optionText}> Invite students to join the course </Text>
                                </Pressable>
                                <View style={styles.optionLine} />
                                <Pressable style={styles.option} onPress={() => handleOpenModal("students")}>
                                    <Text style={styles.optionText}> View enrolled students </Text>
                                </Pressable>
                            </View>
                        </View>

                        <View>
                            <Text style={styles.headingText}> Manage Booking </Text>
                            <View style={styles.optionsContainer}>
                                <Pressable style={[styles.option, styles.optionWithBottomBorder]} onPress={() => handleOpenModal("bookingDetails")}>
                                    <Text style={styles.optionText}> View Booking Details </Text>
                                </Pressable>
                                <View style={styles.optionLine} />
                                <Pressable
                                    style={[styles.option, !booking && styles.disabledOption]}
                                    disabled={!booking}>
                                    <Text style={styles.optionText}> Modify Booking </Text>
                                </Pressable>
                            </View>
                        </View>

                    </View>


                    {!booking || booking.length === 0 && (
                        <MyButton2 style={{ backgroundColor: "rgba(217, 217, 217, 1)", textColor: "rgba(33, 33, 33, 1)" }} onPress={() => router.navigate("teacherDashboard/course/CreateBookingScreenOne")}>
                            <Text> Set Booking Hours </Text>
                        </MyButton2>
                    )
                    }

                    <Modal
                        visible={modalIsVisible}
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
                            <Pressable style={{ flex: 1 }} onPress={Keyboard.dismiss}>
                                <Pressable style={styles.closeBtn} onPress={() => setModalVisibility(false)}>
                                    <Text style={styles.white}> Close </Text>
                                </Pressable>
                                {renderModalContent()}
                            </Pressable>
                        </View>

                    </Modal>
                </>
            )
            }

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
    disabledOption: {
        backgroundColor: "rgba(92, 92, 92, 0.2)"
    },
    optionLine: {
        borderBottomWidth: 1,
        borderColor: "rgba(217, 217, 217, 0.2)",
        width: "90%"
    },
    optionText: {
        color: "white"
    },
    modalContainer: {
        flex: 1,
        backgroundColor: "rgba(33, 33, 33, 1)",
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
    signUpLinkContainer: {
        height: "10%",
        width: "70%",
        padding: 20,
        borderWidth: 1,
        borderColor: "rgb(125, 78, 87)",
        alignItems: "center",
        justifyContent: "center",
    },
    signUpLinkText: {
        fontWeight: "bold",
        color: "rgb(125, 78, 87)",
        fontSize: 18,
    },
    inputContainer: {
        gap: 5,
        marginBottom: 20
    },
    inputLabel: {
        color: "white",
        fontSize: 20
    },
    inputField: {
        width: "95%",
        height: 70,
        backgroundColor: "rgba(50, 50, 50, 1)",
        justifyContent: "center",
        borderRadius: 16,
        paddingLeft: 20,
        color: "rgba(255, 255, 255, 1)",
    },
    disabledButton: {
        opacity: 0.3
    },
    dayContainer: {
        marginLeft: 30,
        marginTop: 8
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
    }

})