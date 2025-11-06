import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useCourseContext } from '../app/CourseContext';

export default function CourseCard({ courseId, courseCode, profName, }) {
    const { setCourseId } = useCourseContext();
    const router = useRouter();

    const handlePress = () => {
        setCourseId(courseId);
        router.navigate(`studentDashboard/CourseDetailsScreen`)
    }

    return (
        <Pressable onPress={handlePress} style={styles.cardContainer}>
            <View style={styles.pictureContainer}>
                <View style={styles.defaultPicture} />
            </View>
            <View style={styles.cardText}>
                <Text style={styles.courseCode}>
                    {courseCode}
                </Text>
                <Text style={styles.profName}>
                    {profName}
                </Text>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    cardContainer: {
        flexDirection: "row",
        columnGap: 15,
    },
    pictureContainer: {
    },
    defaultPicture: {
        width: 82,
        height: 82,
        backgroundColor: "rgba(217, 217, 217, 1)",
        borderRadius: 12
    },
    cardText: {
        flexDirection: "column",
        rowGap: 5,
        justifyContent: "center"
    },
    courseName: {
        color: "rgba(255, 255, 255, 1)",
        fontFamily: "Inter",
        fontSize: 24,
        fontWeight: 400
    },
    profName: {
        color: "rgba(153, 153, 153, 1)",
        fontFamily: "Inter",
        fontSize: 14,
        fontWeight: 400
    },
})