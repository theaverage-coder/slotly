import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";


export default function EventCard({ event }) {
    const router = useRouter();
    const start = new Date(event.startTime);

    const handlePress = () => {
        router.push({
            pathname: "teacherDashboard/course/ViewEventScreen",
            params: { event: JSON.stringify(event) }
        });
    }
    return (
        <Pressable onPress={handlePress} style={styles.cardContainer}>
            <View style={styles.date}>
                <Text style={styles.monthText}> {start.toLocaleString('default', { month: 'long' })} </Text>
                <Text style={styles.dayText}> {start.getDate()} </Text>
            </View>
            <View style={styles.title}>
                <Text style={styles.titleText}> {event.title}</Text>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    cardContainer: {
        flexDirection: "row",
        columnGap: 15,
        backgroundColor: "white",
        height: 100,
        borderRadius: 16,
        padding: 10,
        width: 300
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
        justifyContent: "center",
        flex: 1
    },
    monthText: {
        fontSize: 16,
    },
    dayText: {
        fontSize: 14
    },
    titleText: {
        fontSize: 25
    }
})