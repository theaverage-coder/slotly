import { useState } from "react";
import { View } from 'react-native';

import CoursesScreen from '../studentDashboard/CoursesScreen';
import HomeScreen from '../studentDashboard/HomeScreen';
import ProfileScreen from '../studentDashboard/ProfileScreen';
import Header from './Header';
import NavBar from './NavBar';

export default function MainLayout() {
    const [page, setPage] = useState(0);

    const pageContent = () => {
        if (page === 0) {
            return <HomeScreen></HomeScreen>;
        } else if (page == 1) {
            return <CoursesScreen></CoursesScreen>;
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