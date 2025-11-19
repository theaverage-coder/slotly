import { useState } from "react";
import { useUser } from '../../../contexts/UserContext';

import { Platform, Pressable, StyleSheet, Text, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CreateCourse() {
    const { user } = useUser();
    const [courseData, setCourseData] = useState({
        courseCode: "",
        courseName: "",
        semester: "",
        prof: user._id,
    });

    const API_URL =
        Platform.OS === 'web'
            ? process.env.EXPO_PUBLIC_API_URL_WEB
            : process.env.EXPO_PUBLIC_API_URL_MOBILE;

    const handleCreateCourse = async () => {
        try {
            const response = await fetch(`${API_URL}/api/courses/addCourse`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(courseData),
            });

            const signUpCode = await response.json();
            if (response.ok) {
                console.log(signUpCode);
            }
        } catch (err) {
            console.log("Failed to create course");
            console.log(err);
        }
    };


    return (
        <SafeAreaView>
            <TextInput
                style={styles.textInput}
                placeholder="Course Name"
                value={courseData.courseName}
                onChangeText={(text) => setCourseData({ ...courseData, courseName: text })}
            />
            <TextInput
                style={styles.textInput}
                placeholder="Course Code"
                value={courseData.courseCode}
                onChangeText={(text) => setCourseData({ ...courseData, courseCode: text })}
            />
            <TextInput
                style={styles.textInput}
                placeholder="Semester"
                value={courseData.semester}
                onChangeText={(text) => setCourseData({ ...courseData, semester: text })}
            />
            <Pressable onPress={handleCreateCourse}>
                <Text> Create Course </Text>
            </Pressable>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    textInput: {
        width: "90%",
        borderWidth: 1,
        height: 40
    }
})