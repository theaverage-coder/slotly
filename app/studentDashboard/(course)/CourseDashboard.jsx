import { StyleSheet, Text, View } from "react-native";

export default function CourseDashboard({ courseId, courseCode, courseName, prof, semester }) {

    return (
        <View style={styles.screenContainer}>
            <View style={styles.header}>
                <Text> courseCode </Text>
            </View>
            <View style={styles.navigationBar}>
                <Text> Details </Text>
                <Text> Events </Text>
                <Text> Polls </Text>
            </View>
            <View style={styles.screenContent}>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    screenContainer: {

    }
})