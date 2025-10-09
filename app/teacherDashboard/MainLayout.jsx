import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Screens
import CoursesScreen from "./CoursesScreen";
import HomeScreen from "./HomeScreen";
import ProfileScreen from "./ProfileScreen";

// Screen names
const homeName = "Home";
const coursesName = "Courses";
const profileName = "Profile";

const Tab = createBottomTabNavigator();


export default function MainLayout() {
    return (
        <Tab.Navigator
            initialRouteName={homeName}
            screenOptions={{ headerShown: false }}
        >
            <Tab.Screen name={homeName} component={HomeScreen} />
            <Tab.Screen name={coursesName} component={CoursesScreen} />
            <Tab.Screen name={profileName} component={ProfileScreen} />
        </Tab.Navigator>
    );
}