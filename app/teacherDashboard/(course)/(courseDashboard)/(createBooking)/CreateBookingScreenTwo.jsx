import DateTimePicker from '@react-native-community/datetimepicker';
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MyButton2 from "../../../../../components/MyButton2";
import { useBookingContext } from '../../../../../contexts/BookingContext';

export default function CreateBookingScreenTwo() {
    const router = useRouter();
    const { isSameHours, sameHours, setSameHours, daysAvailable, setDaysAvailable } = useBookingContext();

    const handleAddTimeInterval = (day) => {
        setDaysAvailable(prev => ({
            ...prev, [day]: { ...prev[day], timeIntervals: [...prev[day].timeIntervals, { start: new Date(), end: new Date() }] }
        }))
    };

    const handleRemoveTimeInterval = (day, indexToRemove) => {
        setDaysAvailable(prev => ({
            ...prev, [day]: {
                ...prev[day],
                timeIntervals: prev[day].timeIntervals.filter(
                    (_, index) => index !== indexToRemove
                ),
            }
        }))
    };

    const handleSameHoursRemoveTimeInterval = (indexToRemove) => {
        setSameHours(prev => (
            prev.filter((_, i) =>
                i !== indexToRemove
            )
        ))
    }

    const handleSameHoursAddTimeInterval = () => {
        setSameHours(prev =>
            [...prev, { start: new Date(), end: new Date() }]
        )
    }
    return (
        <SafeAreaView style={styles.screenContainer}>
            <View style={{ rowGap: 25, flex: 1, paddingTop: 15 }}>
                {isSameHours ?
                    <View style={styles.sameHoursTimeIntervals}>
                        {sameHours.map((interval, index) => (
                            <View style={[styles.singleTimeInterval, styles.sameHoursSingleTimeInterval]} key={`${interval.start}-${interval.end}-${index}`}>
                                <DateTimePicker
                                    value={interval.start}
                                    mode="time"
                                    is24Hour={true}
                                    onChange={(event, selectedDate) => {
                                        if (!selectedDate) return;
                                        setSameHours(prev => (
                                            prev.map((item, i) =>
                                                index === i ? { ...item, start: selectedDate } : item
                                            )
                                        ))
                                    }}
                                />
                                <DateTimePicker
                                    value={interval.end}
                                    mode="time"
                                    is24Hour={true}
                                    onChange={(event, selectedDate) => {
                                        if (!selectedDate) return;
                                        setSameHours(prev => (
                                            prev.map((item, i) =>
                                                index === i ? { ...item, end: selectedDate } : item
                                            )
                                        ))
                                    }}
                                />
                                {index !== 0 && (
                                    <Pressable style={{ justifyContent: "center" }} onPress={() => handleSameHoursRemoveTimeInterval(index)}>
                                        <Text style={styles.text}> x </Text>
                                    </Pressable>
                                )}
                            </View>
                        ))}
                        <Pressable style={styles.plusButton} onPress={handleSameHoursAddTimeInterval}>
                            <Text style={styles.text}> + </Text>
                        </Pressable>
                    </View>
                    :
                    Object.entries(daysAvailable).map(([day, info]) => {
                        if (info.isAvailable) {
                            return (
                                <View style={styles.dayAndTimeIntervals} key={day} >
                                    <Text style={[styles.text, { width: "25%", paddingLeft: 20 }]}>{day} </Text>
                                    <View style={styles.timeIntervals}>
                                        {info.timeIntervals.map((interval, index) => (
                                            <View style={styles.singleTimeInterval} key={`${interval.start}-${interval.end}-${index}`}>
                                                <DateTimePicker
                                                    value={interval.start}
                                                    mode="time"
                                                    is24Hour={true}
                                                    onChange={(event, selectedDate) => {
                                                        if (!selectedDate) return;
                                                        setDaysAvailable(prev => ({
                                                            ...prev,
                                                            [day]: {
                                                                ...prev[day],
                                                                timeIntervals: prev[day].timeIntervals.map((item, i) =>
                                                                    i === index ? { ...item, start: selectedDate } : item
                                                                ),
                                                            },
                                                        }));
                                                    }}
                                                />
                                                <DateTimePicker
                                                    value={interval.end}
                                                    mode="time"
                                                    is24Hour={true}
                                                    onChange={(event, selectedDate) => {
                                                        if (!selectedDate) return;
                                                        setDaysAvailable(prev => ({
                                                            ...prev,
                                                            [day]: {
                                                                ...prev[day],
                                                                timeIntervals: prev[day].timeIntervals.map((item, i) =>
                                                                    i === index ? { ...item, end: selectedDate } : item
                                                                ),
                                                            },
                                                        }));
                                                    }}
                                                />
                                                {index !== 0 && (
                                                    <Pressable style={{ justifyContent: "center" }} onPress={() => handleRemoveTimeInterval(day, index)}>
                                                        <Text style={styles.text}> x </Text>
                                                    </Pressable>
                                                )}
                                            </View>
                                        ))}
                                    </View>
                                    <Pressable style={styles.plusButton} onPress={() => handleAddTimeInterval(day)}>
                                        <Text style={styles.text}> + </Text>
                                    </Pressable>
                                </View>
                            );
                        }
                        return null;
                    })
                }

            </View>

            <MyButton2 onPress={() => router.navigate("CreateBookingScreenThree")} style={{ backgroundColor: "rgba(217, 217, 217, 1)", textColor: "rgba(33, 33, 33, 1)" }}>
                <Text> Next </Text>
            </MyButton2>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    screenContainer: {
        backgroundColor: "rgba(33, 33, 33, 1)",
        flex: 1,
        rowGap: 20,
    },
    dayAndTimeIntervals: {
        flexDirection: "row",
        columnGap: 10,
        alignItems: "center"
    },
    timeIntervals: {
        rowGap: 7,
        width: "60%",
    },
    sameHoursTimeIntervals: {
        rowGap: 20,
        alignItems: "center"
    },
    singleTimeInterval: {
        flexDirection: "row"
    },
    sameHoursSingleTimeInterval: {
        width: "60%"
    },
    text: {
        color: "rgba(217, 217, 217, 1)"
    },
    plusButton: {
        borderWidth: 1,
        borderColor: "rgba(217, 217, 217, 1)",
        borderRadius: 16,
        padding: 3,
    },
})