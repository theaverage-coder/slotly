import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Circle, Path, Svg } from 'react-native-svg';

export default function NavBar({ page, setPage }) {
    const handlePress = (page) => {
        setPage(page);
    };

    return (
        <View style={styles.navBarContainer}>
            <View style={styles.iconContainer}>
                <Pressable style={styles.pressableIcon} onPress={() => handlePress(0)}>
                    <Svg width="25" height="27" viewBox="0 0 25 25" fill="none" >
                        <Path d="M24.2752 12.0005V24.0005C24.2752 24.2658 24.1698 24.5201 23.9823 24.7076C23.7947 24.8952 23.5404 25.0005 23.2752 25.0005H16.2752C16.0099 25.0005 15.7556 24.8952 15.5681 24.7076C15.3805 24.5201 15.2752 24.2658 15.2752 24.0005V17.5005C15.2752 17.3679 15.2225 17.2408 15.1287 17.147C15.0349 17.0532 14.9078 17.0005 14.7752 17.0005H9.77516C9.64255 17.0005 9.51538 17.0532 9.42161 17.147C9.32784 17.2408 9.27516 17.3679 9.27516 17.5005V24.0005C9.27516 24.2658 9.1698 24.5201 8.98227 24.7076C8.79473 24.8952 8.54038 25.0005 8.27516 25.0005H1.27516C1.00995 25.0005 0.755592 24.8952 0.568055 24.7076C0.380519 24.5201 0.275162 24.2658 0.275162 24.0005V12.0005C0.275408 11.4702 0.486282 10.9617 0.861412 10.5868L10.8614 0.586788C11.2364 0.211999 11.745 0.00146484 12.2752 0.00146484C12.8054 0.00146484 13.3139 0.211999 13.6889 0.586788L23.6889 10.5868C24.064 10.9617 24.2749 11.4702 24.2752 12.0005Z" fill="white" />
                    </Svg>
                </Pressable>
                <Text style={styles.navBarText}>
                    Home
                </Text>
            </View>
            <View style={styles.iconContainer}>
                <Pressable style={styles.pressableIcon} onPress={() => handlePress(1)}>
                    <Svg width="27" height="27" viewBox="0 0 27 27" fill="none" >
                        <Path d="M24.5895 2.99963H14.5895V0.999634C14.5895 0.734417 14.4842 0.480063 14.2966 0.292527C14.1091 0.104991 13.8547 -0.000366211 13.5895 -0.000366211C13.3243 -0.000366211 13.0699 0.104991 12.8824 0.292527C12.6949 0.480063 12.5895 0.734417 12.5895 0.999634V2.99963H2.58951C2.05907 2.99963 1.55037 3.21035 1.17529 3.58542C0.800222 3.96049 0.589508 4.4692 0.589508 4.99963V19.9996C0.589508 20.5301 0.800222 21.0388 1.17529 21.4138C1.55037 21.7889 2.05907 21.9996 2.58951 21.9996H7.50951L4.80826 25.3746C4.6425 25.5818 4.56584 25.8464 4.59514 26.1101C4.62444 26.3738 4.75731 26.6151 4.96451 26.7809C5.17171 26.9466 5.43627 27.0233 5.69999 26.994C5.96372 26.9647 6.205 26.8318 6.37076 26.6246L10.0695 21.9996H17.1095L20.8083 26.6246C20.8903 26.7272 20.9918 26.8127 21.1069 26.876C21.222 26.9394 21.3484 26.9795 21.479 26.994C21.6096 27.0085 21.7418 26.9972 21.868 26.9606C21.9942 26.924 22.1119 26.863 22.2145 26.7809C22.3171 26.6988 22.4025 26.5973 22.4659 26.4822C22.5293 26.3671 22.5694 26.2407 22.5839 26.1101C22.5984 25.9795 22.587 25.8474 22.5505 25.7212C22.5139 25.595 22.4528 25.4772 22.3708 25.3746L19.6695 21.9996H24.5895C25.1199 21.9996 25.6286 21.7889 26.0037 21.4138C26.3788 21.0388 26.5895 20.5301 26.5895 19.9996V4.99963C26.5895 4.4692 26.3788 3.96049 26.0037 3.58542C25.6286 3.21035 25.1199 2.99963 24.5895 2.99963ZM24.5895 19.9996H2.58951V4.99963H24.5895V19.9996Z" fill="white" />
                    </Svg>
                </Pressable>
                <Text style={styles.navBarText}>
                    My courses
                </Text>
            </View>
            <View style={styles.iconContainer}>
                <Pressable style={styles.pressableIcon} onPress={() => handlePress(2)}>
                    <Svg width="29" height="29" viewBox="0 0 33 33" fill="none" >
                        <Circle cx="16.3149" cy="16.5" r="16" fill="#5F5F5F" />
                    </Svg>
                </Pressable>
                <Text style={styles.navBarText}>
                    Profile
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    navBarContainer: {
        backgroundColor: "rgba(33, 33, 33, 1)",
        display: "flex",
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: "center",
        height: "10vh",
        paddingLeft: 20,
        paddingRight: 20,
    },
    iconContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        rowGap: 5,
    },
    pressableIcon: {
        flex: 0
    },
    navBarText: {
        color: "rgba(255, 255, 255, 1)",
        fontFamily: "Urbanist",
        fontSize: 12,
        fontWeight: 400
    },
})