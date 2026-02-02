import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { FlatList, Modal, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppointmentCard from '../../../components/AppointmentCard';
import BackgroundSlotlyLogo from '../../../components/BackgroundSlotlyLogo';
import DashboardHeader from '../../../components/DashboardHeader';
import { useUser } from '../../../contexts/UserContext';

export default function HomeScreen() {
    const { user } = useUser();
    const router = useRouter();

    const [appointments, setAppointments] = useState([]);
    const [modalIsVisible, setModalVisibility] = useState(false);
    const [selectedAppt, setSelectedAppt] = useState(null);
    const [modalType, setModalType] = useState(null);

    const API_URL =
        Platform.OS === 'web'
            ? process.env.EXPO_PUBLIC_API_URL_WEB
            : process.env.EXPO_PUBLIC_API_URL_MOBILE;

    useFocusEffect(useCallback(() => {
        const fetchAppointments = async () => {
            try {
                const response = await fetch(`${API_URL}/api/appointments/getAppointments`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        userId: user._id,
                        isStudent: true,
                    }),
                });
                if (response.ok) {
                    const data = await response.json();
                    setAppointments(data);
                    console.log(data);
                }
            } catch (err) {
                console.log("Failed to retrieve appointments: ", err);
            }
        }

        fetchAppointments();
    }, [])
    );

    const handlePressDetails = (appt) => {
        setModalVisibility(true);
        setSelectedAppt(appt);
        setModalType("details");
    }

    const handlePressCancel = (appt) => {
        setModalVisibility(true);
        setSelectedAppt(appt);
        setModalType("cancel");
    }

    const getDateString = (appt) => {
        return new Date(appt.startTime).toLocaleDateString();
    }

    const getTimeString = (appt) => {
        return new Date(appt.startTime).toLocaleTimeString();
    }

    const handleCancelAppointment = async () => {
        try {
            const response = await fetch(`${API_URL}/api/appointments/cancelAppointment/${selectedAppt._id}`, {
                method: "DELETE"
            })
            if (response.ok) {
                router.push("/studentDashboard/HomeScreen")
                setModalVisibility(false);
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <SafeAreaView style={styles.screenContainer}>
            <DashboardHeader page={0} />
            {appointments.length === 0 ? (
                <View style={styles.emptyScreen}>
                    <BackgroundSlotlyLogo />
                    <Text style={styles.text1}>You don't have any meetings yet</Text>
                    <Text style={styles.text2}>Add your courses to find professors and book your first meeting</Text>
                </View>
            ) : (
                <View style={{ flex: 1, }}>
                    <FlatList
                        contentContainerStyle={{ gap: 20, alignItems: "center" }}
                        data={appointments}
                        keyExtractor={item => item._id}
                        renderItem={({ item }) => <AppointmentCard appointment={item} onDetailPress={handlePressDetails} onCancelPress={handlePressCancel} />}
                    />
                </View>
            )}
            <Modal
                visible={modalIsVisible}
                animationType='slide'
                transparent
            >
                <View style={styles.modal}>
                    <View style={styles.modalContent}>
                        <View style={styles.closeButtonContainer}>
                            <Pressable onPress={() => setModalVisibility(false)}>
                                <Text> Close </Text>
                            </Pressable>
                        </View>
                        {modalType === "details" && (
                            <>
                                <Text style={styles.modalTitle}> Machine Learning {selectedAppt.booking.course.courseName} </Text>
                                <Text> {selectedAppt.prof.firstName} {selectedAppt.prof.lastName}</Text>
                                <Text> Date and Time: </Text>
                                <Text> Location: {selectedAppt.location} </Text>
                                <Text> Additional details:</Text>
                                <Text> {selectedAppt.message}</Text>
                            </>
                        )}
                        {modalType === "cancel" && (
                            <>
                                <Text style={styles.modalTitle}> Appointment Cancellation </Text>
                                <Text style={styles.cancelText}> Are you sure you want to cancel this appointment? </Text>
                                <View style={styles.modalApptBox}>
                                    <View style={styles.modalApptText}>
                                        <Text style={styles.profName}> {selectedAppt.prof.firstName} {selectedAppt.prof.lastName} </Text>
                                        <Text style={styles.time}> {getDateString(selectedAppt)} | {getTimeString(selectedAppt)}</Text>
                                    </View>
                                </View>
                                <View style={styles.cancelButtonContainer}>
                                    <Pressable style={styles.cancelButton} onPress={handleCancelAppointment}>
                                        <Text style={{ color: "red" }}> Cancel Appointment</Text>
                                    </Pressable>
                                </View>
                            </>
                        )}
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screenContainer: {
        backgroundColor: "rgba(33, 33, 33, 1)",
        flex: 1
    },
    emptyScreen: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        rowGap: 15,
        paddingHorizontal: 15
    },
    text1: {
        color: "rgba(255, 255, 255, 1)",
        fontFamily: "Urbanist",
        fontSize: 24,
        fontWeight: 700,
        textAlign: "center"
    },
    text2: {
        color: "rgba(173, 170, 170, 1)",
        fontFamily: "Urbanist",
        fontSize: 16,
        fontWeight: 600,
        textAlign: "center",
        width: "80%"
    },
    modal: {
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    modalContent: {
        height: "50%",
        backgroundColor: "rgba(33, 33, 33, 1)",
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        padding: 15,
        alignItems: "center"
    },
    closeButtonContainer: {
        width: "100%"
    },
    modalTitle: {
        color: "white",
        fontWeight: "bold",
        fontSize: 27,
        textAlign: "center",
        marginVertical: 20
    },
    cancelText: {
        textAlign: "center",
        fontSize: 18,
        color: "white",
    },
    modalApptBox: {
        flex: 1,
        justifyContent: "center",
    },
    modalApptText: {
        width: "60%",
        height: "35%",
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderRadius: 16,
        //backgroundColor: "grey",
        justifyContent: "center",
        alignItems: "center"
    },
    cancelButtonContainer: {
        height: 80,
        justifyContent: "center",
        width: "100%",
        alignItems: "center"
    },
    cancelButton: {
        borderRadius: 16,
        backgroundColor: "grey",
        height: 50,
        width: "80%",
        justifyContent: "center",
        alignItems: "center"
    },
    profName: {
        color: "white",
        fontWeight: "bold",
        fontSize: 22,
    },
    time: {
        marginTop: 8,
        color: "rgba(217, 217, 217, 0.5)"
    }


})