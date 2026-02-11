import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useUser } from "../contexts/UserContext";

export default function EventCard({ event, homeScreen = false, onDetailsPress }) {
    const router = useRouter();
    const { user } = useUser();
    const start = new Date(event.startTime);

    const getDateString = () => {
        return start.toLocaleDateString();
    }

    const getTimeString = () => {
        return start.toLocaleTimeString();
    }
    const handlePress = () => {
        if (user.role === "s") {
            router.push({
                pathname: "studentDashboard/course/ViewEventScreen",
                params: { initialEventObj: JSON.stringify(event) }
            });
        } else {
            router.push({
                pathname: "teacherDashboard/course/ViewEventScreen",
                params: { eventObj: JSON.stringify(event) }
            });
        }

    }

    return (
        <>
            {homeScreen ? (
                <View style={styles.cardContainerHome}>
                    <View style={styles.verticalBar}>
                        <Text style={styles.verticalText}>Event</Text>
                    </View>
                    <View style={{ flex: 1, alignItems: "center" }}>
                        <View style={styles.detailsContainer}>
                            <Text style={styles.title}> {event.title} </Text>
                            <Text style={styles.time}> {getDateString()} | {getTimeString()} </Text>
                        </View>
                        <View style={styles.line} />
                        <View style={styles.bottomContainer}>
                            <Pressable style={[styles.button]} onPress={() => onDetailsPress(event)}>
                                <Text> Details </Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            ) : (
                <Pressable onPress={handlePress} style={styles.cardContainer}>
                    <View style={styles.date}>
                        <Text style={styles.time}> {getDateString()} | {getTimeString()} </Text>

                    </View>
                    <View style={styles.title}>
                        <Text style={styles.titleText}> {event.title}</Text>
                    </View>
                </Pressable>
            )
            }
        </>


    )
}

const styles = StyleSheet.create({
    cardContainerHome: {
        flexDirection: "row",
        width: 350,
        height: 180,
        borderRadius: 10,
        borderWidth: 1,
    },
    cardContainer: {
        flexDirection: "row",
        columnGap: 15,
        backgroundColor: "white",
        height: 100,
        borderRadius: 16,
        padding: 10,
        width: 300
    },
    detailsContainer: {
        flexDirection: "column",
        marginVertical: 10,
        marginRight: 10,
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
    },
    date: {
        width: 82,
        height: 82,
        backgroundColor: "rgba(217, 217, 217, 1)",
        borderRadius: 12,
        alignItems: "center",
        paddingTop: 7
    },
    title: {
        fontWeight: "bold",
        fontSize: 22,
        color: "white",
        marginBottom: 10
    },
    time: {
        marginTop: 8,
        color: "rgba(217, 217, 217, 0.5)"
    },
    titleText: {
        fontSize: 25
    },
    line: {
        width: "90%",
        borderWidth: 1
    },
    bottomContainer: {
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "30%",
        width: "100%",
    },
    button: {
        borderRadius: 10,
        backgroundColor: "rgba(217, 217, 217, 1)",
        textColor: "rgba(33, 33, 33, 1)",
        borderRadius: 10,
        width: "90%",
        height: "75%",
        justifyContent: "center",
        alignItems: "center"
    },
    verticalBar: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgb(125, 78, 87)",
        borderBottomLeftRadius: 10,
        borderTopLeftRadius: 10
    },
    verticalText: {
        transform: [{ rotate: '90deg' }],
        textAlign: 'center',
        fontSize: 20,
        color: "white",
        letterSpacing: 2
    }
})