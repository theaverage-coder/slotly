import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Platform, Pressable, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function BookAppointmentScreen() {
    const { courseId } = useLocalSearchParams();
    const [availableSlots, setAvailableSlots] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
    const [startDate, setStartDate] = useState(new Date());
    const API_URL =
        Platform.OS === 'web'
            ? process.env.EXPO_PUBLIC_API_URL_WEB
            : process.env.EXPO_PUBLIC_API_URL_MOBILE;


    const fetchAvailableTimeslots = async () => {
        try {
            const response = await fetch(`${API_URL}/api/bookings/getAvailableTimeSlots/${courseId}/${startDate}`)
            const data = await response.json();
            setAvailableSlots(data);
            setStartDate(startDate.setDate(startDate.getDate() + 14));
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchAvailableTimeslots();
    }, []);

    return (
        <SafeAreaView>
            {(!availableSlots) ? (
                <></>
            ) : (
                <View>
                    <FlatList
                        data={Object.keys(availableSlots)}
                        horizontal={true}
                        keyExtractor={item => item}
                        onEndReachedThreshold={0.7}
                        onEndReached={fetchAvailableTimeslots()}
                        renderItem={({ item }) =>
                            <Pressable onPress={() => setSelectedDate(item)}>
                                <Text>
                                    {item.getMonth()}
                                    {item.getDate()}
                                </Text>
                            </Pressable>
                        }
                    >
                    </FlatList>
                </View>
            )}
            {(!selectedDate) ? (
                <Text> Select a date to view available times </Text>
            ) : (
                <View>
                    <FlatList
                        data={availableSlots[selectedDate]}
                        keyExtractor={item => item}
                        renderItem={({ item }) =>
                            <Pressable onPress={() => setSelectedTimeSlot}>
                                <Text> {item} </Text>
                            </Pressable>
                        }
                    >
                    </FlatList>
                </View>
            )}
            {(!selectedTimeSlot) ? (
                <></>
            ) : (
                <Pressable>
                    <Text> Make an appointment</Text>
                </Pressable>
            )}
        </SafeAreaView>
    );
}