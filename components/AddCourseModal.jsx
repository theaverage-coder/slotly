import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from '@react-native-vector-icons/ionicons';
import { useEffect, useState } from 'react';
import { Alert, KeyboardAvoidingView, Modal, Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useUser } from '../contexts/UserContext';
import API_URL from '../utils/api';
import MyButton2 from './MyButton2';

export default function AddCourseModal({ visible, onClose }) {
    const [signUpLink, setSignUpLink] = useState('');
    const { user } = useUser();
    const insets = useSafeAreaInsets();

    useEffect(() => {
        if (visible) {
            setSignUpLink('');
        }
    }, [visible]);

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
                const data = await response.json();
                if (data.success) {
                    if (data.added) {
                        Alert.alert("Course Joined!")
                        setSignUpLink("");
                    } else {
                        Alert.alert("Already enrolled in the course.")
                    }
                }
            } else {
                Alert.alert("Failed to join course.")
            }
        } catch (err) {
            console.log(err)
            console.log("Unsuccessful");
        }
    };

    return (
        <Modal visible={visible}
            animationType='slide'
            onRequestClose={onClose}
            transparent>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={[
                    {
                        paddingTop: insets.top,
                        paddingBottom: insets.bottom,
                        paddingLeft: insets.left,
                        paddingRight: insets.right,
                    },
                    styles.modal
                ]}>
                <View style={{ marginHorizontal: 10, flex: 1 }}>
                    <View style={styles.closeButtonContainer}>

                        <Pressable style={styles.closeButton} onPress={onClose}>
                            <Ionicons size={30} color="white" name="close-circle" />
                        </Pressable>
                    </View>
                    <View style={{ flex: 1, justifyContent: "center" }}>
                        <View style={styles.header}>
                            <Text style={styles.headerText}>
                                Add a New Course
                            </Text>
                        </View>
                        <View style={styles.courseInputContainer}>
                            <Text style={{ color: "white" }}> To join a course, ask your teacher for the
                                <Text style={{ color: "rgb(125, 78, 87)", fontWeight: "bold" }}> sign up link. </Text>
                            </Text>
                            <TextInput
                                style={styles.inputText}
                                placeholder="Enter Code"
                                value={signUpLink}
                                autoFocus
                                onChangeText={(text) => setSignUpLink(text)}
                            />
                        </View>
                    </View>
                    <MyButton2
                        onPress={handleJoinCourse}
                        style={{
                            backgroundColor: "rgb(125, 78, 87)",
                            borderRadius: 10,
                        }}
                    >
                        <Text > Join Course </Text>
                    </MyButton2>
                    <View style={{ height: 20 }} />
                </View>
            </KeyboardAvoidingView>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modal: {
        flex: 1,
        backgroundColor: "rgb(17, 21, 28)",
    },
    header: {
        flexDirection: "row",
        height: "10%",
        alignItems: "center",
        justifyContent: "center",
    },
    headerText: {
        color: "rgba(255, 255, 255, 1)",
        fontSize: 24,
        fontWeight: "bold"
    },
    closeButton: {
        width: "10%"
    },
    courseInputContainer: {
        alignItems: "center",
        gap: 20,
        marginVertical: 30
    },
    inputText: {
        color: "white",
        fontSize: 16,
        fontWeight: 500,
        borderWidth: 1,
        borderColor: "rgb(125, 78, 87)",
        height: 70,
        borderRadius: 10,
        paddingHorizontal: 20,
        backgroundColor: "rgb(33, 45, 64)",
        width: "70%",
        textAlign: "center"
    },
    closeButtonContainer: {
        width: "100%"
    },
})