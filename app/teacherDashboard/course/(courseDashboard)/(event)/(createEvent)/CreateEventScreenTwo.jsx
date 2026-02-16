import DateTimePicker from '@react-native-community/datetimepicker';
import Ionicons from '@react-native-vector-icons/ionicons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Keyboard, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import MyButton2 from '../../../../../../components/MyButton2';
import { useEventContext } from "../../../../../../contexts/EventContext";

export default function CreateEventScreenTwo() {
    const { event, setEvent } = useEventContext();
    const router = useRouter();
    const [showDatePicker, setShowDatePicker] = useState(false);

    const isDisabledButton = event.location === "" || (event.isLimitedCapacity && event.capacity === "") || (event.startTime.getTime() === event.endTime.getTime());

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
        <View style={styles.screenContainer}>
            <Pressable onPress={Keyboard.dismiss} style={{ flex: 1 }}>
                <View style={styles.header}>
                    <Text style={styles.title}>
                        Event Details
                    </Text>
                    <Text style={styles.description}>
                        Set a time and place for the event
                    </Text>
                </View>
                <ScrollView style={styles.inputFields} contentContainerStyle={{ gap: 20 }}>
                    <View style={styles.inputContainer}>
                        <Text style={styles.text}> Location </Text>
                        <TextInput
                            style={styles.textField}
                            placeholder="Enter Location"
                            value={event.location}
                            onChangeText={(text) => setEvent(prev => ({ ...prev, location: text }))}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.text}> Date </Text>

                        <DateTimePicker
                            mode="date"
                            value={event.startTime}
                            minimumDate={new Date()}
                            onChange={(event, selectedDate) => {
                                if (selectedDate) {
                                    setEvent(prev => ({ ...prev, startTime: selectedDate, endTime: selectedDate }))
                                }
                            }} />

                    </View>
                    <View style={styles.startAndEndTimes}>
                        <View style={styles.inputContainer}>
                            <Text style={styles.text}> Start Time </Text>

                            <DateTimePicker
                                mode="time"
                                value={event.startTime}
                                onChange={(event, selectedDate) => {
                                    if (selectedDate) {
                                        setEvent(prev => ({ ...prev, startTime: selectedDate }))
                                    }
                                }}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.text}> End Time </Text>
                            <DateTimePicker
                                mode="time"
                                value={event.endTime}
                                onChange={(event, selectedDate) => {
                                    if (selectedDate) {
                                        setEvent(prev => ({ ...prev, endTime: selectedDate }))
                                    }
                                }}
                            />
                        </View>
                    </View>


                    <View style={styles.maxCapacity}>
                        <Pressable onPress={() => setEvent(prev => ({ ...prev, isLimitedCapacity: !prev.isLimitedCapacity }))}>
                            <Ionicons size={25} color="white" name={event.isLimitedCapacity ? "checkbox" : "square-outline"} />
                        </Pressable>
                        <Text style={styles.text}> Limited attendance </Text>
                    </View>

                    {event.isLimitedCapacity && (
                        <TextInput
                            style={[styles.textField, styles.numberField]}
                            placeholder='Enter capacity'
                            value={event.capacity}
                            onChangeText={(text) => setEvent(prev => ({ ...prev, capacity: text }))}
                            keyboardType="numeric"
                        />
                    )}
                </ScrollView>
                <MyButton2
                    style={[{ backgroundColor: "rgba(217, 217, 217, 1)" }, isDisabledButton && styles.disabledButton]}
                    disabled={isDisabledButton}
                    onPress={handleContinue}
                >
                    <Text> Continue </Text>
                </MyButton2>
            </Pressable>
        </View >
    )
}

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: "rgb(17, 21, 28)",
        paddingVertical: 20

    },
    header: {
        gap: 15,
        marginLeft: 15,
    },
    title: {
        color: "rgba(255, 255, 255, 1)",
        fontFamily: "Urbanist",
        fontSize: 34,
        fontWeight: 700
    },
    description: {
        color: "rgba(117, 117, 117, 1)",
        fontFamily: "Urbanist",
        fontSize: 18,
        fontWeight: 500
    },
    inputFields: {
        flex: 1,
        marginLeft: 20,
        paddingTop: 30,
    },
    startAndEndTimes: {
        flexDirection: "row",
        gap: 100
    },
    textField: {
        width: "95%",
        height: 60,
        backgroundColor: "rgb(33, 45, 64)",
        justifyContent: "center",
        borderRadius: 16,
        paddingLeft: 20,
        color: "rgba(255, 255, 255, 1)",
    },
    inputContainer: {
        gap: 10
    },
    numberField: {
        width: "45%",
        textAlign: "center",
        paddingLeft: 0
    },
    maxCapacity: {
        flexDirection: "row",
        //alignItems: "center",
        gap: 10
    },
    text: {
        color: "rgba(255, 255, 255, 1)",
        fontSize: 15
    },
    disabledButton: {
        opacity: 0.3
    },
    pickerContainer: {
        width: "100%",
        alignItems: "center",
        paddingRight: 20
    }
})