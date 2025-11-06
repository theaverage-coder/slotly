import { useState } from "react";
import { useUser } from '../../UserContext';

import { Pressable, Text, TextInput, View } from "react-native";

export default function CreateCourse() {
    const { user } = useUser();
    const [courseData, setCourseData] = useState({
        courseCode: "",
        courseName: "",
        semester: "",
        prof: user._id,
    });

    const handleCreateCourse = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/courses/addCourse", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(courseData),
            });

            const signUpCode = await response.json();
            if (response.ok) {
                console.log(signUpCode);
            }
        } catch (err) {
            console.log("Failed to create course");
            console.log(err);
        }
    };


    return (
        <View>
            <TextInput
                placeholder="Course Name"
                value={courseData.courseName}
                onChangeText={(text) => setCourseData({ ...courseData, courseName: text })}
            />
            <TextInput
                placeholder="Course Code"
                value={courseData.courseCode}
                onChangeText={(text) => setCourseData({ ...courseData, courseCode: text })}
            />
            <TextInput
                placeholder="Semester"
                value={courseData.semester}
                onChangeText={(text) => setCourseData({ ...courseData, semester: text })}
            />
            <Pressable onPress={handleCreateCourse}>
                <Text> Create Course </Text>
            </Pressable>

        </View>
    );
}