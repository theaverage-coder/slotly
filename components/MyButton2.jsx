import { Pressable, StyleSheet, View } from 'react-native'

export default function MyButton2({ style, ...props }) {
    return (
        <View style={styles.buttonContainer}>
            <Pressable
                style={({ pressed }) => [styles.btn, pressed && styles.pressed,
                    style
                ]}
                {...props}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        alignItems: "center",
        justifyContent: "center",
        height: "10%",
        justifyContent: "flex-end"
    },
    btn: {
        alignItems: "center",
        justifyContent: "center",
        width: "95%",
        paddingHorizontal: 10,
        paddingVertical: 16,
        borderRadius: 32,

    },
    pressed: {
        opacity: 0.5
    }
})