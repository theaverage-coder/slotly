import { useEffect, useState } from "react";
import { Platform, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCourseContext } from "../../../../../contexts/CourseContext";

export default function CourseEventsScreen() {
    const { courseId } = useCourseContext();
    const [events, setEvents] = useState();

    const API_URL =
        Platform.OS === 'web'
            ? process.env.EXPO_PUBLIC_API_URL_WEB
            : process.env.EXPO_PUBLIC_API_URL_MOBILE;
    useEffect(() => {
        fetch(`${API_URL}/api/events/getEvents`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                courseId
            }),
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    console.log(data);
                    setEvents(data.events);
                }
            })
            .catch(err => console.error(err));
    }, []);
    return (
        <SafeAreaView>
            <FlatList style={{ marginLeft: 25 }}
                data={events}
                keyExtractor={item => item._id}
                renderItem={({ item }) => <View> Event Card </View>}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({

})