import { useEffect, useState } from "react";
import { Platform, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCourseContext } from "../../../../contexts/CourseContext";

export default function CourseDetailsScreen() {
    const { courseId } = useCourseContext();
    const [course, setCourse] = useState(null);

    const API_URL =
        Platform.OS === 'web'
            ? process.env.EXPO_PUBLIC_API_URL_WEB
            : process.env.EXPO_PUBLIC_API_URL_MOBILE;

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const response = await fetch(`${API_URL}/api/courses/getCourseById/${courseId}`)
                const data = await response.json();
                setCourse(data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchCourse();
    }, []);

    return (
        <SafeAreaView>
            {(!course) ? (
                <></>
            ) : (
                <>
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
                    <Text>
                        DISPLAY OFFICE HOURS eg.
                        Monday 3:00-5:00
                        Wednesday 1:00-3:00
                    </Text>
                    <Text>
                        INSERT LEAVE COURSE BUTTON
                    </Text>
                </>
            )}
        </SafeAreaView>
    );
}