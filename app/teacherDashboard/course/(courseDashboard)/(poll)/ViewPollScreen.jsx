import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams } from "expo-router";
import { Platform, StyleSheet, Text, View } from "react-native";
import MyButton2 from "../../../../../components/MyButton2";
import ViewPollBase from "../../../../../components/ViewPollBase";

export default function ViewPollScreen() {
    const { pollObj } = useLocalSearchParams();
    const poll = JSON.parse(pollObj);

    const API_URL =
        Platform.OS === 'web'
            ? process.env.EXPO_PUBLIC_API_URL_WEB
            : process.env.EXPO_PUBLIC_API_URL_MOBILE;

    const handleClosePoll = async () => {
        const token = await AsyncStorage.getItem("token");

        try {
            const response = await fetch(`${API_URL}/api/polls/closePoll/${poll._id}`, {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            });

            if (response.ok) {
                console.log("Poll Closed")
            }
        } catch (err) {
            console.log(err);
        }
    }

    const handleDeletePoll = async () => {
        const token = await AsyncStorage.getItem("token");

        try {
            await fetch(`${API_URL}/api/events/deleteEvent/${poll._id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            })
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <View style={styles.screenContainer}>
            {!poll ? (
                <> </>
            ) : (
                <>
                    <ViewPollBase
                        poll={poll}
                    />
                    {!poll.isClosed && (
                        <MyButton2 onPress={handleClosePoll} style={{
                            backgroundColor: "rgba(217, 217, 217, 0.51)"
                        }}>
                            <Text>
                                Close Poll
                            </Text>
                        </MyButton2>
                    )}
                    <MyButton2 onPress={handleDeletePoll}
                        style={{ backgroundColor: "rgba(217, 217, 217, 0.49)", borderRadius: 10 }}>
                        <Text style={{ color: "red" }}> Delete Event </Text>
                    </MyButton2>
                </>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: "rgb(17, 21, 28)",
        paddingTop: 20
    },

})