import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCourseContext } from "../../../../../contexts/CourseContext";


export default function CourseDetailsScreen() {
    const { courseId } = useCourseContext();


    return (
        <SafeAreaView>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

})