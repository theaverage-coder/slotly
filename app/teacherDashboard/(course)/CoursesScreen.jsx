import { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native-web";
import CourseCard from "../../../components/CourseCard";
import { useUser } from "../../../contexts/UserContext";

export default function CoursesScreen() {
    const { user } = useUser();
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/api/courses/getCourses", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                userId: user._id,
            }),
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    console.log(data);
                    setCourses(data.courses);
                }
            })
            .catch(err => console.error(err));
    }, []);

    return (
        <View>

            <FlatList
                data={courses}
                keyExtractor={item => item._id}
                renderItem={({ item }) => <CourseCard courseName={item.courseCode} profName={"Prof Name"} />}
            />

            <Text> Courses Screen </Text>
        </View>
    );
}