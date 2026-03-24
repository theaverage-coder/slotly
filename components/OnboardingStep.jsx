import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Circle, Path, Svg } from 'react-native-svg';


export default function OnboardingStep({ number, header, description }) {
    const router = useRouter();

    return (
        <View style={styles.componentContainer}>
            <Pressable onPress={() => router.back()} style={styles.backButton}>
                <Ionicons size={40} color="white" name="arrow-back-circle" />
            </Pressable>
            <View style={[styles.containerItem, styles.stepNumber]}>
                <Text style={styles.stepXof4}>
                    Step {number} of 4
                </Text>
                <View style={styles.slotlyFourLogos}>
                    <View style={styles.logoContainer}>
                        <View style={[styles.greenLogo, number === 1 ? styles.opaqueLogo : styles.transparentLogo]}>
                            <Svg style={styles.group12} width="42" height="42" viewBox="0 0 42 42" fill="none" >
                                <Path d="M17.7712 0.804688C19.5871 0.804688 21.0591 2.27671 21.0591 4.09255L21.0591 21.0915H14.4834L14.4834 4.09255C14.4834 2.27672 15.9554 0.804688 17.7712 0.804688Z" fill="rgb(33, 45, 64)" />
                                <Path d="M33.1117 4.38802C34.3956 5.67201 34.3956 7.75377 33.1117 9.03776L21.0916 21.0578L16.4418 16.4081L28.4619 4.38802C29.7459 3.10403 31.8277 3.10403 33.1117 4.38802Z" fill="rgb(33, 45, 64)" />
                                <Path d="M41.4248 17.7688C41.4248 19.5846 39.9528 21.0566 38.1369 21.0566L21.138 21.0566V14.4809L38.1369 14.4809C39.9528 14.4809 41.4248 15.9529 41.4248 17.7688Z" fill="rgb(33, 45, 64)" />
                                <Path d="M37.8405 33.1087C36.5565 34.3927 34.4747 34.3927 33.1908 33.1087L21.1707 21.0886L25.8204 16.4389L37.8405 28.459C39.1245 29.743 39.1245 31.8247 37.8405 33.1087Z" fill="rgb(33, 45, 64)" />
                                <Path d="M24.4597 41.4238C22.6439 41.4238 21.1719 39.9518 21.1719 38.136L21.1719 21.137H27.7476L27.7476 38.136C27.7476 39.9518 26.2756 41.4238 24.4597 41.4238Z" fill="rgb(33, 45, 64)" />
                                <Path d="M9.11882 37.8405C7.83483 36.5565 7.83483 34.4747 9.11882 33.1908L21.1389 21.1707L25.7886 25.8204L13.7686 37.8405C12.4846 39.1245 10.4028 39.1245 9.11882 37.8405Z" fill="rgb(33, 45, 64)" />
                                <Path d="M0.805176 24.4558C0.805176 22.64 2.2772 21.168 4.09304 21.168L21.092 21.168V27.7437L4.09304 27.7437C2.27721 27.7437 0.805176 26.2717 0.805176 24.4558Z" fill="rgb(33, 45, 64)" />
                                <Path d="M4.38948 9.11589C5.67347 7.8319 7.75524 7.8319 9.03923 9.11589L21.0593 21.136L16.4096 25.7857L4.38949 13.7656C3.10549 12.4816 3.10549 10.3999 4.38948 9.11589Z" fill="rgb(33, 45, 64)" />
                                <Circle cx="16.9839" cy="20.6724" r="4.04545" fill="white" />
                                <Circle cx="26.1397" cy="20.6724" r="4.04545" fill="white" />
                                <Circle cx="27.8714" cy="20.7806" r="2.66148" fill="#1C1C1C" />
                                <Circle cx="18.7157" cy="20.7806" r="2.66148" fill="#1C1C1C" />
                            </Svg>

                        </View>
                    </View>
                    <View style={styles.logoContainer}>
                        <View style={[styles.orangeLogo, number === 2 ? styles.opaqueLogo : styles.transparentLogo]}>
                            <Svg style={styles.group12} width="41" height="42" viewBox="0 0 41 42" fill="none" >
                                <Path d="M17.0012 0.804688C18.817 0.804688 20.2891 2.27671 20.2891 4.09255L20.2891 21.0915H13.7133L13.7133 4.09255C13.7133 2.27672 15.1854 0.804688 17.0012 0.804688Z" fill="rgb(54, 65, 86)" />
                                <Path d="M32.3421 4.38802C33.6261 5.67201 33.6261 7.75377 32.3421 9.03776L20.322 21.0578L15.6723 16.4081L27.6924 4.38802C28.9764 3.10403 31.0581 3.10403 32.3421 4.38802Z" fill="rgb(54, 65, 86)" />
                                <Path d="M40.6558 17.7688C40.6558 19.5846 39.1837 21.0566 37.3679 21.0566L20.3689 21.0566V14.4809L37.3679 14.4809C39.1837 14.4809 40.6558 15.9529 40.6558 17.7688Z" fill="rgb(54, 65, 86)" />
                                <Path d="M37.071 33.1087C35.787 34.3927 33.7052 34.3927 32.4212 33.1087L20.4011 21.0886L25.0509 16.4389L37.071 28.459C38.355 29.743 38.355 31.8247 37.071 33.1087Z" fill="rgb(54, 65, 86)" />
                                <Path d="M23.6897 41.4238C21.8739 41.4238 20.4019 39.9518 20.4019 38.136L20.4019 21.137H26.9776L26.9776 38.136C26.9776 39.9518 25.5056 41.4238 23.6897 41.4238Z" fill="rgb(54, 65, 86)" />
                                <Path d="M8.34929 37.8405C7.06529 36.5565 7.06529 34.4747 8.34929 33.1908L20.3694 21.1707L25.0191 25.8204L12.999 37.8405C11.715 39.1245 9.63328 39.1245 8.34929 37.8405Z" fill="rgb(54, 65, 86)" />
                                <Path d="M0.0351562 24.4558C0.0351562 22.64 1.50718 21.168 3.32302 21.168L20.322 21.168V27.7437L3.32302 27.7437C1.50719 27.7437 0.0351562 26.2717 0.0351562 24.4558Z" fill="rgb(54, 65, 86)" />
                                <Path d="M3.61946 9.11589C4.90346 7.8319 6.98522 7.8319 8.26921 9.11589L20.2893 21.136L15.6395 25.7857L3.61947 13.7656C2.33548 12.4816 2.33547 10.3999 3.61946 9.11589Z" fill="rgb(54, 65, 86)" />
                                <Circle cx="16.2139" cy="20.6724" r="4.04545" fill="white" />
                                <Circle cx="25.3697" cy="20.6724" r="4.04545" fill="white" />
                                <Circle cx="27.1019" cy="20.7806" r="2.66148" fill="#1C1C1C" />
                                <Circle cx="17.9457" cy="20.7806" r="2.66148" fill="#1C1C1C" />
                            </Svg>

                        </View>
                    </View>
                    <View style={styles.logoContainer}>
                        <View style={[styles.blueLogo, number === 3 ? styles.opaqueLogo : styles.transparentLogo]}>
                            <Svg style={styles.group12} width="41" height="42" viewBox="0 0 41 42" fill="none" >
                                <Path d="M17.2317 0.806641C19.0475 0.806641 20.5195 2.27867 20.5195 4.09451L20.5195 21.0935H13.9438L13.9438 4.09451C13.9438 2.27867 15.4158 0.806641 17.2317 0.806641Z" fill="rgb(89, 116, 123)" />
                                <Path d="M32.5726 4.38997C33.8566 5.67396 33.8566 7.75572 32.5726 9.03972L20.5525 21.0598L15.9028 16.41L27.9228 4.38997C29.2068 3.10598 31.2886 3.10598 32.5726 4.38997Z" fill="rgb(89, 116, 123)" />
                                <Path d="M40.8857 17.7707C40.8857 19.5866 39.4137 21.0586 37.5979 21.0586L20.5989 21.0586V14.4829L37.5979 14.4829C39.4137 14.4829 40.8857 15.9549 40.8857 17.7707Z" fill="rgb(89, 116, 123)" />
                                <Path d="M37.3014 33.1107C36.0174 34.3947 33.9357 34.3947 32.6517 33.1107L20.6316 21.0906L25.2814 16.4409L37.3014 28.4609C38.5854 29.7449 38.5854 31.8267 37.3014 33.1107Z" fill="rgb(89, 116, 123)" />
                                <Path d="M23.9202 41.4258C22.1044 41.4258 20.6323 39.9538 20.6323 38.1379L20.6323 21.139H27.2081L27.2081 38.1379C27.2081 39.9538 25.736 41.4258 23.9202 41.4258Z" fill="rgb(89, 116, 123)" />
                                <Path d="M8.57975 37.8424C7.29576 36.5585 7.29576 34.4767 8.57975 33.1927L20.5998 21.1726L25.2496 25.8224L13.2295 37.8424C11.9455 39.1264 9.86375 39.1264 8.57975 37.8424Z" fill="rgb(89, 116, 123)" />
                                <Path d="M0.265625 24.4578C0.265625 22.6419 1.73765 21.1699 3.55349 21.1699L20.5524 21.1699V27.7457L3.55349 27.7457C1.73765 27.7457 0.265625 26.2736 0.265625 24.4578Z" fill="rgb(89, 116, 123)" />
                                <Path d="M3.85042 9.11784C5.13441 7.83385 7.21617 7.83385 8.50016 9.11784L20.5202 21.1379L15.8705 25.7877L3.85042 13.7676C2.56643 12.4836 2.56643 10.4018 3.85042 9.11784Z" fill="rgb(89, 116, 123)" />
                                <Circle cx="16.4444" cy="20.6744" r="4.04545" fill="white" />
                                <Circle cx="25.6001" cy="20.6744" r="4.04545" fill="white" />
                                <Circle cx="27.3324" cy="20.7826" r="2.66148" fill="#1C1C1C" />
                                <Circle cx="18.1761" cy="20.7826" r="2.66148" fill="#1C1C1C" />
                            </Svg>
                        </View>
                    </View>
                    <View style={styles.logoContainer}>
                        <View style={[styles.yellowLogo, number === 4 ? styles.opaqueLogo : styles.transparentLogo]}>
                            <Svg style={styles.group12} width="42" height="42" viewBox="0 0 42 42" fill="none" >
                                <Path d="M17.4612 0.804688C19.277 0.804688 20.749 2.27671 20.749 4.09255L20.749 21.0915H14.1733L14.1733 4.09255C14.1733 2.27672 15.6453 0.804688 17.4612 0.804688Z" fill="rgb(125, 78, 87)" />
                                <Path d="M32.8026 4.38802C34.0866 5.67201 34.0866 7.75377 32.8026 9.03776L20.7825 21.0578L16.1328 16.4081L28.1528 4.38802C29.4368 3.10403 31.5186 3.10403 32.8026 4.38802Z" fill="rgb(125, 78, 87)" />
                                <Path d="M41.1157 17.7688C41.1157 19.5846 39.6437 21.0566 37.8279 21.0566L20.8289 21.0566V14.4809L37.8279 14.4809C39.6437 14.4809 41.1157 15.9529 41.1157 17.7688Z" fill="rgb(125, 78, 87)" />
                                <Path d="M37.5314 33.1087C36.2474 34.3927 34.1657 34.3927 32.8817 33.1087L20.8616 21.0886L25.5113 16.4389L37.5314 28.459C38.8154 29.743 38.8154 31.8247 37.5314 33.1087Z" fill="rgb(125, 78, 87)" />
                                <Path d="M24.1497 41.4238C22.3338 41.4238 20.8618 39.9518 20.8618 38.136L20.8618 21.137H27.4375L27.4375 38.136C27.4375 39.9518 25.9655 41.4238 24.1497 41.4238Z" fill="rgb(125, 78, 87)" />
                                <Path d="M8.80925 37.8405C7.52526 36.5565 7.52526 34.4747 8.80925 33.1908L20.8293 21.1707L25.4791 25.8204L13.459 37.8405C12.175 39.1245 10.0932 39.1245 8.80925 37.8405Z" fill="rgb(125, 78, 87)" />
                                <Path d="M0.496094 24.4558C0.496094 22.64 1.96812 21.168 3.78396 21.168L20.7829 21.168V27.7437L3.78396 27.7437C1.96812 27.7437 0.496094 26.2717 0.496094 24.4558Z" fill="rgb(125, 78, 87)" />
                                <Path d="M4.0804 9.11589C5.36439 7.8319 7.44615 7.8319 8.73014 9.11589L20.7502 21.136L16.1005 25.7857L4.0804 13.7656C2.79641 12.4816 2.79641 10.3999 4.0804 9.11589Z" fill="rgb(125, 78, 87)" />
                                <Circle cx="16.6744" cy="20.6724" r="4.04545" fill="white" />
                                <Circle cx="25.8301" cy="20.6724" r="4.04545" fill="white" />
                                <Circle cx="27.5619" cy="20.7806" r="2.66148" fill="#1C1C1C" />
                                <Circle cx="18.4061" cy="20.7806" r="2.66148" fill="#1C1C1C" />
                            </Svg>
                        </View>
                    </View>
                </View>
            </View>
            <View style={[styles.containerItem]}>
                <View style={styles.stepsText}>
                    <Text style={styles.header}>
                        {header}
                    </Text>
                    <Text style={styles.description}>
                        {description}
                    </Text>
                </View>
            </View>
        </View>
    );

}


