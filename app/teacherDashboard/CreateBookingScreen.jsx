import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from "@react-native-picker/picker";
import { useLocalSearchParams } from 'expo-router';
import { useState } from "react";
import { Platform, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CreateBookingScreen() {
    const API_URL =
        Platform.OS === 'web'
            ? process.env.EXPO_PUBLIC_API_URL_WEB
            : process.env.EXPO_PUBLIC_API_URL_MOBILE;
    const { courseId } = useLocalSearchParams();
    const [timeSlotDuration, setTimeSlotDuration] = useState(10);
    const [isSameHours, setIsSameHours] = useState(false);
    const [sameHours, setSameHours] = useState([]);
    const [daysAvailable, setDaysAvailable] = useState({
        Monday: { isAvailable: false, timeIntervals: [] },
        Tuesday: { isAvailable: false, timeIntervals: [] },
        Wednesday: { isAvailable: false, timeIntervals: [] },
        Thursday: { isAvailable: false, timeIntervals: [] },
        Friday: { isAvailable: false, timeIntervals: [] },
        Saturday: { isAvailable: false, timeIntervals: [] },
        Sunday: { isAvailable: false, timeIntervals: [] },
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
        <SafeAreaView>
            <Pressable onPress={() => changeDayAvailability("Monday")}>
                <Text> Mon </Text>
            </Pressable>
            <Pressable onPress={() => changeDayAvailability("Tuesday")}>
                <Text> Tue </Text>
            </Pressable>
            <Pressable onPress={() => changeDayAvailability("Wednesday")}>
                <Text> Wed </Text>
            </Pressable>
            <Pressable onPress={() => changeDayAvailability("Thursday")}>
                <Text> Thurs </Text>
            </Pressable>
            <Pressable onPress={() => changeDayAvailability("Friday")}>
                <Text> Fri </Text>
            </Pressable>
            <Pressable onPress={() => changeDayAvailability("Saturday")}>
                <Text> Sat </Text>
            </Pressable>
            <Pressable onPress={() => changeDayAvailability("Sunday")}>
                <Text> Sun </Text>
            </Pressable>

            <View>
                <Text> Use same hours everyday</Text>
                <Pressable onPress={() => setIsSameHours(!isSameHours)}>

                </Pressable>
            </View>
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

            {Object.entries(daysAvailable).map(([day, info]) => {
                if (info.isAvailable) {
                    return (
                        <View key={day} >
                            <Text>{day} </Text>
                            {info.timeIntervals.map((interval, index) => (
                                <View>
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
                                        <Pressable onPress={handleRemoveTimeInterval(day, index)}>
                                            <Text> X </Text>
                                        </Pressable>
                                    )}
                                </View>
                            ))}
                            <Pressable onPress={handleAddTimeInterval(day)}>
                                <Text> Add time interval </Text>
                            </Pressable>
                        </View>
                    );
                }
                return null;
            })}
            <Pressable inPress={handleCreateBooking}>
                <Text> Create Booking </Text>
            </Pressable>
        </SafeAreaView>
    );
}