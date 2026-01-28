import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { FlatList, Platform, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CourseCard from "../../../components/CourseCard";
import DashboardHeader from "../../../components/DashboardHeader";
import MyButton2 from "../../../components/MyButton2";
import { useUser } from "../../../contexts/UserContext";

export default function CoursesScreen() {
    const { user } = useUser();
    const [courses, setCourses] = useState([]);
    const router = useRouter();

    const API_URL =
        Platform.OS === 'web'
            ? process.env.EXPO_PUBLIC_API_URL_WEB
            : process.env.EXPO_PUBLIC_API_URL_MOBILE;

    useFocusEffect(useCallback(() => {
        fetch(`${API_URL}/api/courses/getCourses`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                userId: user._id,
            }),
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setCourses(data.courses);
                }
            })
            .catch(err => console.error(err));
    }, [])
    );

    return (
        <SafeAreaView style={styles.screenContainer}>
            <DashboardHeader page={1} />
            <FlatList
                style={styles.list}
                contentContainerStyle={{ gap: 20 }}
                data={courses}
                keyExtractor={item => item._id}
                renderItem={({ item }) => <CourseCard courseId={item._id} courseCode={item.courseCode} courseName={item.courseName} isStudent={false} />}
            />


            <MyButton2 onPress={() => router.navigate("teacherDashboard/course/CreateCourse")} style={{ backgroundColor: "rgba(217, 217, 217, 1)", textColor: "rgba(33, 33, 33, 1)" }}>
                <Text>
                    Create Course
                </Text>
            </MyButton2>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: "rgba(33, 33, 33, 1)",
        flexDirection: "column",
    },
    list: {
        marginLeft: 25,
    }
})