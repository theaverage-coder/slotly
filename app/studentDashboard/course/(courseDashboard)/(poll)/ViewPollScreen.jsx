import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { FlatList, Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import MyButton2 from "../../../../../components/MyButton2";
import ViewPollBase from "../../../../../components/ViewPollBase";
import API_URL from '../../../../../utils/api';

export default function ViewPollScreen() {
    const { pollObj } = useLocalSearchParams();
    const poll = JSON.parse(pollObj);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [modalVisibility, setModalVisibility] = useState(false);
    const [userVote, setUserVote] = useState([]);
    const insets = useSafeAreaInsets();
    const [refresh, setRefresh] = useState(0); // To trigger a re-render when a vote is sent

    const handleCloseModal = () => {
        setRefresh(prev => prev + 1);
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

    return (
        <View style={styles.screenContainer}>
            {!poll ? (
                <> </>
            ) : (
                <>
                    <ViewPollBase
                        poll={poll}
                        userVote={userVote}
                        setUserVote={setUserVote}
                        refresh={refresh}
                    />
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
                </>
            )}


        </View>
    )
}

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: "rgb(17, 21, 28)",
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