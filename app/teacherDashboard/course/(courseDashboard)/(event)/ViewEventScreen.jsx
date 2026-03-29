import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from "@react-native-vector-icons/ionicons";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { FlatList, Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import MyButton2 from "../../../../../components/MyButton2";
import ViewEventBase from "../../../../../components/ViewEventBase";
import API_URL from '../../../../../utils/api';

export default function ViewEventScreen() {
    const { eventObj } = useLocalSearchParams();
    const event = JSON.parse(eventObj);
    const [isModalVisible, setModalVisibility] = useState(false);
    const [students, setStudents] = useState([]);
    const insets = useSafeAreaInsets();
    const router = useRouter();

    useFocusEffect(useCallback(() => {
        handleGetStudents();
    }, [])
    );

    const handleDeleteEvent = async () => {
        const token = await AsyncStorage.getItem("token");

        try {
            const response = await fetch(`${API_URL}/api/events/deleteEvent/${event._id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            })

            if (response.ok) {
                console.log("Deleted event");
                router.back();
            }
        } catch (err) {
            console.log(err)
        }
    }

    const handleGetStudents = async () => {
        const token = await AsyncStorage.getItem("token");

        try {
            const response = await fetch(`${API_URL}/api/events/getStudents/${event._id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            });

            if (response.ok) {
                const data = await response.json();
                setStudents(data.students);
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <View style={styles.screenContainer}>
            {!event ? (
                <></>
            ) : (
                <>
                    <ViewEventBase event={event} />

                    <Modal
                        visible={isModalVisible}
                        animationType="slide"
                        transparent
                    >
                        <View style={[
                            {
                                paddingTop: insets.top,
                                paddingBottom: insets.bottom,
                                paddingLeft: insets.left,
                                paddingRight: insets.right,
                            },
                            styles.modalContainer,
                        ]}>
                            <Pressable onPress={() => setModalVisibility(false)} style={styles.closeBtn}>
                                <Text style={styles.white}>
                                    Close
                                </Text>
                            </Pressable>
                            <Text style={[styles.white, styles.modalTitle]}> Attendees </Text>
                            <View style={styles.modalContent}>
                                <FlatList
                                    data={students}
                                    keyExtractor={item => item.email}
                                    renderItem={({ item }) =>
                                        <View style={{ marginBottom: 10 }}>
                                            <View style={{ flexDirection: "row" }}>
                                                <Ionicons size={20} color="white" name="person" />
                                                <Text style={styles.white}> {item.firstName} {item.lastName} </Text>
                                            </View>
                                            <View style={{ flexDirection: "row", paddingLeft: 30 }}>
                                                <Ionicons size={20} color="white" name="mail-outline" />
                                                <Text style={styles.white}> {item.email} </Text>
                                            </View>
                                        </View>
                                    } />
                            </View>
                        </View>
                    </Modal>

                    <MyButton2 onPress={() => setModalVisibility(true)}
                        style={{ backgroundColor: "white", borderRadius: 10 }}>
                        <Text>
                            View all attendees
                        </Text>
                    </MyButton2>
                    <MyButton2 onPress={handleDeleteEvent}
                        style={{ backgroundColor: "rgba(217, 217, 217, 0.49)", borderRadius: 10 }}>
                        <Text style={{ color: "red" }}>
                            Delete Event
                        </Text>
                    </MyButton2>
                </>
            )}

        </View>
    )
}

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: "rgb(17, 21, 28)",
    },
    titleContainer: {
        alignItems: "center",
        marginTop: 20
    },
    title: {
        color: "rgba(255, 255, 255, 1)",
        fontFamily: "Urbanist",
        fontSize: 34,
        fontWeight: 700,
        paddingLeft: 15,
        paddingBottom: 15
    },
    detailsContainer: {
        flex: 1,
        paddingLeft: 20,
        rowGap: 12,
    },
    courseText: {
        color: "white",
        fontSize: 20
    },
    detailsText: {
        color: "white",
        fontSize: 15
    },
    sectionHeader: {
        color: "white",
        fontWeight: "bold",
        fontSize: 15,
    },
    descriptionContainer: {
        marginTop: 20,
        gap: 10
    },
    descriptionBox: {
        paddingHorizontal: 25,
        width: "60%",
        justifyContent: "center",
    },
    horizontalContainer: {
        flexDirection: "row",
        gap: 10,
        paddingLeft: 20,
        alignItems: "center"
    },
    modalContainer: {
        flex: 1,
        backgroundColor: "rgb(17, 21, 28)",
    },
    modalContent: {
        paddingLeft: 20,
        flex: 1
    },
    closeBtn: {
        marginTop: 10,
        marginLeft: 15
    },
    modalTitle: {
        fontSize: 25,
        textAlign: "center",
        marginVertical: 20,
        fontWeight: "bold"
    },
    white: {
        color: "white"
    },
    attendeesBtn: {
        width: "90%",
        height: "10%",
        borderRadius: 10,
        backgroundColor: "white"
    }
})