import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text } from "react-native";

export default function PollCard({ poll }) {
    const router = useRouter();

    const handlePress = () => {
        router.push({
            pathname: "teacherDashboard/course/ViewPollScreen",
            params: { pollObj: JSON.stringify(poll) }
        });
    }
    return (
        <Pressable onPress={handlePress} style={[styles.cardContainer, poll.isClosed ? styles.closedPoll : styles.openPoll]}>
            <Text style={styles.title}>
                {poll.title}
                Ongoing poll since: {poll.dateCreated}
            </Text>
            {poll.expirationDate && (
                <Text>
                    Time left to vote:
                </Text>
            )}
            <Text>
                Checkbox to indicate if user already voted in the poll
            </Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    cardContainer: {
        borderWidth: 1,
        height: 100,
        width: 300,
        padding: 10,
    },
    closedPoll: {
        borderColor: "red"
    },
    openPoll: {
        borderColor: "green"
    }
})