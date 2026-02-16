import { createContext, useContext, useState } from "react";

const BookingContext = createContext();

export const BookingProvider = ({ children }) => {

    const [timeSlotDuration, setTimeSlotDuration] = useState(10);
    const [isSameHours, setIsSameHours] = useState(false);
    const [sameHours, setSameHours] = useState([{ start: new Date(), end: new Date() }]);
    const [daysAvailable, setDaysAvailable] = useState({
        Sunday: { isAvailable: false, timeIntervals: [], location: "" },
        Monday: { isAvailable: false, timeIntervals: [], location: "" },
        Tuesday: { isAvailable: false, timeIntervals: [], location: "" },
        Wednesday: { isAvailable: false, timeIntervals: [], location: "" },
        Thursday: { isAvailable: false, timeIntervals: [], location: "" },
        Friday: { isAvailable: false, timeIntervals: [], location: "" },
        Saturday: { isAvailable: false, timeIntervals: [], location: "" },

    });
    return (
        <BookingContext.Provider value={{ daysAvailable, setDaysAvailable, timeSlotDuration, setTimeSlotDuration, isSameHours, setIsSameHours, sameHours, setSameHours }}>
            {children}
        </BookingContext.Provider>
    )
}

export const useBookingContext = () => useContext(BookingContext);