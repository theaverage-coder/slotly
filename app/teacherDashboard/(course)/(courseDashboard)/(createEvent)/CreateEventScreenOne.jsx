import { StyleSheet, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEventContext } from "../../../../../contexts/EventContext";

export default function CreateEventScreenOne() {
    const { event, setEvent } = useEventContext();

    return (
        <SafeAreaView style={styles.screenContainer}>
            <TextInput
                placeholder="Title"
                value={event.title}
                onChangeText={(text) => setEvent(prev => ({ ...prev, title: text }))}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

})