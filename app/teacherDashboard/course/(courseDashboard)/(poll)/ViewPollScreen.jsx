import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Platform, StyleSheet, Text, View } from "react-native";
import MyButton2 from "../../../../../components/MyButton2";

export default function ViewPollScreen() {
    const { pollObj } = useLocalSearchParams();
    const poll = JSON.parse(pollObj);
    const [totalVotes, setTotalVotes] = useState(0);

    useEffect(() => {
        let sum = 0;
        poll.options.forEach((item, index) => {
            sum += item.numVotes;
        })
        setTotalVotes(sum);
    }, []);

    const API_URL =
        Platform.OS === 'web'
            ? process.env.EXPO_PUBLIC_API_URL_WEB
            : process.env.EXPO_PUBLIC_API_URL_MOBILE;

    const getPollStatus = () => {
        if (poll.isClosed) {
            return "Closed"
        }
        if (!poll.expirationDate) {
            return "Open";
        }
        return `Open until ${new Date(poll.expirationDate)}`
    }

    const handleClosePoll = async () => {
        try {
            const response = await fetch(`${API_URL}/api/polls/closePoll/${poll._id}`, {
                method: 'PATCH',
            });

            if (response.ok) {
                console.log("Poll Closed")
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <View style={styles.screenContainer}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}> {poll.title} </Text>
            </View>
            <Text> Poll Created on {poll.dateCreated} </Text>
            <Text> Poll Status: {getPollStatus()} </Text>

            <View style={styles.outerResultContainer}>
                <View style={styles.innerResultContainer}>
                    <FlatList
                        data={poll.options}
                        keyExtractor={item => item._id}
                        ItemSeparatorComponent={() => (
                            <View style={{ height: 20 }} />
                        )}
                        renderItem={({ item }) => {
                            const width = totalVotes === 0 ? 0 : (item.numVotes / totalVotes) * 100;

                            return (
                                <View style={styles.optionBarContainer}>
                                    <View style={[styles.barFill, { width: `${width}%` }]} />
                                    <Text style={styles.optionLabel}>
                                        {item.text} {item.numVotes}
                                    </Text>
                                </View>
                            )
                        }}
                    />
                    <Text> Total Votes: {totalVotes} </Text>
                </View>
            </View>

            {!poll.isClosed && (
                <MyButton2 onPress={handleClosePoll}>
                    <Text>
                        Close Poll
                    </Text>
                </MyButton2>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: "rgba(33, 33, 33, 1)",
        paddingVertical: 20
    },
    titleContainer: {
        alignItems: "center"
    },
    title: {
        color: "rgba(255, 255, 255, 1)",
        fontFamily: "Urbanist",
        fontSize: 34,
        fontWeight: 700,
        paddingLeft: 15,
        paddingBottom: 15
    },
    outerResultContainer: {
        height: "70%",
        padding: 20,
    },
    innerResultContainer: {
        border: 1,
        borderRadius: 16,
        backgroundColor: "rgb(65, 65, 65)",
        flex: 1,
        padding: 10,
        paddingVertical: 20
    },
    optionBarContainer: {
        height: 50,
        width: "100%",
        borderWidth: 1,
        borderRadius: 16,
        position: 'relative',
        justifyContent: "center",

    },
    barFill: {
        height: 50,
        position: 'absolute',
        backgroundColor: "rgb(139, 139, 139)",
        borderTopLeftRadius: 16,
        borderBottomLeftRadius: 16
    },
    optionLabel: {
        zIndex: 1,
        marginLeft: 15
    }

})