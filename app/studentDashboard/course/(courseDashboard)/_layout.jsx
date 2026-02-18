import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { withLayoutContext } from "expo-router";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
const { Navigator } = createMaterialTopTabNavigator();
export const MaterialTopTabs = withLayoutContext(Navigator);


const CourseLayout = () => {
    const insets = useSafeAreaInsets();

    return (
        <View style={{ flex: 1, backgroundColor: "rgb(17, 21, 28)", paddingTop: insets.top }}>
            <MaterialTopTabs screenOptions={{
                tabBarStyle: { backgroundColor: "rgb(17, 21, 28)", borderBottomWidth: 1, borderBottomColor: "rgb(54, 65, 86)", },
                tabBarLabelStyle: { color: "white" },
                tabBarIndicatorStyle: {
                    backgroundColor: "rgb(125, 78, 87)", height: 3,
                },
            }}>
                <MaterialTopTabs.Screen name="(detailsAndBookings)" options={{ title: 'Booking' }} />
                <MaterialTopTabs.Screen name="(event)" options={{ title: "Events" }} />
                <MaterialTopTabs.Screen name="(poll)" options={{ title: 'Polls' }} />
            </MaterialTopTabs>
        </View>

    );
};

export default CourseLayout;