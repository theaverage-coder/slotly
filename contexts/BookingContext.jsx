import { createContext, useContext, useState } from "react";

const BookingContext = createContext();

export const BookingProvider = ({ children }) => {

    const [timeSlotDuration, setTimeSlotDuration] = useState(10);
    const [isSameHours, setIsSameHours] = useState(false);
    const [sameHours, setSameHours] = useState([{ start: new Date(), end: new Date(), location: "" }]);
    const [daysAvailable, setDaysAvailable] = useState({
        Sunday: { isAvailable: false, timeIntervals: [] },
        Monday: { isAvailable: false, timeIntervals: [] },
        Tuesday: { isAvailable: false, timeIntervals: [] },
        Wednesday: { isAvailable: false, timeIntervals: [] },
        Thursday: { isAvailable: false, timeIntervals: [] },
        Friday: { isAvailable: false, timeIntervals: [] },
        Saturday: { isAvailable: false, timeIntervals: [] },

    });
    return (
        <BookingContext.Provider value={{ daysAvailable, setDaysAvailable, timeSlotDuration, setTimeSlotDuration, isSameHours, setIsSameHours, sameHours, setSameHours }}>
            {children}
        </BookingContext.Provider>
    )
}

export const useBookingContext = () => useContext(BookingContext);