import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import { Modal, Platform, Pressable, StyleSheet, Switch, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MyButton2 from '../../../../../../components/MyButton2';
import { useCourseContext } from '../../../../../../contexts/CourseContext';

export default function CreateBookingScreen() {
    const API_URL =
        Platform.OS === 'web'
            ? process.env.EXPO_PUBLIC_API_URL_WEB
            : process.env.EXPO_PUBLIC_API_URL_MOBILE;

    const { courseId } = useCourseContext();
    const [timeSlotDuration, setTimeSlotDuration] = useState(10);
    const [isSameHours, setIsSameHours] = useState(false);
    const [sameHours, setSameHours] = useState([{ start: new Date(), end: new Date() }]);
    const [modalIsVisible, setModalVisibility] = useState(false);
    const [daysAvailable, setDaysAvailable] = useState({
        Sunday: { isAvailable: false, timeIntervals: [] },
        Monday: { isAvailable: false, timeIntervals: [] },
        Tuesday: { isAvailable: false, timeIntervals: [] },
        Wednesday: { isAvailable: false, timeIntervals: [] },
        Thursday: { isAvailable: false, timeIntervals: [] },
        Friday: { isAvailable: false, timeIntervals: [] },
        Saturday: { isAvailable: false, timeIntervals: [] },

    });


    const changeDayAvailability = (day) => {
        setDaysAvailable(prev => ({
            ...prev, [day]: {
                ...prev[day], isAvailable: !prev[day].isAvailable,
                timeIntervals: prev[day].isAvailable ? [] : [{ start: new Date(), end: new Date() }]
            }
        }))
    }

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

    const handleCreateBooking = async () => {
        const officeHours = Object.entries(daysAvailable).filter(([key, value]) =>
            value.isAvailable).map(([key, value], index) => ({ day: index, timeIntervals: value.timeIntervals }))
        try {
            const response = await fetch(`${API_URL}/api/bookings/createBooking`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    course: courseId,
                    officeHours: officeHours,
                    timeSlotDuration: timeSlotDuration,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                console.log("Succesfully created booking");
                //router.replace("teacherDashboard/HomeScreen")
            }
        } catch (err) {
            console.log("Unsucessful");
            console.log(err);
        }
    };


    //PROCESS OF CREATING A BOOKING
    //1. check days available at the top
    //2. checked days appear at the bottom with one interval
    //3. remove/add intervals/days at will
    // 4. have an option to make intervals the same for all checked days

    return (
        <SafeAreaView style={styles.screenContainer}>
            <View style={[styles.daysOfWeek]}>
                <Pressable style={[styles.day, daysAvailable.Sunday.isAvailable && styles.selectedDay]} onPress={() => changeDayAvailability("Sunday")}>
                    <Text style={{ color: daysAvailable.Sunday.isAvailable ? "black" : "rgba(217, 217, 217, 1)" }}> Sun </Text>
                </Pressable>
                <Pressable style={[styles.day, daysAvailable.Monday.isAvailable && styles.selectedDay]} onPress={() => changeDayAvailability("Monday")}>
                    <Text style={{ color: daysAvailable.Monday.isAvailable ? "black" : "rgba(217, 217, 217, 1)" }}> Mon </Text>
                </Pressable>
                <Pressable style={[styles.day, daysAvailable.Tuesday.isAvailable && styles.selectedDay]} onPress={() => changeDayAvailability("Tuesday")}>
                    <Text style={{ color: daysAvailable.Tuesday.isAvailable ? "black" : "rgba(217, 217, 217, 1)" }}> Tue </Text>
                </Pressable>
                <Pressable style={[styles.day, daysAvailable.Wednesday.isAvailable && styles.selectedDay]} onPress={() => changeDayAvailability("Wednesday")}>
                    <Text style={{ color: daysAvailable.Wednesday.isAvailable ? "black" : "rgba(217, 217, 217, 1)" }}> Wed </Text>
                </Pressable>
                <Pressable style={[styles.day, daysAvailable.Thursday.isAvailable && styles.selectedDay]} onPress={() => changeDayAvailability("Thursday")}>
                    <Text style={{ color: daysAvailable.Thursday.isAvailable ? "black" : "rgba(217, 217, 217, 1)" }}> Thu </Text>
                </Pressable>
                <Pressable style={[styles.day, daysAvailable.Friday.isAvailable && styles.selectedDay]} onPress={() => changeDayAvailability("Friday")}>
                    <Text style={{ color: daysAvailable.Friday.isAvailable ? "black" : "rgba(217, 217, 217, 1)" }}> Fri </Text>
                </Pressable>
                <Pressable style={[styles.day, daysAvailable.Saturday.isAvailable && styles.selectedDay]} onPress={() => changeDayAvailability("Saturday")}>
                    <Text style={{ color: daysAvailable.Saturday.isAvailable ? "black" : "rgba(217, 217, 217, 1)" }}> Sat </Text>
                </Pressable>
            </View>

            <View style={styles.timeSlotDurationContainer}>
                <Text style={[styles.text, { width: "55%" }]}>
                    Duration of each appointment:
                </Text>
                <Pressable style={styles.timeSlotDurationButton} onPress={() => setModalVisibility(true)}>
                    <Text >
                        {timeSlotDuration} minutes
                    </Text>
                </Pressable>

            </View>

            <View style={styles.timeSlotDurationContainer}>
                <Text style={[styles.text, { width: "55%" }]}> Use same hours everyday</Text>
                <Switch
                    trackColor={{ false: '#767577', true: "rgba(222, 117, 82, 0.6)" }}
                    thumbColor={isSameHours ? "rgba(222, 117, 82, 1)" : '#f4f3f4'}
                    value={isSameHours}
                    onValueChange={() => setIsSameHours(!isSameHours)}>

                </Switch>
            </View>

            <Modal visible={modalIsVisible} transparent animationType='slide'>
                <View style={styles.modal}>
                    <View style={styles.modalContent}>
                        <Pressable onPress={() => setModalVisibility(false)}>
                            <Text>
                                Close
                            </Text>
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

            <MyButton2 onPress={handleCreateBooking} style={{ backgroundColor: "rgba(217, 217, 217, 1)", textColor: "rgba(33, 33, 33, 1)" }}>
                <Text> Create Booking </Text>
            </MyButton2>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screenContainer: {
        backgroundColor: "rgba(33, 33, 33, 1)",
        flex: 1,
        rowGap: 20,
    },
    daysOfWeek: {
        flexDirection: "row",
        justifyContent: "center",
        columnGap: 5
    },
    day: {
        borderWidth: 1,
        borderRadius: 15,
        width: 50,
        alignItems: "center",
        height: 50,
        justifyContent: "center",
        borderColor: "rgba(217, 217, 217, 1)"
    },
    selectedDay: {
        backgroundColor: "rgba(217, 217, 217, 1)",
        color: "black"
    },
    modal: {
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    modalContent: {
        height: "40%",
        backgroundColor: "rgba(33, 33, 33, 1)",
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        padding: 15
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
    timeSlotDurationButton: {
        backgroundColor: "rgba(217, 217, 217, 0.5)",
        padding: 5,
        borderRadius: 5
    },
    timeSlotDurationContainer: {
        flexDirection: "row",
        columnGap: 15,
        marginLeft: 5,
        height: "5%",
        alignItems: "center"

    }

})