import { useState } from "react";
import { View } from 'react-native';

import CoursesScreen from './CoursesScreen';
import Header from './Header';
import HomeScreen from './HomeScreen';
import NavBar from './NavBar';
import ProfileScreen from './ProfileScreen';
import ScheduleScreen from './ScheduleScreen';

export default function MainLayout() {
    const [page, setPage] = useState(0);

    const pageContent = () => {
        if (page === 0) {
            return <HomeScreen></HomeScreen>;
        } else if (page == 1) {
            return <CoursesScreen></CoursesScreen>;
        } else if (page == 2) {
            return <ScheduleScreen></ScheduleScreen>;
        } else {
            return <ProfileScreen></ProfileScreen>;
        }
    }

    return (
        <View>
            <Header page={page}></Header>
            {pageContent()}
            <NavBar page={page} setPage={setPage}></NavBar>
        </View>
    );
}