import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useUser } from "../contexts/UserContext";
import API_URL from '../utils/api';

export default function ViewPollBase({ poll, userVote, setUserVote, refresh = 0 }) {
    const { user } = useUser();
    const [totalVotes, setTotalVotes] = useState(0);
    const [optionsMap, setOptionsMap] = useState(new Map());

    useFocusEffect(useCallback(() => {
        fetchVotes();
    }, [refresh])
    );

    const fetchVotes = async () => {
        if (!user) {
            return;
        }
        try {
            const response = await fetch(`${API_URL}/api/polls/getAllVotes/${poll._id}`);
            if (response.ok) {

                const allVotes = await response.json();
                const map = new Map();
                let sum = 0;

                allVotes.forEach((vote) => {
                    // Record user's vote if they're a student
                    if (user && user.role === "s" && vote.student === user._id) {
                        setUserVote(vote.votes);
                    }
                    sum += vote.votes.length;

                    vote.votes.forEach((optionId) => {
                        if (!map.has(optionId)) {
                            map.set(optionId, 0);
                        }
                        map.set(optionId, map.get(optionId) + 1);
                    })

                })

                setTotalVotes(sum);
                setOptionsMap(map);
            }
        } catch (err) {
            console.log(err);
        }
    }

    const getPollStatus = () => {
        if (poll.isClosed) {
            return "Closed"
        }
        if (!poll.expirationDate) {
            return "Open";
        }
        return `Open until ${new Date(poll.expirationDate).toLocaleDateString()} at ${new Date(poll.expirationDate).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
        })}`
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}> {poll.title} </Text>
            </View>
            <Text style={styles.statusText}> Poll Status: {getPollStatus()} </Text>
            <Text style={styles.statusText}> Poll Created on {new Date(poll.dateCreated).toLocaleDateString()} </Text>
            <View style={styles.outerResultContainer}>
                <View style={styles.innerResultContainer}>
                    <FlatList
                        data={poll.options}
                        keyExtractor={item => item._id}
                        ItemSeparatorComponent={() => (
                            <View style={{ height: 20 }} />
                        )}
                        renderItem={({ item }) => {
                            const numVotes = optionsMap.get(item._id);
                            const width = totalVotes === 0 ? 0 : (numVotes / totalVotes) * 100;
                            const myVote = user && user.role === "s" ? userVote.includes(item._id) : false;

                            return (
                                <View style={[styles.optionBarContainer, myVote && styles.myVote]}>
                                    <View style={[styles.barFill, { width: `${width}% ` }, width === 100 && styles.fullBarFill]} />
                                    <Text style={styles.optionLabel}>
                                        {item.text}
                                    </Text>
                                    {numVotes > 0 && <Text style={[styles.white, { marginRight: 15 }]}>
                                        {numVotes} {numVotes === 1 ? "vote" : "votes"}
                                    </Text>}
                                </View>
                            )
                        }}
                    />
                    <Text style={styles.white}> Total Votes: {totalVotes} </Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    titleContainer: {
        alignItems: "center",
        marginTop: 20
    },
    title: {
        color: "rgba(255, 255, 255, 1)",
        fontFamily: "Urbanist",
        fontSize: 34,
        fontWeight: 700,
        paddingLeft: 15,
        paddingBottom: 15
    },
    statusText: {
        color: "white",
        paddingLeft: 15
    },
    outerResultContainer: {
        height: "70%",
        padding: 20,
    },
    innerResultContainer: {
        border: 1,
        borderRadius: 16,
        backgroundColor: "rgb(33, 45, 64)",
        flex: 1,
        padding: 10,
        paddingVertical: 20
    },
    optionBarContainer: {
        height: 50,
        width: "100%",
        borderRadius: 16,
        alignItems: "center",
        backgroundColor: "rgb(54, 65, 86)",
        position: 'relative',
        flexDirection: "row",
    },
    barFill: {
        height: 50,
        position: 'absolute',
        backgroundColor: "rgba(125, 78, 87, 0.6)",
        borderTopLeftRadius: 16,
        borderBottomLeftRadius: 16
    },
    fullBarFill: {
        borderBottomRightRadius: 16,
        borderTopRightRadius: 16
    },
    optionLabel: {
        zIndex: 1,
        color: "white",
        flex: 1,
        marginLeft: 15
    },
    myVote: {
        borderWidth: 1,
        borderColor: "rgb(125, 78, 87)"
    },
    white: {
        color: "white"
    }
})