import { FlatList, Modal, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MyButton2 from "../../../../../components/MyButton2";
import { useUser } from "../../../../../contexts/UserContext";


export default function ViewPollScreen() {
    const { pollObj } = useLocalSearchParams();
    const poll = JSON.parse(pollObj);
    const [selectedOption, setSelectedOption] = useState(null);
    const [modalVisibility, setModalVisibility] = useState(false);
    const { user } = useUser();
    const [userVote, setUserVote] = useState();

    const handleCloseModal = async () => {
        try {
            const response = await fetch(`${API_URL}/api/polls/getVote/${poll._id}`, {
                method: "POST",
                headers: { 'Content-Type': "application/json" },
                body: JSON.stringify({
                    studentId: user,
                })
            })

            if (response.status === 200) {
                const data = response.json();
                setUserVote(data);
            }
            setModalVisibility(false);
        } catch (err) {
            console.log(err);
        }
    }
    const handleVoteInPoll = async () => {
        try {
            const response = await fetch(`${API_URL}/api/polls/voteInPoll`, {
                method: "POST",
                headers: { 'Content-Type': "application/json" },
                body: JSON.stringify({
                    pollId: poll,
                    studentId: user,
                    voteIndex: selectedOption
                })
            })

            if (response.ok) {
                console.log("Voted!");
                handleCloseModal();
            }
        } catch (err) {
            console.log("Failed to send vote: ", err)
        }
    }

    return (
        <SafeAreaView>
            <Text> {poll.title} </Text>
            <Text> Time the poll closes </Text>
            <Text> Options user voted for should be in a different color </Text>
            <FlatList
                data={poll.options}
                keyExtractor={item => item._id}
                renderItem={({ item, index }) =>
                    <View style={index === userVote && styles.prevVotedOption}>
                        <Text>
                            {item.text}
                        </Text>
                        <Text>
                            {item.numVotes}
                        </Text>
                    </View>
                }
            />
            <Modal
                visible={modalVisibility}
                onRequestClose={handleCloseModal}
                animationType="slide">
                <FlatList
                    data={poll.options}
                    keyExtractor={item => item._id}
                    renderItem={({ item, index }) =>

                        <Pressable
                            onPress={() => setSelectedOption(index)}
                            disabled={index === userVote}
                            style={[styles.option, index === userVote && styles.prevVotedOption, index === selectedOption && styles.selectedOption]}
                        >
                            <Text>
                                {item.text}
                            </Text>
                            <Text>
                                {item.numVotes}
                            </Text>
                        </Pressable>

                    }
                />

                <MyButton2
                    onPress={handleVoteInPoll}
                    disabled={selectedOption === null}>
                    <Text>
                        Send Vote
                    </Text>
                </MyButton2>
            </Modal>
            <MyButton2 onPress={() => setModalVisibility(true)}>
                <Text> Vote </Text>
            </MyButton2>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

})