import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { withLayoutContext } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const { Navigator } = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext(Navigator);


const CourseLayout = () => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "rgba(33, 33, 33, 1)" }}>
            <MaterialTopTabs>
                <MaterialTopTabs.Screen name="(detailsAndBookings)" options={{ title: 'Details' }} />
                <MaterialTopTabs.Screen name="(event)" options={{ title: 'Events' }} />
                <MaterialTopTabs.Screen name="(poll)" options={{ title: 'Polls' }} />
            </MaterialTopTabs>
        </SafeAreaView>



    );
};

export default CourseLayout;