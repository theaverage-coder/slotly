import { useRouter } from "expo-router";
import { Keyboard, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MyButton2 from "../../../../../../components/MyButton2";
import { usePollContext } from "../../../../../../contexts/PollContext";

export default function CreatePollScreenOne() {
    const { poll, setPoll } = usePollContext();
    const router = useRouter();
    const isDisabledButton = poll.title === "";

    return (
        <SafeAreaView style={styles.screenContainer}>
            <Pressable onPress={Keyboard.dismiss} style={{ flex: 1 }}>
                <View style={styles.header}>
                    <Text style={styles.title}> Set Your Poll Title </Text>
                    <Text style={styles.description}> What do you want to ask your students? </Text>
                </View>
                <View style={styles.inputFields}>
                    <TextInput
                        style={styles.textField}
                        placeholder="Poll Title"
                        value={poll.title}
                        onChangeText={(text) => setPoll(prev => ({ ...prev, title: text }))}
                    />
                </View>
                <MyButton2
                    disabled={isDisabledButton}
                    style={[{ backgroundColor: "rgba(217, 217, 217, 1)", textColor: "rgba(33, 33, 33, 1)" }, isDisabledButton && styles.disabledButton]}
                    onPress={() => router.navigate("teacherDashboard/course/CreatePollScreenTwo")}
                >
                    <Text> Continue </Text>
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
    inputFields: {
        flex: 1,
        alignItems: "center",
        paddingTop: 30
    },
    textField: {
        width: "95%",
        height: 60,
        backgroundColor: "rgba(50, 50, 50, 1)",
        justifyContent: "center",
        borderRadius: 16,
        paddingLeft: 20,
        color: "rgba(255, 255, 255, 1)",
    },
    header: {
        gap: 15,
        marginLeft: 15,
    },
    title: {
        color: "rgba(255, 255, 255, 1)",
        fontFamily: "Urbanist",
        fontSize: 34,
        fontWeight: 700
    },
    description: {
        color: "rgba(117, 117, 117, 1)",
        fontFamily: "Urbanist",
        fontSize: 18,
        fontWeight: 500
    },
    disabledButton: {
        opacity: 0.3
    }
})