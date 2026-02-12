import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Keyboard, Modal, Platform, Pressable, ScrollView, StyleSheet, Switch, Text, TextInput, View } from "react-native";
import MyButton2 from "../../../../../../components/MyButton2";
import { useCourseContext } from "../../../../../../contexts/CourseContext";
import { usePollContext } from "../../../../../../contexts/PollContext";

export default function CreatePollScreenTwo() {
    const { poll, setPoll } = usePollContext();
    const { courseId } = useCourseContext();
    const [modalIsVisible, setModalVisibility] = useState(false);
    const router = useRouter();

    const API_URL =
        Platform.OS === 'web'
            ? process.env.EXPO_PUBLIC_API_URL_WEB
            : process.env.EXPO_PUBLIC_API_URL_MOBILE;

    const isDisabledButton = poll.options.length < 2;

    const handleGetDuration = (num) => {
        switch (num) {
            case 1:
                return "24 hours";
            case 3:
                return "3 days";
            case 7:
                return "1 week";
            case 14:
                return "2 weeks";
            default:
                return "Unknown"
        }
    }
    const toggleMultipleVotes = () => {
        setPoll(prev => ({
            ...prev,
            multipleVotes: !prev.multipleVotes
        }))
    }

    const handleSetDuration = (num) => {
        setPoll(prev => ({
            ...prev,
            duration: num
        }))
    }

    const handleAddOption = () => {
        setPoll(prev => ({
            ...prev,
            options: [...prev.options, ""]
        }));
    }

    const handleRemoveOption = (indexToRemove) => {
        setPoll(prev => ({
            ...prev,
            options: prev.options.filter((_, index) => index != indexToRemove)
        }))
    }

    const handleCreatePoll = async () => {
        const pollData = {
            ...poll,
            course: courseId
        }
        const token = await AsyncStorage.getItem("token");

        try {
            const response = await fetch(`${API_URL}/api/polls/createPoll`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(pollData),
            })

            console.log(response);

            if (response.ok) {
                console.log("Poll created!");
                router.navigate("teacherDashboard/course/CoursePollsScreen")
            }
        } catch (err) {
            console.log("Failed to create poll:", err);
        }
    }

    return (
        <View style={styles.screenContainer}>
            <Pressable onPress={Keyboard.dismiss} style={{ flex: 1 }}>
                <View style={styles.header}>
                    <Text style={styles.title}> {poll.title} </Text>
                    <View style={styles.verticalBorder}>
                        <Text style={[styles.description]}> Poll duration </Text>
                        <Pressable onPress={() => setModalVisibility(true)}>
                            <Text style={styles.durationTextColor}> {handleGetDuration(poll.duration)} </Text>
                        </Pressable>
                    </View>
                    <View style={styles.verticalBorder}>
                        <Text style={[styles.description]}> Allow multiple votes</Text>
                        <View>
                            <Switch
                                trackColor={{ false: '#767577', true: "rgba(222, 117, 82, 0.6)" }}
                                thumbColor={poll.multipleVotes ? "rgba(222, 117, 82, 1)" : '#f4f3f4'}
                                value={poll.multipleVotes}
                                onValueChange={toggleMultipleVotes}
                            />
                        </View>
                    </View>
                </View>
                <View style={styles.screenContent}>
                    <ScrollView>
                        <View style={styles.optionsContainer}>
                            {poll.options.map((option, index) => (
                                <View style={styles.individualOptionContainer} key={index}>
                                    <TextInput
                                        style={styles.textField}
                                        placeholder="Option"
                                        value={option}
                                        onChangeText={(text) => {
                                            setPoll(prev => ({
                                                ...prev,
                                                options: prev.options.map((item, i) =>
                                                    index === i ? text : item)
                                            }))
                                        }}
                                    />

                                    {index > 1 && (<Pressable style={styles.deleteSignContainer} onPress={() => handleRemoveOption(index)}>
                                        <Text style={styles.deleteSign}> X </Text>
                                    </Pressable>)}
                                </View>
                            ))}

                        </View>
                    </ScrollView>
                    <Pressable style={[styles.addAnotherOptionButton]} onPress={handleAddOption}>
                        <Text style={{ color: "rgba(116, 116, 116, 1)" }}> Add Another Option </Text>
                    </Pressable>
                </View>

                <Modal visible={modalIsVisible} transparent animationType="slide">
                    <View style={styles.modal}>
                        <View style={styles.modalContent}>
                            <Pressable onPress={() => setModalVisibility(false)}>
                                <Text style={{ color: "white" }}>
                                    Close
                                </Text>
                            </Pressable>
                            <Picker
                                selectedValue={poll.duration}
                                onValueChange={(itemValue, _) => handleSetDuration(itemValue)}>
                                <Picker.Item label="24 hours" value={1} />
                                <Picker.Item label="3 days" value={3} />
                                <Picker.Item label="1 week" value={7} />
                                <Picker.Item label="2 weeks" value={14} />

                            </Picker>
                        </View>
                    </View>
                </Modal>

                <MyButton2
                    disabled={isDisabledButton}
                    style={[{ backgroundColor: "rgba(217, 217, 217, 1)" }, isDisabledButton && styles.disabledButton]}
                    onPress={handleCreatePoll}>
                    <Text> Create Poll </Text>
                </MyButton2>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: "rgb(17, 21, 28)",
        paddingTop: 20
    },
    title: {
        color: "rgba(255, 255, 255, 1)",
        fontFamily: "Urbanist",
        fontSize: 34,
        fontWeight: 700,
        paddingLeft: 15,
        paddingBottom: 15
    },
    description: {
        color: "white",
        fontFamily: "Urbanist",
        fontSize: 15,
        fontWeight: 500,
        paddingLeft: 15,
        width: "75%"
    },
    durationTextColor: {
        color: "rgba(117, 117, 117, 1)",

    },
    screenContent: {
        flex: 1,
        gap: 20,
        alignItems: "center"

    },
    optionsContainer: {
        paddingTop: 30,
        gap: 20,
        width: "100%"
    },
    individualOptionContainer: {
        width: "100%",
        flexDirection: "row",
        marginLeft: 30
    },
    textField: {
        width: "85%",
        height: 60,
        backgroundColor: "rgba(50, 50, 50, 1)",
        justifyContent: "center",
        borderRadius: 16,
        paddingLeft: 20,
        color: "rgba(255, 255, 255, 1)",
    },
    addAnotherOptionButton: {
        backgroundColor: "rgba(85, 85, 85, 0.5)",
        width: "40%",
        borderRadius: 16,
        padding: 10,
    },
    disabledButton: {
        opacity: 0.3
    },
    verticalBorder: {
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderBottomColor: "rgb(88, 88, 88)",
        borderTopColor: "rgb(88, 88, 88)",
        flexDirection: "row",
        alignItems: "center",
        height: 60,
    },
    modal: {
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: "rgba(0,0,0,0.5)"
    },
    modalContent: {
        height: "40%",
        backgroundColor: "rgb(17, 21, 28)",
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        padding: 15
    },
    deleteSignContainer: {
        justifyContent: "center"
    },
    deleteSign: {
        color: "rgba(117, 117, 117, 1)",
    }

})