import DateTimePicker from '@react-native-community/datetimepicker';
import Ionicons from '@react-native-vector-icons/ionicons';
import { useRouter } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import MyButton2 from "../../../../../../components/MyButton2";
import StartEndTimesHeader from '../../../../../../components/StartEndTimesHeader';
import { useBookingContext } from '../../../../../../contexts/BookingContext';

export default function CreateBookingScreenTwo() {
    const router = useRouter();
    const { isSameHours, sameHours, setSameHours, daysAvailable, setDaysAvailable } = useBookingContext();

    const hasInvalidInterval = (intervals) => {
        for (let i = 0; i < intervals.length; i++) {
            if ((i >= 1 && intervals[i].start < intervals[i - 1].end) || intervals[i].end <= intervals[i].start) {
                return true;
            }
        }
        return false;
    }

    const hasInvalidIntervalInMap = () => {
        return Object.entries(daysAvailable).some(([day, value]) => {
            return hasInvalidInterval(value.timeIntervals);

        });
    }

    const isDisabledButton = (isSameHours && hasInvalidInterval(sameHours)) ||
        (!isSameHours && hasInvalidIntervalInMap());

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
        <View style={styles.screenContainer}>
            <View style={styles.screenContent}>
                <View style={styles.header}>
                    <Text style={styles.title}> Set your Availabilities </Text>
                    <Text style={styles.description}>{isSameHours ? "These hours will be the same for each available day" : "Set your times"} </Text>
                </View>
                {isSameHours ?
                    <>
                        <StartEndTimesHeader />
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
                                            <Ionicons size={20} color="white" name="trash" />
                                        </Pressable>
                                    )}
                                </View>
                            ))}
                            <Pressable onPress={handleSameHoursAddTimeInterval}>
                                <Ionicons size={30} color="white" name="add-circle" />
                            </Pressable>
                        </View>
                    </>
                    :
                    <View style={{ flex: 1 }}>
                        <ScrollView>
                            {Object.entries(daysAvailable).map(([day, info]) => {
                                if (info.isAvailable) {
                                    return (
                                        <View style={styles.dayAndTimeIntervals} key={day} >
                                            <Text style={styles.dayHeader}>{day} </Text>
                                            <StartEndTimesHeader />
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
                                                                <Ionicons size={20} color="white" name="trash" />
                                                            </Pressable>
                                                        )}
                                                    </View>
                                                ))}
                                            </View>
                                            <Pressable onPress={() => handleAddTimeInterval(day)}>
                                                <Ionicons size={30} color="white" name="add-circle" />
                                            </Pressable>
                                        </View>
                                    );
                                }
                                return null;
                            })}
                        </ScrollView>
                    </View>

                }

            </View>

            <MyButton2
                onPress={() => router.navigate("teacherDashboard/course/CreateBookingScreenThree")}
                style={[isDisabledButton && { opacity: 0.3 }, { backgroundColor: "rgba(217, 217, 217, 1)" }]}
                disabled={isDisabledButton}
            >
                <Text> Next </Text>
            </MyButton2>
        </View>
    )
}

const styles = StyleSheet.create({
    screenContainer: {
        backgroundColor: "rgb(17, 21, 28)",
        flex: 1,
        rowGap: 20,
        paddingVertical: 20
    },
    screenContent: {
        flex: 1,
        gap: 20,
    },
    header: {
        gap: 15,
        marginLeft: 15
    },
    title: {
        color: "rgba(255, 255, 255, 1)",
        fontFamily: "Urbanist",
        fontSize: 34,
        fontWeight: 700,
    },
    description: {
        color: "rgba(117, 117, 117, 1)",
        fontFamily: "Urbanist",
        fontSize: 18,
        fontWeight: 500,
    },
    dayAndTimeIntervals: {
        alignItems: "center",
        gap: 10,
        marginVertical: 10,
    },
    dayHeader: {
        color: "rgb(125, 78, 87)",
        fontWeight: "bold",
        fontSize: 20,
        width: "100%",
        marginLeft: 35
    },
    timeIntervals: {
        rowGap: 20,
        width: "60%",
    },
    sameHoursTimeIntervals: {
        rowGap: 20,
        alignItems: "center",
    },
    singleTimeInterval: {
        flexDirection: "row",
        gap: 30,
    },
    sameHoursSingleTimeInterval: {
        width: "60%"
    },
    text: {
        color: "rgba(217, 217, 217, 1)"
    },

})