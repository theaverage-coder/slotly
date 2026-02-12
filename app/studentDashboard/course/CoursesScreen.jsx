import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from '@react-native-vector-icons/ionicons';
import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { FlatList, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackgroundSlotlyLogo from '../../../components/BackgroundSlotlyLogo';
import CourseCard from '../../../components/CourseCard';
import DashboardHeader from '../../../components/DashboardHeader';
import { useUser } from '../../../contexts/UserContext';
import AddCourseModal from './AddCourseModal';

export default function CourseScreen() {
    const { user } = useUser();
    const [modalVisible, setModalVisibility] = useState(false);
    const [courses, setCourses] = useState([]);
    const API_URL =
        Platform.OS === 'web'
            ? process.env.EXPO_PUBLIC_API_URL_WEB
            : process.env.EXPO_PUBLIC_API_URL_MOBILE;


    useFocusEffect(useCallback(() => {
        const fetchCourses = async () => {
            const token = await AsyncStorage.getItem("token");
            try {
                const response = await fetch(`${API_URL}/api/courses/getCourses`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    setCourses(data.courses);
                }
            } catch (err) {
                console.log("Failed to retrieve courses: ", err);
            }
        }

        fetchCourses();
    }, [])
    );

    return (
        <SafeAreaView style={styles.screenContainer}>
            <DashboardHeader page={1} />
            {courses.length === 0 ? (
                <View style={styles.emptyScreen}>
                    <BackgroundSlotlyLogo />
                    <View style={styles.emptyScreenTextContainer}>
                        <Text style={[styles.emptyScreenText, { fontSize: 22 }]}> You haven't enrolled in any courses yet</Text>
                        <View style={styles.plusTextContainer}>
                            <Text style={styles.emptyScreenText}>Tap the</Text>
                            <View style={styles.plusIconContainer}>
                                <Ionicons size={15} color="white" name="add" />
                            </View>
                            <Text style={styles.emptyScreenText}>button to get started</Text>
                        </View>
                    </View>
                </View>
            )
                : (
                    <FlatList
                        style={{ marginLeft: 25 }}
                        contentContainerStyle={{ gap: 20 }}
                        data={courses}
                        keyExtractor={item => item._id}
                        renderItem={({ item }) => <CourseCard courseId={item._id} courseCode={item.courseCode} courseName={item.courseName} isStudent={true} />}
                    />
                )}
            <View style={styles.bottomContainer}>
                <Pressable style={styles.plusButton} onPress={() => setModalVisibility(true)}>
                    <Ionicons size={40} color="white" name="add" />
                </Pressable>
            </View>
            <AddCourseModal visible={modalVisible} onClose={() => setModalVisibility(false)} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screenContainer: {
        backgroundColor: "rgb(17, 21, 28)",
        flex: 1,
        flexDirection: "column",
        rowGap: 20
    },
    plusButton: {
        height: 80,
        width: 80,
        backgroundColor: "rgb(125, 78, 87)",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 24,
        marginBottom: 15,
        marginRight: 15
    },
    bottomContainer: {
        height: "20%",
        justifyContent: "flex-end",
        alignItems: "flex-end",
    },
    emptyScreenText: {
        color: "rgba(255, 255, 255, 1)",
        fontFamily: "Urbanist",
        fontSize: 18,
        fontWeight: 400
    },
    plusIconContainer: {
        height: 25,
        width: 25,
        marginHorizontal: 5,
        alignItems: "center",
        justifyContent: "center",
        padding: 1,
        borderWidth: 1,
        borderColor: "rgba(255, 255, 255, 1)",
        borderRadius: 7.5
    },
    emptyScreen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    emptyScreenTextContainer: {
        marginTop: 10,
        gap: 10,
        alignItems: "center"
    },
    plusTextContainer: {
        flexDirection: "row",
    }
})