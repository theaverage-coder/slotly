import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { createContext, useContext, useState } from "react";
import { Alert, Platform } from "react-native";

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

            if (response.ok) {
                setUser(data);
                await AsyncStorage.setItem("token", data.token);

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
        try {
            setUser(null);
            await AsyncStorage.removeItem("token");
            //router.dismissAll();

            router.replace("/OnboardingStart");

        } catch (err) {
            Alert.alert("Logout Failed", "Please try again.");
            console.error(err);
        }
    }

    return (
        <UserContext.Provider value={{ user, setUser, login, register, logout }}>
            {children}
        </UserContext.Provider>
    );
}

export const useUser = () => useContext(UserContext);