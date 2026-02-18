import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from '@react-native-vector-icons/ionicons';
import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useMemo, useState } from 'react';
import { FlatList, Modal, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useUser } from '../contexts/UserContext';
import AppointmentCard from './AppointmentCard';
import BackgroundSlotlyLogo from './BackgroundSlotlyLogo';
import DashboardHeader from './DashboardHeader';
import EventCard from './EventCard';

export default function HomeBase() {
    const { user } = useUser();
    const router = useRouter();
    const [events, setEvents] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [modalIsVisible, setModalVisibility] = useState(false);
    const [selectedAppt, setSelectedAppt] = useState(null);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [modalType, setModalType] = useState(null);

    // Variables for filter
    const [typeFilter, setTypeFilter] = useState("all"); // "all" | "appointment" | "event"
    const [completedFilter, setCompletedFilter] = useState("incomplete"); // "all" | "completed" | "incomplete"
    const insets = useSafeAreaInsets();

    const API_URL =
        Platform.OS === 'web'
            ? process.env.EXPO_PUBLIC_API_URL_WEB
            : process.env.EXPO_PUBLIC_API_URL_MOBILE;

    // Fetch all appointments and events when the screen is focused
    useFocusEffect(useCallback(() => {
        const fetchAppointments = async () => {
            const token = await AsyncStorage.getItem("token");
            const isStudent = user.role === "s" ? true : false;

            try {
                const response = await fetch(`${API_URL}/api/appointments/getAppointments`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        isStudent: isStudent,
                    }),
                });
                if (response.ok) {
                    const data = await response.json();
                    setAppointments(data);
                }
            } catch (err) {
                console.log("Failed to retrieve appointments: ", err);
            }
        }

        const fetchEvents = async () => {
            const token = await AsyncStorage.getItem("token");

            try {
                let response;

                if (user.role === "s") {
                    response = await fetch(`${API_URL}/api/events/getAllJoinedEvents`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`
                        },
                    });
                } else if (user.role === "t") {
                    response = await fetch(`${API_URL}/api/events/getCreatedEvents`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`
                        },
                    });
                }

                if (response.ok) {
                    const data = await response.json();
                    setEvents(data);
                }
            } catch (err) {
                console.log("Failed to retrieve events: ", err);
            }
        }

        fetchAppointments();
        fetchEvents();
    }, [])
    );

    // Return data according to filters when they're changed
    const filteredData = useMemo(() => {
        let data = [];
        if (typeFilter === "appointment") {
            data = appointments;
        } else if (typeFilter === "event") {
            data = events;
        } else if (typeFilter === "all") {
            // Merge appointments and events sorted by date
            let apptPtr = 0;
            let eventPtr = 0;

            while (apptPtr < appointments.length && eventPtr < events.length) {
                if (new Date(appointments[apptPtr].startTime) <= new Date(events[eventPtr].startTime)) {
                    data.push(appointments[apptPtr]);
                    apptPtr++;
                } else {
                    data.push(events[eventPtr]);
                    eventPtr++;
                }
            }
            if (apptPtr < appointments.length) {
                let slice = appointments.slice(apptPtr);
                data.push(...slice);
            } else if (eventPtr < events.length) {
                let slice = events.slice(eventPtr);
                data.push(...slice);
            }
        }

        if (completedFilter !== "all") {
            data = data.filter((x) =>
                completedFilter === "completed" ? x.completed : !x.completed);
        }
        return data;
    }, [completedFilter, typeFilter, events, appointments]);

    const handlePressDetails = (appt) => {
        setModalVisibility(true);
        setSelectedAppt(appt);
        console.log(appt)
        setModalType("details");
    }

    const handlePressCancel = (appt) => {
        setModalVisibility(true);
        setSelectedAppt(appt);
        setModalType("cancel");
    }

    const handlePressFilters = () => {
        setModalVisibility(true);
        setModalType("filter");
    }

    const handleEventDetails = (event) => {
        setModalVisibility(true);
        setSelectedEvent(event);
        setModalType("event");
    }

    const getDateString = (appt) => {
        return new Date(appt.startTime).toLocaleDateString();
    }

    const getTimeString = (appt) => {
        return new Date(appt.startTime).toLocaleTimeString();
    }

    const getName = () => {
        if (user.role === "s") {
            return `${selectedAppt.prof.firstName} ${selectedAppt.prof.lastName}`;
        } else if (user.role === "t") {
            return `${selectedAppt.student.firstName} ${selectedAppt.student.lastName}`
        }
    }

    const handleCancelAppointment = async () => {
        const token = await AsyncStorage.getItem("token");
        try {
            const response = await fetch(`${API_URL}/api/appointments/cancelAppointment/${selectedAppt._id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
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
        <View style={{ flex: 1 }}>
            <DashboardHeader page={0} />
            {appointments.length === 0 && events.length === 0 ? (
                <View style={styles.emptyScreen}>
                    <BackgroundSlotlyLogo />
                    <Text style={styles.text1}>You don't have any meetings yet</Text>
                    <Text style={styles.text2}>Add your courses to find professors and book your first meeting</Text>
                </View>
            ) : (
                <View style={{ flex: 1, }}>
                    <View style={styles.filterContainer}>
                        <Pressable onPress={handlePressFilters}>
                            <Ionicons size={30} color="white" name="options" />
                        </Pressable>
                    </View>
                    <FlatList
                        contentContainerStyle={{ gap: 20, alignItems: "center" }}
                        data={filteredData}
                        keyExtractor={item => item._id}
                        renderItem={({ item }) => {
                            if (item.booking) {
                                return <AppointmentCard appointment={item} onDetailPress={handlePressDetails} onCancelPress={handlePressCancel} />
                            } else {
                                return <EventCard event={item} homeScreen={true} onDetailsPress={handleEventDetails} />

                            }
                        }}
                    />
                </View>
            )}
            <Modal
                visible={modalIsVisible}
                animationType='slide'
                transparent
            >
                <View style={[styles.modal,
                {
                    paddingTop: insets.top,
                    paddingLeft: insets.left,
                    paddingRight: insets.right,
                },
                ]}>
                    <View style={styles.modalContent}>
                        <View style={styles.closeButtonContainer}>
                            <Pressable onPress={() => setModalVisibility(false)}>
                                <Ionicons size={30} color="white" name="close-circle" />
                            </Pressable>
                        </View>
                        {modalType === "details" && (
                            <>
                                <Text style={styles.modalTitle}> Appointment Details</Text>
                                <View style={{ flex: 1, width: '100%', paddingLeft: 15 }}>
                                    <Text style={styles.filterTitle}> {selectedAppt.booking.course.courseCode} : {selectedAppt.booking.course.courseName} </Text>
                                    <View style={{ flex: 1, paddingLeft: 10, gap: 15, marginVertical: 5 }}>
                                        <View style={styles.horizontalContainer}>
                                            <Ionicons size={15} color="white" name="person" />
                                            <Text style={styles.detailsText}> {getName()} </Text>
                                        </View>
                                        <View style={styles.horizontalContainer}>
                                            <Ionicons size={15} color="white" name="calendar" />
                                            <Text style={styles.detailsText}> {new Date(selectedAppt.startTime).toDateString()} </Text>
                                        </View>
                                        <View style={styles.horizontalContainer}>
                                            <Ionicons size={15} color="white" name="time" />
                                            <Text style={styles.detailsText}>
                                                {new Date(selectedAppt.startTime).toLocaleTimeString([], {
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })} -
                                                {new Date(selectedAppt.endTime).toLocaleTimeString([], {
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}
                                            </Text>
                                        </View>
                                        {selectedAppt.location &&
                                            <View style={styles.horizontalContainer}>
                                                <Ionicons size={15} color="white" name="location" />
                                                <Text style={styles.detailsText}> {selectedAppt.location} </Text>
                                            </View>
                                        }
                                        {selectedAppt.message && (
                                            <>
                                                <Text style={{ color: "grey" }}> Additional details:</Text>
                                                <Text style={styles.white}> {selectedAppt.message}</Text>
                                            </>
                                        )}
                                    </View>
                                </View>
                            </>
                        )}
                        {modalType === "event" && (
                            <>
                                <Text style={styles.modalTitle}> {selectedEvent.title}</Text>
                                <View style={{ flex: 1, width: '100%', paddingLeft: 15 }}>
                                    <View style={{ flex: 1, paddingLeft: 10, gap: 15, marginVertical: 5 }}>
                                        <View style={styles.horizontalContainer}>
                                            <Ionicons size={15} color="white" name="calendar" />
                                            <Text style={styles.detailsText}> {new Date(selectedEvent.startTime).toDateString()} </Text>
                                        </View>
                                        <View style={styles.horizontalContainer}>
                                            <Ionicons size={15} color="white" name="time" />
                                            <Text style={styles.detailsText}>
                                                {new Date(selectedEvent.startTime).toLocaleTimeString([], {
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })} -
                                                {new Date(selectedEvent.endTime).toLocaleTimeString([], {
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}
                                            </Text>
                                        </View>
                                        {selectedEvent.location &&
                                            <View style={styles.horizontalContainer}>
                                                <Ionicons size={15} color="white" name="location" />
                                                <Text style={styles.detailsText}> {selectedEvent.location} </Text>
                                            </View>
                                        }
                                        {selectedEvent.description && (
                                            <>
                                                <Text style={{ color: "grey" }}> Additional details:</Text>
                                                <Text style={styles.white}> {selectedEvent.description}</Text>
                                            </>
                                        )}
                                    </View>
                                </View>
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
                        {modalType === "filter" && (
                            <>
                                <Text style={styles.modalTitle}> Filters </Text>
                                <View style={styles.modalFilterBox}>
                                    <Text style={styles.filterTitle}> Type of Meeting </Text>
                                    <Pressable style={styles.modalFilter} onPress={() => setTypeFilter("all")}>
                                        <Ionicons size={20} color="rgb(125, 78, 87)" name={typeFilter === "all" ? "checkbox" : "square-outline"} />
                                        <Text style={styles.white}> All </Text>
                                    </Pressable>
                                    <Pressable style={styles.modalFilter} onPress={() => setTypeFilter("appointment")}>
                                        <Ionicons size={20} color="rgb(125, 78, 87)" name={typeFilter === "appointment" ? "checkbox" : "square-outline"} />
                                        <Text style={styles.white}> Appointment </Text>
                                    </Pressable>
                                    <Pressable style={styles.modalFilter} onPress={() => setTypeFilter("event")}>
                                        <Ionicons size={20} color="rgb(125, 78, 87)" name={typeFilter === "event" ? "checkbox" : "square-outline"} />
                                        <Text style={styles.white}> Event </Text>
                                    </Pressable>
                                    <Text style={styles.filterTitle}> State of Meeting </Text>
                                    <Pressable style={styles.modalFilter} onPress={() => setCompletedFilter("all")}>
                                        <Ionicons size={20} color="rgb(125, 78, 87)" name={completedFilter === "all" ? "checkbox" : "square-outline"} />
                                        <Text style={styles.white}> All </Text>
                                    </Pressable>
                                    <Pressable style={styles.modalFilter} onPress={() => setCompletedFilter("completed")}>
                                        <Ionicons size={20} color="rgb(125, 78, 87)" name={completedFilter === "completed" ? "checkbox" : "square-outline"} />
                                        <Text style={styles.white}> Completed </Text>
                                    </Pressable>
                                    <Pressable style={styles.modalFilter} onPress={() => setCompletedFilter("incomplete")}>
                                        <Ionicons size={20} color="rgb(125, 78, 87)" name={completedFilter === "incomplete" ? "checkbox" : "square-outline"} />
                                        <Text style={styles.white}> Incomplete</Text>
                                    </Pressable>
                                </View>
                            </>
                        )}
                    </View>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    screenContainer: {
        backgroundColor: "rgb(17, 21, 28)",
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
        backgroundColor: "rgb(17, 21, 28)",
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        padding: 15,
        paddingBottom: 30,
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
        marginVertical: 10
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
    },
    filterContainer: {
        marginBottom: 5,
        marginRight: 20,
        alignItems: "flex-end",
        justifyContent: "center"
    },
    filterTitle: {
        color: "white",
        fontWeight: "bold",
        fontSize: 18,
        marginVertical: 5,
        color: "rgb(125, 78, 87)"
    },
    modalFilterBox: {
        width: "100%"
    },
    modalFilter: {
        marginVertical: 5,
        marginLeft: 35,
        flexDirection: "row",
        gap: 5,
        alignItems: "center"
    },
    horizontalContainer: {
        flexDirection: "row",
        gap: 10,
        paddingLeft: 20,
        alignItems: "center"
    },
    detailsText: {
        color: "white",
        fontSize: 15
    },
    white: {
        color: "white"
    }
})