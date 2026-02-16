import { Text, View } from "react-native";

export default function StartEndTimesHeader() {
    return (
        <View style={{ flexDirection: "row" }}>
            <Text
                style={{ width: "50%", color: "white", textAlign: "center", borderRightWidth: 1, borderRightColor: "white" }}
            >
                Start Times
            </Text>
            <Text
                style={{ width: "50%", color: "white", textAlign: "center" }}
            >
                End Times
            </Text>
        </View>
    );
}