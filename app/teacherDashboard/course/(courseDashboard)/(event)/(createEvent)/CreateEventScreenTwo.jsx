import DateTimePicker from '@react-native-community/datetimepicker';
import { useRouter } from 'expo-router';
import { Alert, Pressable, StyleSheet, Text, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MyButton2 from '../../../../../../components/MyButton2';
import { useEventContext } from "../../../../../../contexts/EventContext";

export default function CreateEventScreenTwo() {
    const { event, setEvent } = useEventContext();
    const router = useRouter();

    const handleContinue = () => {
        if (event.endTime < event.startTime) {
            Alert.alert(
                "Invalid date range",
                "",
                [
                    { text: "OK" }
                ]
            );
        } else {
            router.navigate("teacherDashboard/course/CreateEventScreenThree");
        }
    }

    return (
        <SafeAreaView style={styles.screenContainer}>
            <DateTimePicker
                mode="date"
                value={event.startTime}
                minimumDate={new Date()}
                onChange={(event, selectedDate) => {
                    if (selectedDate) {
                        setEvent(prev => ({ ...prev, startTime: selectedDate, endTime: selectedDate }))
                    }
                }} />

            <DateTimePicker
                mode="time"
                value={event.startTime}
                onChange={(event, selectedDate) => {
                    if (selectedDate) {
                        setEvent(prev => ({ ...prev, startTime: selectedDate }))
                    }
                }}
            />
            <DateTimePicker
                mode="time"
                value={event.endTime}
                onChange={(event, selectedDate) => {
                    if (selectedDate) {
                        setEvent(prev => ({ ...prev, endTime: selectedDate }))
                    }
                }}
            />

            <Text> Set a max capacity </Text>
            <Pressable onPress={() => setEvent(prev => ({ ...prev, isLimitedCapacity: !prev.isLimitedCapacity }))}>
                <Text>
                    X
                </Text>
            </Pressable>
            {event.isLimitedCapacity && (
                <TextInput
                    style={{ borderWidth: 1 }}
                    value={event.capacity}
                    onChangeText={(text) => setEvent(prev => ({ ...prev, capacity: text }))}
                    keyboardType="numeric"
                />
            )}

            <TextInput
                placeholder="Location"
                value={event.location}
                onChangeText={(text) => setEvent(prev => ({ ...prev, location: text }))}
            />

            <MyButton2
                disabled={event.location === "" || (event.isLimitedCapacity && event.capacity === "")}
                onPress={() => handleContinue}
            >
                <Text> Continue </Text>
            </MyButton2>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: "rgba(33, 33, 33, 1)"

    }
})