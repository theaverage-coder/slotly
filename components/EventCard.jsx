import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";


export default function EventCard({ event }) {
    const router = useRouter();

    const handlePress = () => {
        router.push({
            pathname: "teacherDashboard/course/ViewEventScreen",
            params: { event: JSON.stringify(event) }
        });
    }
    return (
        <Pressable onPress={handlePress} style={styles.cardContainer}>
            <View>
                <Text> {event.title}</Text>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    cardContainer: {
        flexDirection: "row",
        columnGap: 15,
        backgroundColor: "white"
    },
})