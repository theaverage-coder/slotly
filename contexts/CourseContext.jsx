import { createContext, useContext, useState } from "react";

const CourseContext = createContext();

export const CourseProvider = ({ children }) => {
    const [courseId, setCourseId] = useState();

    return (
        <CourseContext.Provider value={{ courseId, setCourseId }}>
            {children}
        </CourseContext.Provider>
    )
}

export const useCourseContext = () => useContext(CourseContext);