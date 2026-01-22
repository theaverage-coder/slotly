import { createContext, useContext, useState } from "react";

const PollContext = createContext();

export const PollProvider = ({ children }) => {

    const [poll, setPoll] = useState({
        title: "",
        options: [
            "",
            ""
        ],
        multipleVotes: false,
        course: "",
        duration: 7
    })

    return (
        <PollContext.Provider value={{ poll, setPoll }}>
            {children}
        </PollContext.Provider>
    )
}

export const usePollContext = () => useContext(PollContext);