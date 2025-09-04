import { View } from 'react-native';
import { Calendar } from "react-native-calendars";

export default function MyCalendar() {
    //const todayDate = 
    return (
        <View>
            <Calendar
                markedDates={{

                }}
                theme={{
                    backgroundColor: "rgba(33, 33, 33, 1)",
                    calendarBackground: "rgba(33, 33, 33, 1)",
                    textSectionTitleColor: "rgba(173, 170, 170, 1)",
                    selectedDayBackgroundColor: "white",
                    selectedDayTextColor: "black",
                    todayTextColor: "rgba(222, 117, 82, 1)",
                    dayTextColor: "white",
                    textDisabledColor: "rgba(173, 170, 170, 1)",
                    dotColor: "rgba(222, 117, 82, 1)",
                    arrowColor: "white",
                    monthTextColor: "white",

                }}
            />
        </View>
    );
}