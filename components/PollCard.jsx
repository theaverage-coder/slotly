import Ionicons from "@react-native-vector-icons/ionicons";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useUser } from "../contexts/UserContext";

export default function PollCard({ poll }) {
    const router = useRouter();
    const { user } = useUser();

    const handlePress = () => {
        if (user.role === "s") {
            router.push({
                pathname: "studentDashboard/course/ViewPollScreen",
                params: { pollObj: JSON.stringify(poll) }
            });
        } else {
            router.push({
                pathname: "teacherDashboard/course/ViewPollScreen",
                params: { pollObj: JSON.stringify(poll) }
            });
        }
    }

    const getTimeLeft = () => {
        if (!poll.expirationDate || new Date(poll.expirationDate) < new Date()) {
            return "";
        }
        const expirationDate = new Date(poll.expirationDate);
        const timeLeft = expirationDate - Date.now();
        const totalHours = Math.floor(timeLeft / (1000 * 60 * 60));
        const daysLeft = Math.floor(totalHours / 24);
        const hoursLeft = totalHours % 24;

        if (daysLeft === 0 && hoursLeft === 0) {
            const minutesLeft = Math.floor(timeLeft / (1000 * 60));
            return `${minutesLeft}min`;
        }

        return `${daysLeft}d ${hoursLeft}h`;
    }
    return (
        <Pressable onPress={handlePress} style={[styles.cardContainer, poll.isClosed ? styles.closedPoll : styles.openPoll]}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>
                    {poll.title}
                </Text>
            </View>
            <View style={styles.rightContainer}>
                {getTimeLeft() && <Ionicons size={20} color="white" name="time" />}
                <Text style={[styles.timeLeft]}>
                    {getTimeLeft()}
                </Text>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    cardContainer: {
        height: 100,
        width: 300,
        padding: 10,
        borderRadius: 8,
        backgroundColor: "rgb(51, 51, 51)",
        flexDirection: "row",
        borderLeftWidth: 7,
    },
    titleContainer: {
        width: "70%",
        justifyContent: "center"
    },
    title: {
        fontSize: 25,
        color: "white",
        fontWeight: 700,
    },
    closedPoll: {
        borderLeftColor: "red"
    },
    openPoll: {
        borderLeftColor: "green"
    },
    rightContainer: {
        width: "30%",
        gap: 5,
        justifyContent: "flex-end",
        flexDirection: "row",
    },
    timeLeft: {
        color: "white",
        fontSize: 15,
    },
    votedCheckbox: {
        marginTop: 0,
        fontSize: 40,
        color: "white"
    }
})