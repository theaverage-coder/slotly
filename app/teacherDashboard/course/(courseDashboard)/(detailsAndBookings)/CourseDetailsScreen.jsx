import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Platform, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
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
        <SafeAreaView style={{ flex: 1 }}>

            {!course ? (
                <></>
            ) : (
                <>

                    <Text>
                        {course.courseCode}
                        {course.courseName}
                    </Text>
                    {!booking ? (
                        <></>
                    ) : (
                        <>
                            <Text> Booking Details </Text>
                            <Text> {booking.officeHours} </Text>
                        </>
                    )}
                    {!booking ? (
                        <MyButton2 onPress={() => router.navigate("teacherDashboard/course/CreateBookingScreenOne")}>
                            <Text> Set Booking Hours </Text>
                        </MyButton2>
                    ) : (
                        <MyButton2>
                            <Text> Modify Booking</Text>
                        </MyButton2>
                    )
                    }
                </>
            )
            }



        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

})