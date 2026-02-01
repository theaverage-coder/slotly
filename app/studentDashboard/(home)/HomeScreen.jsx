import { StyleSheet, Text, View } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import BackgroundSlotlyLogo from '../../../components/BackgroundSlotlyLogo';
import DashboardHeader from '../../../components/DashboardHeader';

export default function HomeScreen() {


    return (
        <SafeAreaView style={styles.screenContainer}>
            <DashboardHeader page={0} />
            <View style={styles.emptyScreen}>
                <BackgroundSlotlyLogo />
                <Text style={styles.text1}>You don't have any meetings yet</Text>
                <Text style={styles.text2}>Add your courses to find professors and book your first meeting</Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screenContainer: {
        backgroundColor: "rgba(33, 33, 33, 1)",
        flex: 1
    },
    emptyScreen: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        rowGap: 15,
        paddingHorizontal: 15
    },
    text1: {
        color: "rgba(255, 255, 255, 1)",
        fontFamily: "Urbanist",
        fontSize: 24,
        fontWeight: 700,
        textAlign: "center"
    },
    text2: {
        color: "rgba(173, 170, 170, 1)",
        fontFamily: "Urbanist",
        fontSize: 16,
        fontWeight: 600,
        textAlign: "center",
        width: "80%"
    },

})