import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { FlatList, Platform, Pressable, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Path, Svg } from 'react-native-svg';
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
            {courses.length === 0 ? (
                <View>
                    <BackgroundSlotlyLogo />
                    <Text style={styles.text3}>Tap the</Text>
                    <View style={styles.plusIconContainer}>
                        <Svg width="9" height="9" viewBox="0 0 9 9" fill="none" >
                            <Path d="M8.25 4.5C8.25 4.58288 8.21708 4.66237 8.15847 4.72097C8.09987 4.77958 8.02038 4.8125 7.9375 4.8125H4.8125V7.9375C4.8125 8.02038 4.77958 8.09987 4.72097 8.15847C4.66237 8.21708 4.58288 8.25 4.5 8.25C4.41712 8.25 4.33763 8.21708 4.27903 8.15847C4.22042 8.09987 4.1875 8.02038 4.1875 7.9375V4.8125H1.0625C0.97962 4.8125 0.900134 4.77958 0.841529 4.72097C0.782924 4.66237 0.75 4.58288 0.75 4.5C0.75 4.41712 0.782924 4.33763 0.841529 4.27903C0.900134 4.22042 0.97962 4.1875 1.0625 4.1875H4.1875V1.0625C4.1875 0.97962 4.22042 0.900134 4.27903 0.841529C4.33763 0.782924 4.41712 0.75 4.5 0.75C4.58288 0.75 4.66237 0.782924 4.72097 0.841529C4.77958 0.900134 4.8125 0.97962 4.8125 1.0625V4.1875H7.9375C8.02038 4.1875 8.09987 4.22042 8.15847 4.27903C8.21708 4.33763 8.25 4.41712 8.25 4.5Z" fill="white" />
                        </Svg>
                    </View>
                    <Text style={styles.text3}>button to get started</Text>
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
                    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" >
                        <Path d="M24 12C24 12.2652 23.8946 12.5196 23.7071 12.7071C23.5196 12.8946 23.2652 13 23 13H13V23C13 23.2652 12.8946 23.5196 12.7071 23.7071C12.5196 23.8946 12.2652 24 12 24C11.7348 24 11.4804 23.8946 11.2929 23.7071C11.1054 23.5196 11 23.2652 11 23V13H1C0.734784 13 0.48043 12.8946 0.292893 12.7071C0.105357 12.5196 0 12.2652 0 12C0 11.7348 0.105357 11.4804 0.292893 11.2929C0.48043 11.1054 0.734784 11 1 11H11V1C11 0.734784 11.1054 0.48043 11.2929 0.292893C11.4804 0.105357 11.7348 0 12 0C12.2652 0 12.5196 0.105357 12.7071 0.292893C12.8946 0.48043 13 0.734784 13 1V11H23C23.2652 11 23.5196 11.1054 23.7071 11.2929C23.8946 11.4804 24 11.7348 24 12Z" fill="white" />
                    </Svg>
                </Pressable>
            </View>
            <AddCourseModal visible={modalVisible} onClose={() => setModalVisibility(false)} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screenContainer: {
        backgroundColor: "rgba(33, 33, 33, 1)",
        flex: 1,
        flexDirection: "column",
        rowGap: 20
    },
    plusButton: {
        height: 80,
        width: 80,
        backgroundColor: "rgba(222, 117, 82, 1)",
        shadowColor: "rgba(0, 0, 0, 0.25)",
        shadowOffset: {
            width: 4,
            height: 4
        },
        shadowRadius: 24,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        columnGap: 10,
        padding: 28,
        borderRadius: 24,
        marginBottom: 15,
        marginRight: 15
    },
    bottomContainer: {
        height: "20%",
        justifyContent: "flex-end",
        alignItems: "flex-end",
    },
    text3: {
        color: "rgba(255, 255, 255, 1)",
        fontFamily: "Urbanist",
        fontSize: 18,
        fontWeight: 400
    },
    plusIconContainer: {
        height: 25,
        width: 25,
        marginLeft: 5,
        marginRight: 5,
        borderStyle: "solid",
        shadowColor: "rgba(0, 0, 0, 0.25)",
        shadowOffset: {
            width: 1.25,
            height: 1.25
        },
        shadowRadius: 7.5,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        columnGap: 3.125,
        padding: 1,
        borderWidth: 1,
        borderColor: "rgba(255, 255, 255, 1)",
        borderRadius: 7.5
    },
})