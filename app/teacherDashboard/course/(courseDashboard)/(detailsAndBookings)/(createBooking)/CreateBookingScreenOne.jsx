import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Switch, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MyButton2 from "../../../../../../components/MyButton2";
import { useBookingContext } from "../../../../../../contexts/BookingContext";

export default function CreateBookingScreenOne() {
    const { daysAvailable, setDaysAvailable, isSameHours, setIsSameHours } = useBookingContext();
    const router = useRouter();

    const isDisabledButton = !daysAvailable.Sunday.isAvailable &&
        !daysAvailable.Monday.isAvailable &&
        !daysAvailable.Tuesday.isAvailable &&
        !daysAvailable.Wednesday.isAvailable &&
        !daysAvailable.Thursday.isAvailable &&
        !daysAvailable.Friday.isAvailable &&
        !daysAvailable.Saturday.isAvailable;

    const changeDayAvailability = (day) => {
        setDaysAvailable(prev => ({
            ...prev, [day]: {
                ...prev[day], isAvailable: !prev[day].isAvailable,
                timeIntervals: prev[day].isAvailable ? [] : [{ start: new Date(), end: new Date() }]
            }
        }))
    }

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
                <Text style={[styles.text, { width: "55%" }]}> Use same hours everyday</Text>
                <Switch
                    trackColor={{ false: '#767577', true: "rgba(222, 117, 82, 0.6)" }}
                    thumbColor={isSameHours ? "rgba(222, 117, 82, 1)" : '#f4f3f4'}
                    value={isSameHours}
                    onValueChange={() => setIsSameHours(!isSameHours)}>

                </Switch>
            </View>

            <MyButton2
                disabled={isDisabledButton}
                onPress={() => router.navigate("teacherDashboard/course/CreateBookingScreenTwo")} style={{ backgroundColor: "rgba(217, 217, 217, 1)" }}>
                <Text> Next </Text>
            </MyButton2>
        </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    screenContainer: {
        backgroundColor: "rgb(17, 21, 28)",
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
    timeSlotDurationContainer: {
        flexDirection: "row",
        columnGap: 15,
        marginLeft: 5,
        height: "5%",
        alignItems: "center"

    },
    text: {
        color: "rgba(217, 217, 217, 1)"
    },
})