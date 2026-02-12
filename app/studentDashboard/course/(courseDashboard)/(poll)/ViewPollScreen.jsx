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
    /*
    useFocusEffect(useCallback(() => {
        let sum = 0;
        poll.options.forEach((item, index) => {
            sum += item.numVotes;
        })
        setTotalVotes(sum);

        getVote();
    }, [])
    );

    const getVote = async () => {
        try {
            const response = await fetch(`${API_URL}/api/polls/getVote/${poll._id}`, {
                method: "POST",
                headers: { 'Content-Type': "application/json" },
                body: JSON.stringify({
                    studentId: user._id,
                })
            })

            if (response.ok) {
                const data = await response.json();
                setUserVote(data.optionId);
            }
        } catch (err) {
            console.log(err);
        }
    }*/

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
        return `Open until ${new Date(poll.expirationDate)}`
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
                                const width = totalVotes === 0 ? 0 : (optionsMap.get(item._id) / totalVotes) * 100;

                                return (
                                    <View style={[item._id === userVote && styles.prevVotedOption, styles.optionBarContainer]}>
                                        <View style={[styles.barFill, { width: `${width}%` }]} />
                                        <Text style={styles.optionLabel}>
                                            {item.text}
                                        </Text>
                                    </View>
                                )
                            }}
                        />
                        <Text> Total Votes: {totalVotes} </Text>
                    </View>
                </View>
            </View>
            <Modal
                visible={modalVisibility}
                animationType="slide">
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
                        <Text> Close </Text>
                    </Pressable>
                    <FlatList
                        data={poll.options}
                        keyExtractor={item => item._id}
                        renderItem={({ item, index }) =>
                            <Pressable
                                onPress={() => handleVote(item._id)}
                                //disabled={index === userVote}
                                style={[styles.option,]}
                            >
                                <Text>
                                    {item.text}
                                </Text>
                                <Text>
                                    {optionsMap.get(item._id)}
                                </Text>
                            </Pressable>
                        }
                    />
                    <Text> {selectedOptions} </Text>
                    <MyButton2
                        onPress={handleVoteInPoll}
                        disabled={selectedOptions.length === 0}>
                        <Text>
                            Send Vote
                        </Text>
                    </MyButton2>
                </View>
            </Modal>

            <MyButton2 onPress={() => setModalVisibility(true)} style={{
                backgroundColor: "rgba(217, 217, 217, 0.51)", textColor: "rgba(33, 33, 33, 1)"
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
        backgroundColor: "rgba(33, 33, 33, 1)",
        paddingTop: 20

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
        backgroundColor: "rgb(105, 105, 105)",
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
        backgroundColor: "rgba(222, 117, 82, 1)",
        borderTopLeftRadius: 16,
        borderBottomLeftRadius: 16
    },
    optionLabel: {
        zIndex: 1,
        marginLeft: 15
    },
    modalContainer: {
        flex: 1,
    }
})