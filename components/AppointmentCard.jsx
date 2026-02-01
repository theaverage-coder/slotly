import { StyleSheet, Text, View } from "react-native";
import { useUser } from "../contexts/UserContext";
import MyButton2 from "./MyButton2";


export default function AppointmentCard({ appointment }) {
    const { user } = useUser();
    const start = new Date(appointment.startTime);

    const getDateString = () => {
        return start.toLocaleDateString();
    }

    const getTimeString = () => {
        return start.toLocaleTimeString();
    }
    return (
        <View style={styles.cardContainer}>
            <View style={styles.topContainer}>
                <View style={styles.pictureContainer}>

                </View>
                <View style={styles.detailsContainer}>
                    <Text style={styles.profName}> {appointment.prof} </Text>
                    <Text style={styles.courseCode}> {appointment.booking} </Text>
                    <Text style={styles.time}> {getDateString()} | {getTimeString()} </Text>
                </View>
            </View>
            <View style={styles.bottomContainer}>
                <MyButton2 style={[styles.button]}>
                    <Text>
                        Details
                    </Text>
                </MyButton2>
                <MyButton2 style={[styles.button]}>
                    <Text style={{ color: "red" }}>
                        Cancel
                    </Text>
                </MyButton2>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    cardContainer: {
        width: "90%",
        height: 80,
    },
    topContainer: {
        flexDirection: "column",
    },
    bottomContainer: {
        flexDirection: "column",
        alignItems: "center"
    },
    profName: {
        fontWeight: "bold"
    },
    courseCode: {

    },
    time: {

    },
    button: {
        borderRadius: 10,
        width: "30%",
        height: 30
    }
})