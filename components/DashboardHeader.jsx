import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Circle, Path, Svg } from 'react-native-svg';

export default function DashboardHeader({ page }) {
    const router = useRouter();
    const pageHeader = () => {
        if (page === 0) {
            return "Meetings";
        } else if (page === 1) {
            return "Courses";
        } else {
            return "Profile";
        }
    }

    /*
    const topRightIcon = () => {
        if (page == 0) {
            return "Schedule";
        } else {
            return "Notifs";
        }
    }
        */

    const handlePress = () => {
        if (page == 0) {
            router.navigate("/studentDashboard/ScheduleScreen");
        }
    }

    return (
        <View style={styles.headerContainer}>
            <View style={styles.slotlyLogo}>
                <Svg style={styles.group12} width="44" height="44" viewBox="0 0 44 44" fill="none" >
                    <Path d="M17.9929 0C19.9187 0 21.4799 1.56117 21.4799 3.48696L21.4799 21.5153H14.5059L14.5059 3.48697C14.5059 1.56117 16.0671 0 17.9929 0Z" fill="white" />
                    <Path d="M34.263 3.80137C35.6247 5.16312 35.6247 7.37094 34.263 8.73268L21.515 21.4806L16.5837 16.5493L29.3317 3.80138C30.6934 2.43963 32.9012 2.43963 34.263 3.80137Z" fill="white" />
                    <Path d="M43.0795 17.9929C43.0795 19.9187 41.5183 21.4799 39.5925 21.4799L21.5642 21.4799V14.5059L39.5925 14.5059C41.5183 14.5059 43.0795 16.0671 43.0795 17.9929Z" fill="white" />
                    <Path d="M39.278 34.263C37.9163 35.6247 35.7085 35.6247 34.3467 34.263L21.5988 21.515L26.5301 16.5837L39.278 29.3317C40.6398 30.6934 40.6398 32.9012 39.278 34.263Z" fill="white" />
                    <Path d="M25.0866 43.0795C23.1608 43.0795 21.5996 41.5183 21.5996 39.5925L21.5996 21.5642H28.5735L28.5735 39.5925C28.5735 41.5183 27.0124 43.0795 25.0866 43.0795Z" fill="white" />
                    <Path d="M8.81697 39.2782C7.45523 37.9164 7.45523 35.7086 8.81697 34.3468L21.5649 21.5989L26.4962 26.5302L13.7483 39.2782C12.3865 40.6399 10.1787 40.6399 8.81697 39.2782Z" fill="white" />
                    <Path d="M0 25.0845C0 23.1587 1.56117 21.5975 3.48696 21.5975L21.5153 21.5975V28.5715L3.48697 28.5715C1.56117 28.5715 0 27.0103 0 25.0845Z" fill="white" />
                    <Path d="M3.80144 8.81648C5.16318 7.45474 7.371 7.45474 8.73274 8.81648L21.4807 21.5644L16.5494 26.4957L3.80144 13.7478C2.4397 12.3861 2.43969 10.1782 3.80144 8.81648Z" fill="white" />
                    <Circle cx="17.1583" cy="21.0722" r="4.29042" fill="black" />
                    <Circle cx="26.8685" cy="21.0722" r="4.29042" fill="black" />
                    <Circle cx="28.7876" cy="21.1862" r="2.82264" fill="white" />
                    <Circle cx="19.0774" cy="21.1862" r="2.82264" fill="white" />
                </Svg>
            </View>
            <View style={styles.headerTextContainer}>
                <Text style={styles.headerText}>
                    {pageHeader()}
                </Text>
            </View>
            <Pressable onPress={handlePress} style={[styles.icon]}>
                <Svg width="24" height="26" viewBox="0 0 24 26" fill="none" >
                    <Path d="M23.725 18.9925C23.0313 17.7975 22 14.4162 22 10C22 7.34783 20.9464 4.8043 19.0711 2.92893C17.1957 1.05357 14.6522 0 12 0C9.34785 0 6.80431 1.05357 4.92895 2.92893C3.05358 4.8043 2.00002 7.34783 2.00002 10C2.00002 14.4175 0.967516 17.7975 0.273766 18.9925C0.0966042 19.2963 0.00268396 19.6415 0.00147663 19.9931C0.000269303 20.3448 0.0918178 20.6906 0.266889 20.9956C0.441961 21.3006 0.694365 21.5541 0.998648 21.7304C1.30293 21.9068 1.64833 21.9997 2.00002 22H7.10127C7.33198 23.1289 7.94555 24.1436 8.83818 24.8722C9.73082 25.6009 10.8477 25.9989 12 25.9989C13.1523 25.9989 14.2692 25.6009 15.1618 24.8722C16.0545 24.1436 16.6681 23.1289 16.8988 22H22C22.3516 21.9995 22.6968 21.9064 23.0009 21.73C23.3051 21.5535 23.5573 21.3 23.7322 20.9951C23.9071 20.6901 23.9986 20.3444 23.9973 19.9928C23.996 19.6412 23.9021 19.2962 23.725 18.9925ZM12 24C11.3798 23.9998 10.7749 23.8074 10.2685 23.4492C9.76216 23.0911 9.37926 22.5848 9.17252 22H14.8275C14.6208 22.5848 14.2379 23.0911 13.7315 23.4492C13.2252 23.8074 12.6202 23.9998 12 24ZM2.00002 20C2.96252 18.345 4.00002 14.51 4.00002 10C4.00002 7.87827 4.84287 5.84344 6.34316 4.34315C7.84345 2.84285 9.87828 2 12 2C14.1217 2 16.1566 2.84285 17.6569 4.34315C19.1572 5.84344 20 7.87827 20 10C20 14.5062 21.035 18.3412 22 20H2.00002Z" fill="white" />
                </Svg>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        height: "20%",
        flexDirection: "row",
        backgroundColor: "rgb(17, 21, 28)",
        alignItems: "center"
    },
    slotlyLogo: {
        justifyContent: "center",
        marginHorizontal: 15
    },
    headerTextContainer: {
        width: "60%",
    },
    headerText: {
        color: "rgba(255, 255, 255, 1)",
        fontFamily: "Urbanist",
        fontSize: 36,
        fontWeight: 700,
    },
    icon: {
        justifyContent: "center",
        width: "15%",
        height: "40%",
        alignItems: "center",
    },
    scheduleContainer: {
        borderColor: "white",
        borderWidth: 1,
        borderRadius: 15,


    }
})