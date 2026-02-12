import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import { Modal, Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Path, Svg } from 'react-native-svg';
import { useUser } from '../../../contexts/UserContext';

export default function AddCourseModal({ visible, onClose }) {
    const [signUpLink, setSignUpLink] = useState('');
    const { user } = useUser();
    const API_URL =
        Platform.OS === 'web'
            ? process.env.EXPO_PUBLIC_API_URL_WEB
            : process.env.EXPO_PUBLIC_API_URL_MOBILE;

    const handleJoinCourse = async () => {
        const token = await AsyncStorage.getItem("token");

        try {
            const response = await fetch(`${API_URL}/api/courses/joinCourse`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    signUpLink: signUpLink,
                }),
            });

            if (response.ok) {
                console.log("Course joined")
            }
        } catch (err) {
            console.log(err)
            console.log("Unsuccessful");
        }
    };

    return (
        <Modal visible={visible}
            animationType='slide'
            onRequestClose={onClose}>
            <SafeAreaView style={styles.modalContainer}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>
                        Add a new course
                    </Text>
                    <Pressable style={styles.closeButton} onPress={onClose}>
                        <Svg width="30" height="30" viewBox="0 0 30 30" fill="none" >
                            <Path d="M15 0.375C12.1075 0.375 9.27986 1.23274 6.87479 2.83976C4.46972 4.44677 2.5952 6.73089 1.48827 9.40325C0.381337 12.0756 0.091713 15.0162 0.656022 17.8532C1.22033 20.6902 2.61323 23.2961 4.65857 25.3414C6.70391 27.3868 9.30984 28.7797 12.1468 29.344C14.9838 29.9083 17.9244 29.6187 20.5968 28.5117C23.2691 27.4048 25.5532 25.5303 27.1602 23.1252C28.7673 20.7201 29.625 17.8926 29.625 15C29.6209 11.1225 28.0788 7.40492 25.3369 4.66309C22.5951 1.92125 18.8775 0.379095 15 0.375ZM20.2959 18.7041C20.4005 18.8086 20.4834 18.9327 20.5399 19.0692C20.5965 19.2058 20.6256 19.3522 20.6256 19.5C20.6256 19.6478 20.5965 19.7942 20.5399 19.9308C20.4834 20.0673 20.4005 20.1914 20.2959 20.2959C20.1914 20.4005 20.0673 20.4834 19.9308 20.5399C19.7942 20.5965 19.6478 20.6256 19.5 20.6256C19.3522 20.6256 19.2058 20.5965 19.0692 20.5399C18.9327 20.4834 18.8086 20.4005 18.7041 20.2959L15 16.5905L11.2959 20.2959C11.1914 20.4005 11.0673 20.4834 10.9308 20.5399C10.7942 20.5965 10.6478 20.6256 10.5 20.6256C10.3522 20.6256 10.2058 20.5965 10.0692 20.5399C9.93268 20.4834 9.80859 20.4005 9.70407 20.2959C9.59954 20.1914 9.51663 20.0673 9.46006 19.9308C9.4035 19.7942 9.37438 19.6478 9.37438 19.5C9.37438 19.3522 9.4035 19.2058 9.46006 19.0692C9.51663 18.9327 9.59954 18.8086 9.70407 18.7041L13.4095 15L9.70407 11.2959C9.49297 11.0848 9.37438 10.7985 9.37438 10.5C9.37438 10.2015 9.49297 9.91516 9.70407 9.70406C9.91516 9.49297 10.2015 9.37437 10.5 9.37437C10.7985 9.37437 11.0848 9.49297 11.2959 9.70406L15 13.4095L18.7041 9.70406C18.8086 9.59954 18.9327 9.51663 19.0692 9.46006C19.2058 9.40349 19.3522 9.37437 19.5 9.37437C19.6478 9.37437 19.7942 9.40349 19.9308 9.46006C20.0673 9.51663 20.1914 9.59954 20.2959 9.70406C20.4005 9.80859 20.4834 9.93267 20.5399 10.0692C20.5965 10.2058 20.6256 10.3522 20.6256 10.5C20.6256 10.6478 20.5965 10.7942 20.5399 10.9308C20.4834 11.0673 20.4005 11.1914 20.2959 11.2959L16.5905 15L20.2959 18.7041Z" fill="#827D7D" />
                        </Svg>
                    </Pressable>
                </View>
                <View style={styles.courseInputContainer}>
                    <Text style={{ color: "white" }}>
                        Course code
                    </Text>
                    <TextInput style={styles.inputText}
                        placeholder="Course Code"
                        value={signUpLink}
                        onChangeText={(text) => setSignUpLink(text)}
                    />
                </View>
                <Pressable onPress={handleJoinCourse}>
                    <Text> Join Course </Text>
                </Pressable>
            </SafeAreaView>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        backgroundColor: "rgba(41, 41, 41, 1)",
        flexDirection: "column",
        flex: 1
    },
    header: {
        flexDirection: "row",
        height: "10%",
        alignItems: "center",
        justifyContent: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#827D7D"
    },
    headerText: {
        color: "rgba(255, 255, 255, 1)",
        fontFamily: "Urbanist",
        fontSize: 20,
        fontWeight: 400
    },
    closeButton: {
        width: "10%"
    },
    inputText: {
        color: "rgba(117, 117, 117, 1)",
        fontFamily: "Urbanist",
        fontSize: 16,
        fontWeight: 500,
        borderWidth: 1,
        borderColor: "white",
        height: 50,
        borderRadius: 16
    },
})