import Ionicons from "@react-native-vector-icons/ionicons";
import { useState } from "react";
import { Keyboard, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DashboardHeader from "../../components/DashboardHeader";
import { useUser } from "../../contexts/UserContext";

export default function ProfileScreen() {
    const { user, setUser, logout } = useUser();
    const [isEditingName, setIsEditingName] = useState(false);
    const [isEditingPass, setIsEditingPass] = useState(false);
    const [newFirstName, setNewFirstName] = useState("");
    const [newLastName, setNewLastName] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const disabledNameChangeButton = !newFirstName && !newLastName;
    const disabledPassChangeButton = !oldPassword || !newPassword;

    const API_URL =
        Platform.OS === 'web'
            ? process.env.EXPO_PUBLIC_API_URL_WEB
            : process.env.EXPO_PUBLIC_API_URL_MOBILE;

    const handleChangeName = async () => {
        try {
            const response = await fetch(`${API_URL}/api/users/changeName`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userId: user._id,
                    firstName: newFirstName,
                    lastName: newLastName
                }),
            });

            const updatedUser = await response.json();
            if (response.ok) {
                setUser(updatedUser);
                setNewFirstName("");
                setNewLastName("");
                console.log("Changes submitted succesfully")
            }
        } catch (err) {
            console.log(err);
        }
    }

    const handleChangePass = async () => {
        try {
            const response = await fetch(`${API_URL}/api/users/changePassword`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userId: user._id,
                    oldPassword: oldPassword,
                    newPassword: newPassword
                }),
            });

            if (response.ok) {
                setOldPassword("");
                setNewPassword("");
                console.log("Password changed!")
            } else {
                console.log("Old password doesn't match")
            }
        } catch (err) {
            console.log(err);
        }
    }

    const handleDeleteAccount = async () => {
        try {
            const response = await fetch(`${API_URL}/api/users/deleteAccount/${user._id}`, {
                method: "DELETE"
            })

            if (response.ok) {
                //Have to redirect to start/logout somehow?
            }
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <SafeAreaView style={styles.screenContainer}>
            <Pressable style={{ flex: 1 }} onPress={Keyboard.dismiss}>
                <DashboardHeader page={2} />
                {user && (
                    <>
                        <View style={styles.nameContainer}>
                            <Ionicons size={90} color="white" name="person-circle" />
                            <Text style={[styles.nameText, styles.white]}> {user.firstName}  {user.lastName}</Text>
                        </View>
                        <ScrollView>

                            <View style={styles.optionsContainer}>
                                <View style={styles.option}>
                                    <Text style={styles.emailLabel}> EMAIL  </Text>
                                    <Text style={styles.white}> {user.email} </Text>
                                </View>
                                <View style={[styles.option, isEditingName && styles.editingOptionContainer]} >
                                    <Pressable style={styles.pressableOption} onPress={() => setIsEditingName(!isEditingName)}>
                                        <Text style={styles.optionLabel}> Edit Name</Text>
                                        <Ionicons style={styles.optionIcon} size={20} color="white" name={isEditingName ? "chevron-down" : "chevron-forward"} />
                                    </Pressable>
                                    {isEditingName && (
                                        <View style={styles.inputFieldsContainer}>
                                            <TextInput
                                                style={styles.inputField}
                                                placeholder={user.firstName}
                                                value={newFirstName}
                                                onChangeText={(text) => setNewFirstName(text)}
                                            />
                                            <TextInput
                                                style={styles.inputField}
                                                placeholder={user.lastName}
                                                value={newLastName}
                                                onChangeText={(text) => setNewLastName(text)}
                                            />
                                            <Pressable
                                                style={[styles.submitButton, disabledNameChangeButton && styles.disabledButton]}
                                                disabled={disabledNameChangeButton}
                                                onPress={handleChangeName}>
                                                <Text> Submit Changes </Text>
                                            </Pressable>
                                        </View>
                                    )}
                                </View>
                                <View style={[styles.option, isEditingPass && styles.editingOptionContainer]} >
                                    <Pressable style={styles.pressableOption} onPress={() => setIsEditingPass(!isEditingPass)}>
                                        <Text style={styles.optionLabel}> Change Password </Text>
                                        <Ionicons style={styles.optionIcon} size={20} color="white" name={isEditingPass ? "chevron-down" : "chevron-forward"} />
                                    </Pressable>
                                    {isEditingPass && (
                                        <View style={styles.inputFieldsContainer}>
                                            <TextInput
                                                style={styles.inputField}
                                                placeholder="Old password"
                                                value={oldPassword}
                                                onChangeText={(text) => setOldPassword(text)}
                                            />
                                            <TextInput
                                                style={styles.inputField}
                                                placeholder="New password"
                                                value={newPassword}
                                                onChangeText={(text) => setNewPassword(text)}
                                            />
                                            <Pressable
                                                style={[styles.submitButton, disabledPassChangeButton && styles.disabledButton]}
                                                disabled={disabledPassChangeButton}
                                                onPress={handleChangePass}

                                            >
                                                <Text> Change </Text>
                                            </Pressable>
                                        </View>
                                    )}
                                </View>
                                <View style={styles.option}>
                                    <Pressable style={styles.pressableOption} onPress={logout}>
                                        <Text style={styles.optionLabel}> Logout </Text>
                                        <Ionicons style={styles.optionIcon} size={20} color="white" name="log-out-outline" />
                                    </Pressable>
                                </View>
                                <View style={styles.option}>
                                    <View style={styles.pressableOption}>
                                        <Text style={[styles.optionLabel, styles.redText]}> Delete Account </Text>
                                        <Ionicons style={styles.optionIcon} size={20} color="rgb(156, 49, 49)" name="trash-outline" />
                                    </View>
                                </View>
                            </View>
                        </ScrollView>
                    </>
                )}

            </Pressable>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: "rgba(33, 33, 33, 1)",
    },
    nameContainer: {
        flexDirection: "row",
        alignItems: "center",
        //justifyContent: "center",
        gap: 5,
        marginLeft: 20
    },
    white: {
        color: "white",
    },
    nameText: {
        fontSize: 40
    },
    emailLabel: {
        color: "rgb(134, 134, 134)",
        marginBottom: 5,
        fontWeight: "bold"
    },
    optionsContainer: {
        alignItems: "center",
        marginTop: 20
    },
    pressableOption: {
        flexDirection: "row",
        height: 70,
        alignItems: "center",
        width: "100%",
    },
    option: {
        height: 70,
        justifyContent: "center",
        width: "90%",
        borderBottomWidth: 1
    },
    editingOptionContainer: {
        height: 250,
        justifyContent: "flex-start"
    },
    inputFieldsContainer: {
        gap: 10,
        alignItems: "center"
    },
    inputField: {
        width: "95%",
        height: 50,
        backgroundColor: "rgba(50, 50, 50, 1)",
        justifyContent: "center",
        borderRadius: 16,
        paddingLeft: 20,
        color: "rgba(255, 255, 255, 1)",
    },
    submitButton: {
        backgroundColor: "rgb(54, 65, 86)",
        padding: 10,
        borderRadius: 10
    },
    disabledButton: {
        opacity: 0.3
    },
    optionLabel: {
        color: "rgb(134, 134, 134)",
        flex: 1
    },
    optionIcon: {
        marginRight: 15
    },
    redText: {
        color: "rgb(156, 49, 49)"
    }
})