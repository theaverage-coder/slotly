import DateTimePicker from '@react-native-community/datetimepicker';
import { useLocalSearchParams } from 'expo-router';
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Pressable, Text, TextInput } from "react-native-web";
import { useUser } from "../../../UserContext";

export default function CreateEventScreen() {
    const { user } = useUser();
    const { courseId } = useLocalSearchParams();

    const [title, setTitle] = useState();
    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());
    const [isLimitedCapacity, setIsLimitedCapacity] = useState(false);
    const [capacity, setCapacity] = useState();
    const [location, setLocation] = useState();
    const [description, setDescription] = useState("");

    const API_URL =
        Platform.OS === 'web'
            ? process.env.EXPO_PUBLIC_API_URL_WEB
            : process.env.EXPO_PUBLIC_API_URL_MOBILE;

    const handleCreateEvent = async () => {
        const event = {
            course: courseId,
            title: title,
            startTime: startTime,
            endTime: endTime,
            location: location,
            ...(isLimitedCapacity ? { capacity: capacity } : { capacity: "inf" }),
            ...(description !== "" && { description: description }),
        }

        try {
            const response = await fetch(`${API_URL}/api/events/createEvent`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(event),
            });

            if (response.ok) {
                console.log("Event created!");
            }
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <SafeAreaView>
            <TextInput
                placeholder="Title"
                value={title}
                onChangeText={(text) => setTitle(text)}
            />

            <DateTimePicker
                mode="date"
                value={startTime}
                onChange={(event, selectedDate) => {
                    if (selectedDate) {
                        setStartTime(selectedDate);
                        setEndTime(selectedDate);
                    }
                }} />

            <DateTimePicker
                mode="time"
                value={startTime}
                onChange={(event, selectedDate) => {
                    if (selectedDate) {
                        setStartTime(selectedDate);
                    }
                }}
            />
            <DateTimePicker
                mode="time"
                value={endTime}
                onChange={(event, selectedDate) => {
                    if (selectedDate) {
                        setEndTime(selectedDate);
                    }
                }}
            />

            <Text> Set a max capacity </Text>
            <Pressable onPress={() => setCapacity(!capacity)}> X </Pressable>
            {isLimitedCapacity && (
                <TextInput
                    value={capacity}
                    onChangeText={setCapacity}
                    keyboardType="numeric"
                />
            )}

            <TextInput
                placeholder="Location"
                value={location}
                onChangeText={(text) => setLocation(text)}
            />
            <TextInput
                placeholder="Add event details and/or reminders eg. equipment to bring"
                value={description}
                onChangeText={(text) => setDescription(text)}
            />

            <Pressable onPress={handleCreateEvent}> Create Event </Pressable>

        </SafeAreaView>
    );
}