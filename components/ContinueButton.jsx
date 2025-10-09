import { useRouter } from 'expo-router';
import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function ContinueButton({ nextScreen, text, oppositeColours }) {
    const router = useRouter();

    return (
        <View style={styles.buttonContainer}>
            <Pressable onPress={() => router.navigate((nextScreen))} style={[styles.continueButton, oppositeColours && styles.oppositeButton]}>
                <Text style={[styles.continueText, oppositeColours && styles.oppositeText]}>
                    {text}
                </Text>
            </Pressable>
        </View>
    );
}


const styles = StyleSheet.create({
    buttonContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: height * 0.1,
        width: "100%"

    },
    continueButton: {
        flexShrink: 0,
        backgroundColor: "rgba(255, 255, 255, 1)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "95%",
        paddingHorizontal: 10,
        paddingVertical: 16,
        borderRadius: 32,
    },
    oppositeButton: {
        backgroundColor: "rgba(28, 28, 28, 1)",
        borderWidth: 1,
        borderColor: "white"
    },
    continueText: {
        textAlign: "left",
        color: "rgba(28, 28, 28, 1)",
        fontFamily: "Urbanist",
        fontSize: 18,
        fontWeight: 500
    },
    oppositeText: {
        color: "rgba(255, 255, 255, 1)",
    }
})