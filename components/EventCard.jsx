import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { AutoSizeText, ResizeTextMode } from 'react-native-auto-size-text';
import { useUser } from "../contexts/UserContext";

export default function EventCard({ event, homeScreen = false, onDetailsPress }) {
    const router = useRouter();
    const { user } = useUser();
    const start = new Date(event.startTime);
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thurday", "Friday", "Saturday"];
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"]

    const getDateString = () => {
        return start.toLocaleDateString();
    }

    const getTimeString = () => {
        return start.toLocaleTimeString([], {
            hour: "2-digit", minute: "2-digit"
        });
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
                        <View style={styles.rotatedView}>
                            <Text style={styles.verticalText}>Event</Text>
                        </View>
                    </View>
                    <View style={{ flex: 1, alignItems: "center" }}>
                        <View style={styles.detailsContainer}>
                            <AutoSizeText
                                fontSize={20}
                                numberOfLines={1}
                                mode={ResizeTextMode.max_font_size}
                                style={[styles.title]}
                            >
                                {event.title}
                            </AutoSizeText>
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
                        <Text
                            style={styles.dayText}
                            numberOfLines={1}
                            adjustsFontSizeToFit
                        > {dayNames[start.getDay()]}</Text>
                        <Text style={styles.dateText}> {monthNames[start.getMonth()]} {start.getDate()}</Text>
                    </View>
                    <View style={styles.title2Container}>
                        <AutoSizeText
                            fontSize={22}
                            numberOfLines={1}
                            mode={ResizeTextMode.max_lines}
                            style={[styles.title]}
                        >
                            {event.title}
                        </AutoSizeText>
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
        borderColor: "rgb(33, 45, 64)"
    },
    cardContainer: {
        flexDirection: "row",
        columnGap: 15,
        backgroundColor: "rgb(33, 45, 64)",
        height: 100,
        borderRadius: 8,
        padding: 10,
        width: 300,
        alignItems: "center",

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
        width: 90,
        height: 82,
        borderRadius: 8,
        borderWidth: 1,
        alignItems: "center",
        paddingTop: 15,
        borderColor: "rgb(54, 65, 86)",
        gap: 5
    },
    title2Container: {
        justifyContent: "center"
    },
    title: {
        fontWeight: "bold",
        color: "white",
        marginBottom: 10
    },
    time: {
        marginTop: 8,
        color: "rgba(217, 217, 217, 0.5)"
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
        borderTopLeftRadius: 10,
        height: 180,
        width: 60,
    },
    rotatedView: {
        transform: [{ rotate: '270deg' }],

    },
    verticalText: {
        textAlign: 'center',
        fontSize: 20,
        color: "white",
        letterSpacing: 2
    },
    dayText: {
        fontWeight: "bold",
        fontSize: 17,
        color: "white"
    },
    dateText: {
        color: "rgba(217, 217, 217, 0.5)",
        fontSize: 15
    }
})