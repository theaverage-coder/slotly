import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Switch, Text, TextInput, View } from "react-native";
import MyButton2 from "../../../../../../components/MyButton2";
import { useBookingContext } from '../../../../../../contexts/BookingContext';
import { useCourseContext } from "../../../../../../contexts/CourseContext";

export default function CreateBookingScreenThree() {
    const router = useRouter();
    const { isSameHours, sameHours, setSameHours, daysAvailable, setDaysAvailable, timeSlotDuration, setTimeSlotDuration, } = useBookingContext();
    const { courseId } = useCourseContext();
    const [sameLocation, setSameLocation] = useState(false);
    const [globalLocation, setGlobalLocation] = useState("");
    const [officeHours, setOfficeHours] = useState(null);
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

    useFocusEffect(useCallback(() => {
        //console.log('days available: ', daysAvailable);
        // Filter available days and add separate time intervals to each if they have global hours (sameHours)
        const hours = Object.entries(daysAvailable ?? {})
            .map(([dayName, value], index) => ({
                day: index,
                isAvailable: value.isAvailable,
                timeIntervals: value.timeIntervals
            }))
            .filter((item) => item.isAvailable)
            .map(({ day, timeIntervals }) => ({ day, timeIntervals: isSameHours ? sameHours : timeIntervals }))

        setOfficeHours(hours);

    }, [])
    );
    const API_URL =
        Platform.OS === 'web'
            ? process.env.EXPO_PUBLIC_API_URL_WEB
            : process.env.EXPO_PUBLIC_API_URL_MOBILE;


    const hasInvalidLocation = (intervals) => {
        for (let i = 0; i < intervals.length; i++) {
            if (intervals[i].location === "") {
                return true;
            }
        }
        return false;
    }

    const hasInvalidInterval = () => {
        //console.log("office hours:", officeHours)
        return officeHours.some(({ day, timeIntervals }) => {
            //console.log('timeIntervals', timeIntervals);
            return hasInvalidLocation(timeIntervals);
        });
    }

    const isDisabledButton = !officeHours || (sameLocation && globalLocation === "") || (!sameLocation && hasInvalidInterval());

    const handleIntervalLocation = (day, text, intervalIdx) => {
        setOfficeHours(prev => {
            return prev.map(prevObj => {
                if (prevObj.day === day) {
                    return {
                        ...prevObj,
                        timeIntervals: prevObj.timeIntervals.map((item, i) =>
                            i === intervalIdx ?
                                { ...item, location: text }
                                : item
                        )
                    }
                }
                return prevObj;
            })
        })
    }

    const handleGlobalLocation = (text) => {
        setGlobalLocation(text);
    }

    const getDayName = (day) => {
        return dayNames[day];
    }

    const getTime = (date) => {
        return date.toLocaleTimeString([],
            {
                hour: '2-digit',
                minute: '2-digit'
            }
        )
    }

    const handleCreateBooking = async () => {
        const token = await AsyncStorage.getItem("token");
        let newHours;

        // Set location for all intervals to globalLocation
        if (sameLocation) {
            newHours = officeHours.map(prev => {
                return {
                    ...prev,
                    timeIntervals: prev.timeIntervals.map((item, i) => {
                        return {
                            ...item,
                            location: globalLocation
                        }
                    }
                    )
                }
            })
        } else {
            newHours = officeHours;
        }

        try {
            const response = await fetch(`${API_URL}/api/bookings/createBooking`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    courseId: courseId,
                    officeHours: newHours,
                    timeSlotDuration: timeSlotDuration,
                }),
            });

            if (response.ok) {
                console.log("Succesfully created booking");
                router.replace("teacherDashboard/course/CourseDetailsScreen")
                Alert.alert("Booking created!");
            } else {
                Alert.alert("Something went wrong. Please try again.")
            }
        } catch (err) {
            console.log("Unsucessful", err);
            Alert.alert("Something went wrong. Please try again.")
        }
    };

    return (
        <View style={styles.screenContainer}>
            <KeyboardAvoidingView style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={120}
            >
                <ScrollView
                    contentContainerStyle={{ gap: 10, marginHorizontal: 20, paddingBottom: 120 }}
                >
                    <View style={styles.header}>
                        <Text style={styles.title}> Set Location </Text>
                        <Text style={styles.description}>Add meeting locations so students know where to find you </Text>
                        <View style={styles.sameLocationContainer}>

                            <Text style={[styles.text, { flex: 1 }]}> Use the same location everywhere </Text>
                            <Switch
                                trackColor={{ false: '#767577', true: "rgb(125, 78, 87)" }}
                                thumbColor={'#f4f3f4'}
                                value={sameLocation}
                                onValueChange={() => setSameLocation(!sameLocation)}>
                            </Switch>
                        </View>
                    </View>
                    {officeHours && officeHours.map(({ day, timeIntervals }) => {
                        return (
                            <View key={day}>
                                <Text style={styles.dayHeader}> {getDayName(day)} </Text>
                                {
                                    timeIntervals.map((interval, idx) => (
                                        <View key={interval}>
                                            <Text style={{ color: "white", marginBottom: 10 }}> {getTime(interval.start)} - {getTime(interval.end)}
                                            </Text>
                                            <TextInput
                                                style={styles.inputField}
                                                placeholder="Enter location"
                                                value={sameLocation ? globalLocation : interval.location}
                                                onChangeText={(text) => {
                                                    if (sameLocation) {
                                                        handleGlobalLocation(text);
                                                    } else {
                                                        handleIntervalLocation(day, text, idx);
                                                    }
                                                }

                                                }
                                            />
                                        </View>
                                    ))

                                }
                            </View>
                        )
                    })}
                </ScrollView>
            </KeyboardAvoidingView>
            <MyButton2
                onPress={handleCreateBooking}
                style={[isDisabledButton && { opacity: 0.3 }, { backgroundColor: "rgba(217, 217, 217, 1)" }]}
                disabled={isDisabledButton}
            >
                <Text> Create Booking </Text>
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
    header: {
        gap: 15,
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
        fontWeight: 500
    },
    dayHeader: {
        color: "rgb(125, 78, 87)",
        fontSize: 20,
        marginVertical: 15,
        fontWeight: "bold"
    },
    inputField: {
        width: "100%",
        height: 60,
        backgroundColor: "rgb(33, 45, 64)",
        justifyContent: "center",
        borderRadius: 16,
        paddingLeft: 20,
        color: "rgba(255, 255, 255, 1)",
    },
    text: {
        color: "rgba(217, 217, 217, 1)"
    },
    sameLocationContainer: {
        flexDirection: "row",
        columnGap: 15,
        marginHorizontal: 20,
        alignItems: "center",
    },
})