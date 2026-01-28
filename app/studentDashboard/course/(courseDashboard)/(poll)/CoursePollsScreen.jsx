import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { FlatList, Platform, StyleSheet, Text, View } from "react-native";
import PollCard from "../../../../../components/PollCard";
import { useCourseContext } from "../../../../../contexts/CourseContext";

export default function CoursePollsScreen() {
    const [polls, setPolls] = useState([]);
    const router = useRouter();
    const { courseId } = useCourseContext();

    const API_URL =
        Platform.OS === 'web'
            ? process.env.EXPO_PUBLIC_API_URL_WEB
            : process.env.EXPO_PUBLIC_API_URL_MOBILE;

    useFocusEffect(useCallback(() => {
        const fetchPolls = async () => {
            try {
                const response = await fetch(`${API_URL}/api/polls/getAllPolls/${courseId}`);
                if (response.ok) {
                    const data = await response.json();
                    setPolls(data);
                }
            } catch (err) {
                console.log("Failed to retrieve polls: ", err);
            }
        }

        fetchPolls();
    }, [])
    );

    return (
        <View style={styles.screenContainer}>
            <View style={{ flex: 1 }}>
                {polls.length === 0 ? (
                    <View style={styles.noPollsTextContainer}>
                        <Text style={styles.noPollsText}>
                            No ongoing polls
                        </Text>
                    </View>
                ) : (
                    <FlatList
                        style={styles.pollsList}
                        contentContainerStyle={{ gap: 20, alignItems: "center" }}
                        data={polls}
                        keyExtractor={item => item._id}
                        renderItem={({ item }) => <PollCard poll={item} />}
                    />
                )}
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: "rgba(33, 33, 33, 1)",
        paddingTop: 30
    },
    noPollsTextContainer: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1
    },
    noPollsText: {
        fontSize: 20,
        color: "white"
    },
})