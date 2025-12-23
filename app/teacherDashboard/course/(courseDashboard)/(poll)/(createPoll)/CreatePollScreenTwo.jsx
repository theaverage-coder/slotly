import { useRouter } from "expo-router";
import { Keyboard, Platform, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MyButton2 from "../../../../../../components/MyButton2";
import { useCourseContext } from "../../../../../../contexts/CourseContext";
import { usePollContext } from "../../../../../../contexts/PollContext";

export default function CreatePollScreenTwo() {
    const { poll, setPoll } = usePollContext();
    const { courseId } = useCourseContext();

    const router = useRouter();
    const API_URL =
        Platform.OS === 'web'
            ? process.env.EXPO_PUBLIC_API_URL_WEB
            : process.env.EXPO_PUBLIC_API_URL_MOBILE;

    const isDisabledButton = poll.options.length >= 2;

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
        poll.course = courseId;

        try {
            const response = await fetch(`${API_URL}/api/polls/createPoll`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(poll),
            })

            if (response.ok) {
                console.log("Poll created!");
                router.navigate("teacherDashboard/course/CoursePollsScreen")
            }
        } catch (err) {
            console.log("Failed to create poll:", err);
        }
    }

    return (
        <SafeAreaView style={styles.screenContainer}>
            <Pressable onPress={Keyboard.dismiss} style={{ flex: 1 }}>
                <View style={styles.header}>
                    <Text style={styles.title}> {poll.title} </Text>
                    <Text style={styles.description}> Add at least two options </Text>
                </View>
                <View style={styles.optionsContainer}>
                    {poll.options.map((option, index) => (
                        <View>
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

                            <Pressable onPress={handleRemoveOption(index)}>
                                <Text> - </Text>
                            </Pressable>
                        </View>
                    ))}

                </View>
                <Pressable onPress={handleAddOption}>
                    <Text> Add Option</Text>
                </Pressable>
                <MyButton2
                    disabled={isDisabledButton}
                    style={[{ backgroundColor: "rgba(217, 217, 217, 1)", textColor: "rgba(33, 33, 33, 1)" }, isDisabledButton && styles.disabledButton]}
                    onPress={handleCreatePoll}>
                    <Text> Create Poll </Text>
                </MyButton2>
            </Pressable>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: "rgba(33, 33, 33, 1)"
    },
})