import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Modal, Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import MyButton2 from "../../../../../components/MyButton2";
import { useUser } from "../../../../../contexts/UserContext";

export default function ViewPollScreen() {
    const { pollObj } = useLocalSearchParams();
    const poll = JSON.parse(pollObj);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [modalVisibility, setModalVisibility] = useState(false);
    const { user } = useUser();
    const [userVote, setUserVote] = useState([]); //WHAT ABOUT IF USER HAS MADE MULTIPLE VOTES?
    const [totalVotes, setTotalVotes] = useState(0);
    const insets = useSafeAreaInsets();
    const [optionsMap, setOptionsMap] = useState(new Map());

    const API_URL =
        Platform.OS === 'web'
            ? process.env.EXPO_PUBLIC_API_URL_WEB
            : process.env.EXPO_PUBLIC_API_URL_MOBILE;

    useEffect(() => {
        fetchVotes();
    }, []);

    const fetchVotes = async () => {
        try {
            const response = await fetch(`${API_URL}/api/polls/getAllVotes/${poll._id}`);
            if (response.ok) {

                const allVotes = await response.json();
                const map = new Map();
                let sum = 0;

                allVotes.forEach((vote) => {
                    if (vote.student === user._id) {
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

    const handleCloseModal = () => {
        fetchVotes();
        setModalVisibility(false);
    }

    // If the poll only allows one vote, changes the selectedOptions array to include the new vote
    // Else, add new vote to the array or remove an existing one
    const handleVote = (optionId) => {
        setSelectedOptions(prev => {
            if (!poll.multipleVotes) {
                return [optionId];
            } else {
                if (selectedOptions.includes(optionId)) {
                    return selectedOptions.filter(id =>
                        id != optionId
                    );
                } else {
                    return [...prev, optionId];
                }
            }
        })
    }

    const handleVoteInPoll = async () => {
        const token = await AsyncStorage.getItem("token");

        try {
            const response = await fetch(`${API_URL}/api/polls/voteInPoll`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    pollId: poll,
                    optionsId: selectedOptions
                })
            })

            if (response.ok) {
                console.log("Voted!");
            } else {
                console.log("Failed to send vote")
            }

            handleCloseModal();
        } catch (err) {
            console.log("Failed to send vote: ", err)
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
        <View style={styles.screenContainer}>
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
                                const myVote = userVote.includes(item._id);

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
            <Modal
                visible={modalVisibility}
                animationType="slide"
                transparent>
                <View style={[
                    styles.modalContainer,
                    {
                        paddingTop: insets.top,
                        paddingBottom: insets.bottom,
                        paddingLeft: insets.left,
                        paddingRight: insets.right,
                    },
                ]}>
                    <Pressable onPress={() => setModalVisibility(false)}>
                        <Text style={styles.closeBtn}> Close </Text>
                    </Pressable>
                    <Text style={styles.selectText}>
                        {poll.multipleVotes ? "Select one or more answers" : "Select an answer"}
                    </Text>
                    <View style={styles.flatlistAnswerContainer}>
                        <FlatList
                            data={poll.options}
                            keyExtractor={item => item._id}
                            contentContainerStyle={{ gap: 20, paddingHorizontal: 30 }}
                            renderItem={({ item, index }) => {
                                let selected = selectedOptions.includes(item._id);

                                return (
                                    <Pressable
                                        onPress={() => handleVote(item._id)}
                                        //disabled={index === userVote}
                                        style={[styles.answerContainer, selected && styles.selectedAnswer]}
                                    >
                                        <Text style={styles.answerText}>
                                            {item.text}
                                        </Text>
                                        {selected ? (
                                            <Ionicons size={25} color="rgb(125, 78, 87)" name="checkbox" />
                                        ) : (
                                            <Ionicons size={25} color="white" name="square-outline" />

                                        )}

                                    </Pressable>
                                )
                            }}
                        />
                    </View>
                    <MyButton2
                        onPress={handleVoteInPoll}
                        disabled={selectedOptions.length === 0}
                        style={{ backgroundColor: "rgb(125, 78, 87)", }}>
                        <Text>
                            Send Vote
                        </Text>
                    </MyButton2>
                </View>
            </Modal>

            <MyButton2 onPress={() => setModalVisibility(true)} style={{
                backgroundColor: "white", textColor: "rgba(33, 33, 33, 1)"
            }}>
                {userVote.length !== 0 ? (
                    <Text> Change Vote </Text>
                ) : (
                    <Text> Vote </Text>
                )}

            </MyButton2>

        </View>
    )
}

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: "rgb(17, 21, 28)",
    },
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
    modalContainer: {
        flex: 1,
        backgroundColor: "rgb(17, 21, 28)",
    },
    closeBtn: {
        color: "white",
        paddingTop: 20,
        paddingLeft: 20
    },
    flatlistAnswerContainer: {
        maxHeight: 600,
        marginVertical: 20
    },
    answerContainer: {
        borderRadius: 16,
        height: 70,
        alignItems: "center",
        paddingHorizontal: 20,
        width: "100%",
        flexDirection: "row",
        borderWidth: 1
    },
    selectedAnswer: {
        borderWidth: 1,
        borderColor: "rgb(125, 78, 87)"
    },
    answerText: {
        color: "white",
        flex: 1
    },
    selectText: {
        color: "white",
        fontWeight: "bold",
        marginTop: 20,
        marginLeft: 20
    },
    white: {
        color: "white"
    }
})