import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { FlatList, Platform, Pressable, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Path, Svg } from 'react-native-svg';
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
            <FlatList
                style={{ marginLeft: 25 }}
                contentContainerStyle={{ gap: 20 }}
                data={courses}
                keyExtractor={item => item._id}
                renderItem={({ item }) => <CourseCard courseId={item._id} courseCode={item.courseCode} courseName={item.courseName} isStudent={true} />}
            />

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
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "flex-end",
    },
})