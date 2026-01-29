import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
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

    return (
        <>
            {(!course) ? (
                <Text> {courseId} </Text>
            ) : (
                <View style={styles.screenContainer}>
                    <Text>
                        {course.courseCode} : {course.courseName}
                    </Text>
                    <Text>
                        {course.prof}
                    </Text>
                    <Text>
                        {course.semester}
                    </Text>
                    <Text>
                        Location & Time of Course ?
                    </Text>
                    {booking && <Text> Booking found </Text>}
                    <Text>
                        INSERT LEAVE COURSE BUTTON
                    </Text>

                    <MyButton2 onPress={() => router.push("studentDashboard/course/BookAppointmentScreen")}>
                        <Text> Book an Appointment</Text>
                    </MyButton2>
                </View>
            )}
        </>
    );
}

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: "rgba(33, 33, 33, 1)",
    }
})