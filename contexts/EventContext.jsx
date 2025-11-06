import { createContext, useContext, useState } from "react";

const EventContext = createContext();

export const EventProvider = ({ children }) => {

    const [event, setEvent] = useState({
        title: "",
        startTime: new Date(),
        endTime: new Date(),
        isLimitedCapacity: false,
        capacity: "",
        location: "",
        description: "",
    })

    return (
        <EventContext.Provider value={{ event, setEvent }}>
            {children}
        </EventContext.Provider>
    )
}

export const useEventContext = () => useContext(EventContext);