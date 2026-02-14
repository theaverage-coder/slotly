import { Pressable, StyleSheet, Text, View } from "react-native";
import { useUser } from "../contexts/UserContext";


export default function AppointmentCard({ appointment, onDetailPress, onCancelPress }) {
    const { user } = useUser();
    const start = new Date(appointment.startTime);

    const getDateString = () => {
        return start.toLocaleDateString();
    }

    const getTimeString = () => {
        return start.toLocaleTimeString();
    }
    return (
        <View style={styles.cardContainer} >
            <View style={styles.topContainer}>
                <View style={styles.pictureContainer}>
                    <View style={styles.picture} />
                </View>
                <View style={styles.detailsContainer}>
                    <Text style={styles.profName}> {appointment.prof.firstName} {appointment.prof.lastName} </Text>
                    <Text style={styles.courseCode}> {appointment.booking.course.courseCode} </Text>
                    <Text style={styles.time}> {getDateString()} | {getTimeString()} </Text>
                </View>
            </View>
            <View style={styles.line} />
            <View style={styles.bottomContainer}>
                <Pressable style={[styles.button]} onPress={() => onDetailPress(appointment)}>
                    <Text>
                        Details
                    </Text>
                </Pressable>
                <Pressable style={[styles.button]} onPress={() => onCancelPress(appointment)}>
                    <Text style={{ color: "red" }}>
                        Cancel
                    </Text>
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    cardContainer: {
        width: 350,
        height: 180,
        borderRadius: 10,
        alignItems: "center",
        borderWidth: 1,
        borderColor: "rgb(33, 45, 64)"
    },
    topContainer: {
        flexDirection: "row",
        height: "70%",
        width: "100%",
        padding: 15
    },
    line: {
        width: "90%",
        borderWidth: 1,
        borderColor: "white"
    },
    bottomContainer: {
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "30%",
        flexDirection: "row",
        columnGap: 15
    },
    pictureContainer: {
        width: "40%",
        paddingHorizontal: 10
    },
    detailsContainer: {
        //rowGap: 5
    },
    picture: {
        backgroundColor: "grey",
        flex: 1,
        borderRadius: 16
    },
    profName: {
        fontWeight: "bold",
        fontSize: 22,
        color: "white"
    },
    courseCode: {
        color: "white",
        fontSize: 18
    },
    time: {
        marginTop: 8,
        color: "rgba(217, 217, 217, 0.5)"
    },
    button: {
        borderRadius: 10,
        backgroundColor: "rgba(217, 217, 217, 1)",
        textColor: "rgba(33, 33, 33, 1)",
        borderRadius: 10,
        width: "40%",
        height: "75%",
        justifyContent: "center",
        alignItems: "center"
    }
})