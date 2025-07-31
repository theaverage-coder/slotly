import { StyleSheet, View } from 'react-native';
import CourseCard from './CourseCard';

export default function CourseScreen() {
    return (
        <View style={styles.screenContainer}>
            <CourseCard courseName="PHYS 180" profName="Emily Chang"></CourseCard>
            <CourseCard courseName="PHYS 180" profName="Emily Chang"></CourseCard>
            <CourseCard courseName="PHYS 180" profName="Emily Chang"></CourseCard>
            <CourseCard courseName="PHYS 180" profName="Emily Chang"></CourseCard>

        </View>
    );
}

const styles = StyleSheet.create({
    screenContainer: {
        backgroundColor: "rgba(33, 33, 33, 1)",
        height: "70vh",
        paddingLeft: 15,
        display: "flex",
        flexDirection: "column",
        rowGap: 20
    }
})