import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from "@react-native-picker/picker";
import Ionicons from '@react-native-vector-icons/ionicons';
import { useRouter } from "expo-router";
import { useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MyButton2 from "../../../../../../components/MyButton2";
import StartEndTimesHeader from '../../../../../../components/StartEndTimesHeader';
import { useBookingContext } from '../../../../../../contexts/BookingContext';
import { useCourseContext } from "../../../../../../contexts/CourseContext";

export default function CreateBookingScreenTwo() {
    const router = useRouter();
    const { isSameHours, sameHours, setSameHours, daysAvailable, setDaysAvailable, timeSlotDuration, setTimeSlotDuration, } = useBookingContext();
    const [activePicker, setActivePicker] = useState(null);
    const insets = useSafeAreaInsets();
    const { courseId } = useCourseContext();
    const [showDurationModal, setShowDurationModal] = useState(false);


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
            ...prev, [day]: { ...prev[day], timeIntervals: [...prev[day].timeIntervals, { start: new Date(), end: new Date(), location: '' }] }
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
            [...prev, { start: new Date(), end: new Date(), location: '' }]
        )
    }
    return (
        <View style={styles.screenContainer}>
            <View style={styles.screenContent}>
                <View style={styles.header}>
                    <Text style={styles.title}> Set your Availabilities </Text>
                    <Text style={styles.description}>{isSameHours ? "These hours will be the same for each day" : "Set your times"} </Text>
                </View>
                <View style={styles.timeSlotDurationContainer}>
                    <Text style={[styles.text, { width: "55%" }]}>
                        Duration of each appointment:
                    </Text>
                    <Pressable style={styles.timeSlotDurationButton} onPress={() => setShowDurationModal(true)}>
                        <Text >
                            {timeSlotDuration} minutes
                        </Text>
                    </Pressable>
                </View>
                {isSameHours ?
                    <View style={styles.dayAndTimeIntervals}>
                        {Object.keys(daysAvailable).filter(key => daysAvailable[key].isAvailable).map((day) => {
                            return (
                                <View
                                    style={{ flexDirection: "row", width: "100%", marginLeft: 20, }}
                                    key={day}
                                >
                                    <Ionicons size={20} color="rgb(125, 78, 87)" name="today" />
                                    <Text style={[styles.dayHeader, { marginLeft: 10 }]}>
                                        {day}
                                    </Text>
                                </View>
                            )
                        })}
                        <View style={{ height: 10 }} />
                        <StartEndTimesHeader />
                        <View style={[styles.timeIntervals, { maxHeight: 250 }]}>
                            <ScrollView contentContainerStyle={{ gap: 20 }}>
                                {sameHours.map((interval, index) => (
                                    <View style={{ flexDirection: "row", width: "100%" }} key={`${interval.start}-${interval.end}-${index}`}>
                                        <View style={styles.endSpacing} />
                                        <View style={styles.singleTimeInterval} >
                                            <Pressable
                                                style={styles.timeContainer}
                                                onPress={() => setActivePicker({ index, type: "start" })}
                                            >
                                                <Text style={{ color: "white" }}>{interval.start.toLocaleTimeString([],
                                                    {
                                                        hour: '2-digit',
                                                        minute: '2-digit'
                                                    }
                                                )}
                                                </Text>
                                            </Pressable>
                                            <Pressable
                                                style={styles.timeContainer}
                                                onPress={() => setActivePicker({ index, type: "end" })}
                                            >
                                                <Text style={{ color: "white" }}>{interval.end.toLocaleTimeString([],
                                                    {
                                                        hour: '2-digit',
                                                        minute: '2-digit'
                                                    }
                                                )}
                                                </Text>
                                            </Pressable>
                                        </View>
                                        <View style={styles.endSpacing}>
                                            {index !== 0 && (
                                                <Pressable style={{ justifyContent: "center" }} onPress={() => handleSameHoursRemoveTimeInterval(index)}>
                                                    <Ionicons size={20} color="white" name="trash" />
                                                </Pressable>
                                            )}
                                        </View>
                                    </View>
                                ))}
                            </ScrollView>
                        </View>
                        <Pressable onPress={handleSameHoursAddTimeInterval}>
                            <Ionicons size={30} color="white" name="add-circle" />
                        </Pressable>
                    </View>
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
                                                    <View style={{ flexDirection: "row", width: "100%" }} key={`${interval.start}-${interval.end}-${index}`}>
                                                        <View style={styles.endSpacing} />
                                                        <View style={styles.singleTimeInterval} >
                                                            <Pressable
                                                                style={styles.timeContainer}
                                                                onPress={() => setActivePicker({ day, index, type: "start" })}
                                                            >
                                                                <Text style={{ color: "white" }}>{interval.start.toLocaleTimeString([],
                                                                    {
                                                                        hour: '2-digit',
                                                                        minute: '2-digit'
                                                                    }
                                                                )}
                                                                </Text>
                                                            </Pressable>
                                                            <Pressable
                                                                style={styles.timeContainer}
                                                                onPress={() => setActivePicker({ day, index, type: "end" })}
                                                            >
                                                                <Text style={{ color: "white" }}>{interval.end.toLocaleTimeString([],
                                                                    {
                                                                        hour: '2-digit',
                                                                        minute: '2-digit'
                                                                    }
                                                                )}
                                                                </Text>
                                                            </Pressable>
                                                        </View>
                                                        <View style={styles.endSpacing}>
                                                            {index !== 0 && (
                                                                <Pressable style={{ justifyContent: "center" }} onPress={() => handleRemoveTimeInterval(day, index)}>
                                                                    <Ionicons size={20} color="white" name="trash" />
                                                                </Pressable>
                                                            )}
                                                        </View>
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
                <Modal
                    visible={activePicker !== null}
                    animationType='slide'
                    transparent
                >
                    <View style={[
                        styles.modal,
                        {
                            paddingTop: insets.top,
                            paddingLeft: insets.left,
                            paddingRight: insets.right,
                        },
                    ]}>
                        <View style={[styles.modalContent, { alignItems: "center", }]}>
                            <Pressable onPress={() => setActivePicker(null)} style={styles.closeButtonContainer}>
                                <Ionicons size={30} color="white" name="close-circle" />
                            </Pressable>
                            {!activePicker ? (
                                <>
                                </>
                            ) : (
                                isSameHours ? (
                                    <DateTimePicker
                                        display='spinner'
                                        mode="time"
                                        is24Hour={true}
                                        value={sameHours[activePicker.index][activePicker.type]}
                                        onChange={(event, selectedDate) => {
                                            setSameHours(prev => (
                                                prev.map((item, i) =>
                                                    activePicker.index === i ? { ...item, [activePicker.type]: selectedDate } : item
                                                )
                                            ))
                                        }}
                                    />
                                ) : (
                                    <DateTimePicker
                                        display='spinner'
                                        value={daysAvailable[activePicker.day].timeIntervals[activePicker.index][activePicker.type]}
                                        mode="time"
                                        is24Hour={true}
                                        onChange={(event, selectedDate) => {
                                            setDaysAvailable(prev => ({
                                                ...prev,
                                                [activePicker.day]: {
                                                    ...prev[activePicker.day],
                                                    timeIntervals: prev[activePicker.day].timeIntervals.map((item, i) =>
                                                        i === activePicker.index
                                                            ? { ...item, [activePicker.type]: selectedDate }
                                                            : item
                                                    ),
                                                }
                                            }))
                                        }}
                                    />
                                )

                            )}
                        </View>
                    </View>
                </Modal>
            </View >
            <Modal
                visible={showDurationModal}
                transparent
                animationType='slide'
            >
                <View style={[
                    styles.modal,
                    {
                        paddingTop: insets.top,
                        paddingLeft: insets.left,
                        paddingRight: insets.right,
                    },
                ]}>
                    <View style={styles.modalContent}>
                        <Pressable onPress={() => setShowDurationModal(false)} style={styles.closeButtonContainer}>
                            <Ionicons size={30} color="white" name="close-circle" />
                        </Pressable>
                        <Picker
                            selectedValue={timeSlotDuration}
                            onValueChange={(itemValue, itemIndex) => setTimeSlotDuration(itemValue)}>
                            <Picker.Item label="5 minutes" value={5} />
                            <Picker.Item label="10 minutes" value={10} />
                            <Picker.Item label="15 minutes" value={15} />
                            <Picker.Item label="20 minutes" value={20} />
                            <Picker.Item label="30 minutes" value={30} />
                            <Picker.Item label="60 minutes" value={60} />
                        </Picker>
                    </View>
                </View>
            </Modal>

            <MyButton2
                onPress={() => router.push("teacherDashboard/course/CreateBookingScreenThree")}
                style={[isDisabledButton && { opacity: 0.3 }, { backgroundColor: "rgba(217, 217, 217, 1)" }]}
                disabled={isDisabledButton}
            >
                <Text> Next </Text>
            </MyButton2>
        </View >
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
    timeSlotDurationButton: {
        backgroundColor: "rgb(125, 78, 87)",
        padding: 5,
        borderRadius: 5
    },
    timeSlotDurationContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginHorizontal: 15

    },
    dayAndTimeIntervals: {
        alignItems: "center",
        gap: 10,
        marginVertical: 10,
    },
    dayHeader: {
        color: "white",
        fontWeight: "bold",
        fontSize: 20,
        width: "100%",
        marginLeft: 35
    },
    timeIntervals: {
        rowGap: 20,
        width: "100%",
    },
    sameHoursTimeIntervals: {
        rowGap: 20,
        alignItems: "center",
    },
    singleTimeInterval: {
        flexDirection: "row",
        justifyContent: "space-between",
        flex: 1,
    },
    timeContainer: {
        width: 100,
        backgroundColor: "rgb(33, 45, 64)",
        height: 30,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
    },
    endContainer: {
        flexDirection: "row",
        gap: 10
    },
    sameHoursSingleTimeInterval: {
        width: "60%"
    },
    text: {
        color: "rgba(217, 217, 217, 1)"
    },
    modal: {
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    modalContent: {
        height: "40%",
        backgroundColor: "rgb(17, 21, 28)",
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        padding: 15,
        paddingBottom: 30,
    },
    closeButtonContainer: {
        width: "100%"
    },
    endSpacing: {
        width: "17%",
        justifyContent: "center",
        paddingLeft: 10
    }

})