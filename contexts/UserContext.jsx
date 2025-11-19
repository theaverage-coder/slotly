import { useRouter } from "expo-router";
import { createContext, useContext, useState } from "react";
import { Platform } from "react-native";
const UserContext = createContext();

export function UserProvider({ children }) {

    const API_URL =
        Platform.OS === 'web'
            ? process.env.EXPO_PUBLIC_API_URL_WEB
            : process.env.EXPO_PUBLIC_API_URL_MOBILE;


    const [user, setUser] = useState(null);
    const router = useRouter();

    async function login(email, password) {
        try {
            const response = await fetch(`${API_URL}/api/users/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }
                ),
            });

            const data = await response.json();
            console.log(data);

            if (response.ok) {
                setUser(data);
                if (data.role == "s") {
                    router.replace("/studentDashboard/HomeScreen");
                } else {
                    router.replace("/teacherDashboard")
                }
            }
        } catch (err) {
            console.log(err);
        }
    }

    async function register(email, password, firstName, lastName, role) {

    }

    async function logout() {

    }

    return (
        <UserContext.Provider value={{ user, login, register, logout }}>
            {children}
        </UserContext.Provider>
    );
}

export const useUser = () => useContext(UserContext);