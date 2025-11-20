import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { FlatList, Modal, Platform, Pressable, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MyButton2 from "../../../../../components/MyButton2";


export default function ViewEventScreen() {
    const { event } = useLocalSearchParams();
    const eventObj = JSON.parse(event);
    const [isModalVisible, setModalVisibility] = useState(false);
    const [students, setStudents] = useState([]);

    const API_URL =
        Platform.OS === 'web'
            ? process.env.EXPO_PUBLIC_API_URL_WEB
            : process.env.EXPO_PUBLIC_API_URL_MOBILE;

    const handleDeleteEvent = async () => {
        try {
            await fetch(`${API_URL}/api/events/deleteEvent/${eventObj._id}`, {
                method: "DELETE"
            })
        } catch (err) {
            console.log(err)
        }
    }

    const handleGetStudents = async () => {
        try {
            const response = await fetch(`${API_URL}/api/users/getStudents`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ids: eventObj.students
                }),
            })

            if (response.ok) {
                const data = response.json();
                setStudents(data);
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <SafeAreaView style={styles.screenContainer}>
            <Text>
                {eventObj.title}
            </Text>
            <Text>
                {eventObj.startTime}
            </Text>
            <Text>
                {eventObj.location}
            </Text>

            <Pressable onPress={() => setModalVisibility(true)}>
                <Text>
                    View all attendees
                </Text>
            </Pressable>

            <Modal
                visible={isModalVisible}
                onShow={handleGetStudents}
                onRequestClose={() => setModalVisibility(false)}
                animationType="slide">

                <FlatList
                    data={students}
                    keyExtractor={item => item._id}
                    renderItem={({ item }) => <Text>{item.firstName} {item.lastName} {item.email}</Text>}
                />
            </Modal>

            <MyButton2 onPress={handleDeleteEvent}>
                <Text>
                    Delete Event
                </Text>
            </MyButton2>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1
    }
})