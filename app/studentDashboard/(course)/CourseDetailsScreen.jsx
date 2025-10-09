import { View } from "react-native-web";

export default function CourseDetailsScreen(courseName, courseCode, prof, semester,) {
    return (
        <View>
            <Text>
                {courseCode} : {courseName}
            </Text>
            <Text>
                {prof}
            </Text>
            <Text>
                {semester}
            </Text>
            <Text>
                INSERT LEAVE COURSE BUTTON
            </Text>
        </View>
    );
}