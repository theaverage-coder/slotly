import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from "@react-native-vector-icons/ionicons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Keyboard, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MyButton2 from "../../../components/MyButton2";
import { useUser } from '../../../contexts/UserContext';

export default function CreateCourse() {
    const { user } = useUser();
    const [courseData, setCourseData] = useState({
        courseCode: "",
        courseName: "",
        semester: "",
    });
    const router = useRouter();


    const API_URL =
        Platform.OS === 'web'
            ? process.env.EXPO_PUBLIC_API_URL_WEB
            : process.env.EXPO_PUBLIC_API_URL_MOBILE;

    const handleCreateCourse = async () => {
        const token = await AsyncStorage.getItem("token");

        try {
            const response = await fetch(`${API_URL}/api/courses/addCourse`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(courseData),
            });

            const data = await response.json();

            if (response.ok) {
                router.replace("teacherDashboard/course/CoursesScreen");
                Alert.alert(`Send your students this code so they can join: ${data.signUpLink}`);
            }
        } catch (err) {
            console.log("Failed to create course");
            console.log(err);
        }
    };


    return (
        <SafeAreaView style={styles.screenContainer}>
            <Pressable onPress={Keyboard.dismiss} style={{ flex: 1 }}>

                <Pressable onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons size={40} color="white" name="arrow-back-circle" />
                </Pressable>
                <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    keyboardVerticalOffset={90}
                >
                    <ScrollView contentContainerStyle={{ gap: 50, paddingBottom: 120 }}>
                        <View style={styles.topText}>
                            <Text style={styles.header}>
                                New Course
                            </Text>
                            <Text style={styles.description}>
                                Add a new course and have students join using a link
                            </Text>
                        </View>
                        <View style={styles.inputFields}>
                            <TextInput
                                style={styles.textField}
                                placeholder="Course Name"
                                value={courseData.courseName}
                                onChangeText={(text) => setCourseData({ ...courseData, courseName: text })}
                            />
                            <TextInput
                                style={styles.textField}
                                placeholder="Course Code"
                                value={courseData.courseCode}
                                onChangeText={(text) => setCourseData({ ...courseData, courseCode: text })}
                            />
                            <TextInput
                                style={styles.textField}
                                placeholder="Semester"
                                value={courseData.semester}
                                onChangeText={(text) => setCourseData({ ...courseData, semester: text })}
                            />
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
                <MyButton2 onPress={handleCreateCourse} style={{ backgroundColor: "rgba(217, 217, 217, 1)", textColor: "rgba(33, 33, 33, 1)" }}>
                    <Text> Create Course </Text>
                </MyButton2>
            </Pressable>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: "rgb(17, 21, 28)",
        paddingTop: 20
    },
    inputFields: {
        flex: 1,
        gap: 40,
        justifyContent: "center",
        alignItems: "center"
    },
    textField: {
        width: "95%",
        height: 60,
        backgroundColor: "rgb(33, 45, 64)",
        justifyContent: "center",
        borderRadius: 16,
        paddingLeft: 20,
        color: "rgba(255, 255, 255, 1)",
    },
    topText: {
        gap: 15,
        marginLeft: 15,
        paddingTop: 25
    },
    header: {
        color: "rgba(255, 255, 255, 1)",
        fontFamily: "Urbanist",
        fontSize: 34,
        fontWeight: 700
    },
    description: {
        color: "rgba(117, 117, 117, 1)",
        fontFamily: "Urbanist",
        fontSize: 18,
        fontWeight: 500
    },
    backButton: {
        justifyContent: "center",
        marginBottom: 20,
        paddingLeft: 15
    },

})