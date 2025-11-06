import DateTimePicker from '@react-native-community/datetimepicker';
import { Pressable, StyleSheet, Text, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEventContext } from "../../../../../contexts/EventContext";

export default function CreateEventScreenTwo() {
    const { event, setEvent } = useEventContext();

    return (
        <SafeAreaView style={styles.screenContainer}>
            <DateTimePicker
                mode="date"
                value={event.startTime}
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
            <Pressable onPress={() => setEvent(prev => ({ ...prev, isLimitedCapacity: !isLimitedCapacity }))}> X </Pressable>
            {event.isLimitedCapacity && (
                <TextInput
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
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

})