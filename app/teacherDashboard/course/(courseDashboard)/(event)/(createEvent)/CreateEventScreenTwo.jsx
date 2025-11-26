import DateTimePicker from '@react-native-community/datetimepicker';
import { useRouter } from 'expo-router';
import { Alert, Keyboard, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MyButton2 from '../../../../../../components/MyButton2';
import { useEventContext } from "../../../../../../contexts/EventContext";

export default function CreateEventScreenTwo() {
    const { event, setEvent } = useEventContext();
    const router = useRouter();

    const isDisabledButton = event.location === "" || (event.isLimitedCapacity && event.capacity === "");

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
            <Pressable onPress={Keyboard.dismiss} style={{ flex: 1 }}>
                <View style={styles.header}>
                    <Text style={styles.title}>
                        Important Details
                    </Text>
                    <Text style={styles.description}>
                        Set a time and place for the event
                    </Text>
                </View>
                <View style={styles.inputFields}>
                    <DateTimePicker
                        mode="date"
                        value={event.startTime}
                        minimumDate={new Date()}
                        onChange={(event, selectedDate) => {
                            if (selectedDate) {
                                setEvent(prev => ({ ...prev, startTime: selectedDate, endTime: selectedDate }))
                            }
                        }} />
                    <View style={styles.startAndEndTimes}>
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
                    </View>

                    <TextInput
                        style={styles.textField}
                        placeholder="Location"
                        value={event.location}
                        onChangeText={(text) => setEvent(prev => ({ ...prev, location: text }))}
                    />
                    <View style={styles.maxCapacity}>
                        <Text style={styles.text}> Set a max capacity </Text>
                        <Pressable onPress={() => setEvent(prev => ({ ...prev, isLimitedCapacity: !prev.isLimitedCapacity }))}>
                            <Text style={styles.text}>
                                X
                            </Text>
                        </Pressable>
                        {event.isLimitedCapacity && (
                            <TextInput
                                style={[styles.textField, styles.numberField]}
                                value={event.capacity}
                                onChangeText={(text) => setEvent(prev => ({ ...prev, capacity: text }))}
                                keyboardType="numeric"
                            />
                        )}
                    </View>
                </View>
                <MyButton2
                    style={[{ backgroundColor: "rgba(217, 217, 217, 1)", textColor: "rgba(33, 33, 33, 1)" }, isDisabledButton && styles.disabledButton]}
                    disabled={isDisabledButton}
                    onPress={handleContinue}
                >
                    <Text> Continue </Text>
                </MyButton2>
            </Pressable>
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: "rgba(33, 33, 33, 1)"
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
        alignItems: "center",
        paddingTop: 30,
        gap: 20
    },
    startAndEndTimes: {
        flexDirection: "row"
    },
    textField: {
        width: "95%",
        height: 60,
        backgroundColor: "rgba(50, 50, 50, 1)",
        justifyContent: "center",
        borderRadius: 16,
        paddingLeft: 20,
        color: "rgba(255, 255, 255, 1)",
    },
    numberField: {
        width: "15%",
        textAlign: "center",
        paddingLeft: 0
    },
    maxCapacity: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10
    },
    text: {
        color: "rgba(255, 255, 255, 1)"
    },
    disabledButton: {
        opacity: 0.3
    }
})