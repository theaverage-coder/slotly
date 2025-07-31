import { StyleSheet, Text, View } from 'react-native';

export default function ScheduleScreen() {
    return (
        <View style={styles.screenContainer}>
            <Text style={{ color: "white" }}> Schedule Screen </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    screenContainer: {
        backgroundColor: "rgba(33, 33, 33, 1)",
        height: "70vh"
    }
})