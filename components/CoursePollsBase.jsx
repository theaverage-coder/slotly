import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { FlatList, Platform, StyleSheet, Text, View } from "react-native";
import { useCourseContext } from "../contexts/CourseContext";
import BackgroundSlotlyLogo from "./BackgroundSlotlyLogo";
import PollCard from "./PollCard";

export default function CoursePollsBase() {
    const [polls, setPolls] = useState([]);
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
        <View style={{ flex: 1 }}>
            {polls.length === 0 ? (
                <View style={styles.noPollsTextContainer}>
                    <BackgroundSlotlyLogo />
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
    )
}

const styles = StyleSheet.create({
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