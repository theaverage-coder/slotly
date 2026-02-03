import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { FlatList, Modal, Platform, Pressable, StyleSheet, Text, View } from "react-native";
import MyButton2 from "../../../../../components/MyButton2";


export default function ViewEventScreen() {
    const { eventObj } = useLocalSearchParams();
    const event = JSON.parse(eventObj);
    const [isModalVisible, setModalVisibility] = useState(false);
    const [students, setStudents] = useState([]);

    const API_URL =
        Platform.OS === 'web'
            ? process.env.EXPO_PUBLIC_API_URL_WEB
            : process.env.EXPO_PUBLIC_API_URL_MOBILE;

    const handleDeleteEvent = async () => {
        try {
            await fetch(`${API_URL}/api/events/deleteEvent/${event._id}`, {
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
                    ids: event.students
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
        <View style={styles.screenContainer}>
            <Text>
                {event.title}
            </Text>
            <Text>
                {event.startTime}
            </Text>
            <Text>
                {event.location}
            </Text>
            <Text> Students signed up: </Text>
            {event.capacity === -1 ? (
                <Text>
                    {event.students.length}
                </Text>
            ) : (
                <Text>
                    {event.students.length} / {event.capacity}
                </Text>
            )}

            <Pressable onPress={() => setModalVisibility(true)}>
                <Text>
                    View all attendees
                </Text>
            </Pressable>

            <Modal
                visible={isModalVisible}
                onShow={handleGetStudents}
                animationType="slide">
                <Pressable onPress={() => setModalVisibility(false)} style={{ marginTop: 50 }}>
                    <Text>
                        Close
                    </Text>
                </Pressable>
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
        </View>
    )
}

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1
    }
})