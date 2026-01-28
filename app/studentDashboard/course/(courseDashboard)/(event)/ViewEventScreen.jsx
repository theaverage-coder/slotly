// shows details of event eg. title, location, signedUp/capacity,
// if not signed up -> button at bottom to sign up which pulls up a modal to confirm
// if signed up -> tells you that you have already joined the event, gives an option to deregister

import { useEffect, useState } from "react";
import { Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MyButton2 from "../../../../../components/MyButton2";
import { useUser } from "../../../../../contexts/UserContext";


export default function ViewEventScreen({ eventId }) {
    const [modalIsVisible, setModalVisibility] = useState(false);
    const { user } = useUser();
    const [event, setEvent] = useState(null);

    const API_URL =
        Platform.OS === 'web'
            ? process.env.EXPO_PUBLIC_API_URL_WEB
            : process.env.EXPO_PUBLIC_API_URL_MOBILE;

    const fetchEvent = async () => {
        const res = await fetch(`${API_URL}/api/events/getEvent/${eventId}`);
        const data = await res.json();
        setEvent(data);
    };

    const isFull = event?.students?.length >= event?.capacity;
    const isJoined = event?.students?.includes(user);

    useEffect(() => {
        fetchEvent();
    }, []);

    const handleJoinEvent = async () => {
        try {
            const response = await fetch(`${API_URL}/api/events/joinEvent/${eventId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userId: user
                }),
            });

            const updatedEvent = await response.json();

            if (response.ok) {
                setEvent(updatedEvent);
            }
        } catch (err) {
            console.log("Failed to join event")
        }
    }

    const handleLeaveEvent = async () => {
        try {
            const response = await fetch(`${API_URL}/api/events/leaveEvent/${eventId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userId: user
                }),
            });

            const updatedEvent = await response.json();

            if (response.ok) {
                setEvent(updatedEvent);
            }
        } catch (err) {
            console.log("Failed to leave event")
        }
    }


    return (
        <SafeAreaView>
            {!event ? (
                <></>
            ) : (
                <>
                    <Text> {event.title} </Text>
                    <Text> {event.startTime} </Text>
                    <Text> {event.endTime} </Text>
                    <Text> {event.location} </Text>
                    <Text> {event.students.length} / {event.capacity} </Text>

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
        </SafeAreaView>
    )
}