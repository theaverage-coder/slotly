import { Pressable, StyleSheet, Text, View } from "react-native";
import { useUser } from "../contexts/UserContext";
import SlotlyLogo from "./SlotlyLogo";

export default function AppointmentCard({ appointment, onDetailPress, onCancelPress }) {
    const { user } = useUser();
    const start = new Date(appointment.startTime);

    const getDateString = () => {
        return start.toLocaleDateString();
    }

    const getTimeString = () => {
        return start.toLocaleTimeString([], {
            hour: "2-digit", minute: "2-digit"
        });
    }

    const getName = () => {
        return `${appointment.appointmentWith.firstName} ${appointment.appointmentWith.lastName}`;
    }
    return (
        <View style={styles.cardContainer} >
            {user ? (
                <>
                    <View style={styles.topContainer}>
                        <View style={[styles.pictureContainer, { borderColor: appointment.course.logoColor }]}>
                            <SlotlyLogo size={80} color={appointment.course.logoColor} />
                        </View>
                        <View style={styles.detailsContainer}>
                            <Text style={styles.profName}> {getName()} </Text>
                            <Text style={styles.courseCode}> {appointment.course.courseCode} </Text>
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
                        <Pressable style={[styles.button, styles.cancelButton]} onPress={() => onCancelPress(appointment)}>
                            <Text style={{ color: "rgb(125, 78, 87)" }}>
                                Cancel
                            </Text>
                        </Pressable>
                    </View>
                </>
            ) : (
                <>
                </>
            )}
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
        borderColor: "rgb(33, 45, 64)",
    },
    topContainer: {
        flexDirection: "row",
        height: "70%",
        width: "100%",
        paddingBottom: 15,
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
        columnGap: 15,
        paddingBottom: 5
    },
    pictureContainer: {
        marginHorizontal: 10,
        paddingHorizontal: 10,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderRadius: 10
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
        fontSize: 24,
        color: "white",
        marginBottom: 3
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
        backgroundColor: "white",
        borderRadius: 10,
        width: "40%",
        height: "75%",
        justifyContent: "center",
        alignItems: "center"
    },
    cancelButton: {
        borderWidth: 1,
        borderColor: "rgb(125, 78, 87)",
        backgroundColor: "rgba(217, 217, 217, 0)",

    }
})