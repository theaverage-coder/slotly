import { StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DashboardHeader from '../../components/DashboardHeader';

export default function ProfileScreen() {
    return (
        <SafeAreaView style={styles.screenContainer}>
            <DashboardHeader page={2} />
            <Text style={{ color: "white" }}> Profile Screen </Text>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screenContainer: {
        backgroundColor: "rgba(33, 33, 33, 1)",
        flex: 1
    }
})