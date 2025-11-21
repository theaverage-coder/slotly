import { useRouter } from "expo-router";
import { StyleSheet, Text, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MyButton2 from "../../../../../../components/MyButton2";
import { useEventContext } from "../../../../../../contexts/EventContext";

export default function CreateEventScreenOne() {
    const { event, setEvent } = useEventContext();
    const router = useRouter();

    return (
        <SafeAreaView style={styles.screenContainer}>
            <TextInput
                placeholder="Event Title"
                value={event.title}
                onChangeText={(text) => setEvent(prev => ({ ...prev, title: text }))}
            />
            <MyButton2
                disabled={event.title === ""}
                onPress={() => router.navigate("teacherDashboard/course/CreateEventScreenTwo")}
            >
                <Text> Continue </Text>
            </MyButton2>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: "rgba(33, 33, 33, 1)"
    }
})