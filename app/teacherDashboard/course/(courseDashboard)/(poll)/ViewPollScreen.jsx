import { useLocalSearchParams } from "expo-router";
import { FlatList, Platform, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MyButton2 from "../../../../../components/MyButton2";

export default function ViewPollScreen() {
    const { pollObj } = useLocalSearchParams();
    const poll = JSON.parse(pollObj);

    const API_URL =
        Platform.OS === 'web'
            ? process.env.EXPO_PUBLIC_API_URL_WEB
            : process.env.EXPO_PUBLIC_API_URL_MOBILE;

    const handleClosePoll = async () => {
        try {
            await fetch(`${API_URL}/api/polls/closePoll/${poll._id}`)
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <SafeAreaView style={styles.screenContainer}>
            {poll.isClosed ? (
                <Text>
                    Poll Status: Closed
                </Text>
            ) : (
                <Text>
                    Poll Status: Open
                </Text>
            )}

            <FlatList
                data={poll.options}
                keyExtractor={item => item._id}
                renderItem={({ item }) =>
                    <>
                        <Text>
                            {item.text}
                        </Text>
                        <Text>
                            {item.numVotes}
                        </Text>
                    </>
                }
            />

            {!poll.isClosed && (
                <MyButton2 onPress={handleClosePoll}>
                    <Text>
                        Close Poll
                    </Text>
                </MyButton2>
            )}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
    },

})