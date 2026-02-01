import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { FlatList, Platform, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppointmentCard from '../../../components/AppointmentCard';
import BackgroundSlotlyLogo from '../../../components/BackgroundSlotlyLogo';
import DashboardHeader from '../../../components/DashboardHeader';
import { useUser } from '../../../contexts/UserContext';

export default function HomeScreen() {
    const { user } = useUser();
    const [appointments, setAppointments] = useState([]);

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
                <FlatList
                    contentContainerStyle={{ gap: 20, alignItems: "center" }}
                    data={appointments}
                    keyExtractor={item => item._id}
                    renderItem={({ item }) => <AppointmentCard appointment={item} />}
                />
            )}
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

})