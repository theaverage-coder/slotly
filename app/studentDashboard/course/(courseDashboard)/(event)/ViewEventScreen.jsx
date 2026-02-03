// shows details of event eg. title, location, signedUp/capacity,
// if not signed up -> button at bottom to sign up which pulls up a modal to confirm
// if signed up -> tells you that you have already joined the event, gives an option to deregister

import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import MyButton2 from "../../../../../components/MyButton2";
import { useUser } from "../../../../../contexts/UserContext";


export default function ViewEventScreen() {
    const { initialEventObj } = useLocalSearchParams();
    const initialEvent = JSON.parse(initialEventObj);
    const [modalIsVisible, setModalVisibility] = useState(false);
    const { user } = useUser();
    const [event, setEvent] = useState(initialEvent);

    const API_URL =
        Platform.OS === 'web'
            ? process.env.EXPO_PUBLIC_API_URL_WEB
            : process.env.EXPO_PUBLIC_API_URL_MOBILE;

    /*
    const fetchEvent = async () => {
        const res = await fetch(`${API_URL}/api/events/getEvent/${event._id}`);
        const data = await res.json();
        setEvent(data);
    };*/

    const isFull = event?.students?.length >= event?.capacity;
    const isJoined = event?.students?.includes(user._id);

    const handleJoinEvent = async () => {
        try {
            const response = await fetch(`${API_URL}/api/events/joinEvent/${event._id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userId: user._id
                }),
            });

            const updatedEvent = await response.json();
            console.log("returned: ", updatedEvent)
            if (response.ok) {
                setEvent(updatedEvent);
                console.log("Joined event")
            }
        } catch (err) {
            console.log("Failed to join event", err)
        }
    }

    const handleLeaveEvent = async () => {
        try {
            const response = await fetch(`${API_URL}/api/events/leaveEvent/${event._id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userId: user._id
                }),
            });

            const updatedEvent = await response.json();

            if (response.ok) {
                setEvent(updatedEvent);
                console.log("Left event")
            }
        } catch (err) {
            console.log("Failed to leave event", err)
        }
    }

    return (
        <View style={styles.screenContainer}>
            {!event ? (
                <></>
            ) : (
                <>
                    <Text> {true} </Text>
                    <Text> {event._id} </Text>
                    <Text> {event.title} </Text>
                    <Text> {event.startTime} </Text>
                    <Text> {event.endTime} </Text>
                    <Text> {event.location} </Text>
                    <Text> {event.students.length} / {event.capacity} </Text>
                    <Text> {event.students} </Text>
                    {!isJoined ? (
                        !isFull ? (
                            <MyButton2 onPress={handleJoinEvent}>
                                <Text> Join Event </Text>
                            </MyButton2>
                        ) : (
                            <Text> Event is full. </Text>
                        )
                    ) : (
                        <MyButton2 onPress={handleLeaveEvent}>
                            <Text> Leave Event </Text>
                        </MyButton2>

                    )}
                </>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1
    }
})