const styles = StyleSheet.create({
    componentContainer: {
        flexDirection: "column",
        paddingTop: 20
    },
    containerItem: {
        justifyContent: "center",
        paddingLeft: 15,
        paddingRight: 15,
    },
    backButton: {
        justifyContent: "center",
        marginBottom: 20,
        paddingLeft: 15
    },
    backArrow: {
        flexShrink: 0,
        overflow: "visible"
    },
    stepNumber: {
        rowGap: 10
    },
    stepXof4: {
        alignSelf: "stretch",
        textAlign: "left",
        color: "rgba(117, 117, 117, 1)",
        fontFamily: "Urbanist",
        fontSize: 16,
        fontWeight: 500,
    },
    slotlyFourLogos: {
        flexDirection: "row",
        alignSelf: "stretch",
        justifyContent: 'space-between',
        alignItems: "center",
        marginVertical: 20
    },
    logoContainer: {
        shadowColor: "rgba(0, 0, 0, 0.15)",
        shadowOffset: {
            width: 1.2362204790115356,
            height: 1.2362204790115356
        },
        shadowRadius: 1.2362204790115356,
        alignItems: "center",
        justifyContent: "center",
    },
    group12: {
        height: 41,
        width: 41
    },
    greenLogo: {
        height: 52,
        width: 52,
        backgroundColor: "rgba(255, 255, 255, 1)",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 3,
        borderColor: "rgb(33, 45, 64)",
        borderRadius: 26
    },
    orangeLogo: {
        height: 52,
        width: 52,
        backgroundColor: "rgba(255, 255, 255, 1)",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 3,
        borderColor: "rgb(54, 65, 86)",
        borderRadius: 26
    },
    blueLogo: {
        height: 52,
        width: 52,
        backgroundColor: "rgba(255, 255, 255, 1)",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 3,
        borderColor: "rgb(89, 116, 123)",
        borderRadius: 26
    },
    yellowLogo: {
        height: 52,
        width: 52,
        backgroundColor: "rgba(255, 255, 255, 1)",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 3,
        borderColor: "rgb(125, 78, 87)",
        borderRadius: 26
    },
    stepsText: {
        alignSelf: "stretch",
        flexShrink: 0,
        flexDirection: "column",
        alignItems: "flex-start",
        rowGap: 8
    },
    header: {
        alignSelf: "stretch",
        flexShrink: 0,
        textAlign: "left",
        color: "rgba(255, 255, 255, 1)",
        fontFamily: "Urbanist",
        fontSize: 34,
        fontWeight: 700
    },
    description: {
        alignSelf: "stretch",
        flexShrink: 0,
        textAlign: "left",
        color: "rgba(117, 117, 117, 1)",
        fontFamily: "Urbanist",
        fontSize: 18,
        fontWeight: 500
    },
    transparentLogo: {
        opacity: 0.2,
    }

})