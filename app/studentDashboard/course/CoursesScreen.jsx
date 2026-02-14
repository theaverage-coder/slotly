import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CoursesBase from "../../../components/CoursesBase";

export default function CourseScreen() {

    return (
        <SafeAreaView style={styles.screenContainer}>
            <CoursesBase />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screenContainer: {
        backgroundColor: "rgb(17, 21, 28)",
        flex: 1,
        flexDirection: "column",
        rowGap: 20
    }
})