import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Alert, Platform, StyleSheet, Text, View } from 'react-native';
import { Path, Svg } from 'react-native-svg';
import MyButton2 from '../../components/MyButton2';
import { useForm } from './FormProvider';


export default function OnboardingDone() {
    const { formData, setFormData } = useForm();
    const API_URL =
        Platform.OS === 'web'
            ? process.env.EXPO_PUBLIC_API_URL_WEB
            : process.env.EXPO_PUBLIC_API_URL_MOBILE;

    const handleSubmit = async () => {
        try {
            const response = await fetch(`${API_URL}/api/users/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            console.log(data);

            if (response.ok) {
                console.log("Succesfully registered user ", data.firstName);
                router.replace("/(onboarding)/OnboardingStart");
            }

        } catch (err) {
            Alert.alert("Failed to register", "Please try again",
                [
                    {
                        text: "OK",
                        onPress: () => {
                            router.dismissAll();
                            router.replace("/OnboardingStart")
                        }
                    }
                ]
            )
            console.log(err);
        }
    };

    return (
        <View style={styles.screenContainer}>
            <View>
                <View style={styles.textContainer}>
                    <View style={styles.circleContainer}>
                        <Ionicons size={60} color="#32C548" name="checkmark-circle" />
                    </View>
                    <Text style={styles.allDone}>
                        All Done!
                    </Text>
                    <Text style={styles.welcomeaboardTimetoslotthingsin}>
                        Welcome aboard! Time to slot things in.
                    </Text>
                </View>
                <View style={styles.slotlyFourLogos}>
                    <View style={styles.greenLogo}>
                        <Svg style={styles.group12} width="117" height="138" viewBox="0 0 117 138" fill="none" >
                            <Path d="M22.5801 19.9671C27.1861 18.4589 32.1425 20.9702 33.6507 25.5761L47.7695 68.6945L31.0899 74.1561L16.9711 31.0377C15.463 26.4318 17.9742 21.4753 22.5801 19.9671Z" fill="#34C759" />
                            <Path d="M64.4703 16.3151C68.7936 18.5055 70.5226 23.786 68.3322 28.1093L47.8263 68.5821L32.1702 60.6498L52.676 20.177C54.8665 15.8537 60.1469 14.1246 64.4703 16.3151Z" fill="#34C759" />
                            <Path d="M96.6701 43.3536C98.1783 47.9595 95.667 52.916 91.0611 54.4242L47.9427 68.5429L42.4811 51.8634L85.5995 37.7446C90.2054 36.2364 95.1619 38.7476 96.6701 43.3536Z" fill="#34C759" />
                            <Path d="M100.321 85.2461C98.1307 89.5695 92.8502 91.2985 88.5269 89.1081L48.0541 68.6022L55.9864 52.9461L96.4592 73.4519C100.783 75.6424 102.512 80.9228 100.321 85.2461Z" fill="#34C759" />
                            <Path d="M73.2836 117.447C68.6777 118.955 63.7212 116.444 62.2131 111.838L48.0943 68.7195L64.7738 63.2579L78.8926 106.376C80.4008 110.982 77.8896 115.939 73.2836 117.447Z" fill="#34C759" />
                            <Path d="M31.394 121.095C27.0707 118.905 25.3416 113.624 27.5321 109.301L48.0379 68.828L63.6941 76.7603L43.1882 117.233C40.9978 121.556 35.7173 123.286 31.394 121.095Z" fill="#34C759" />
                            <Path d="M-0.808759 94.0546C-2.31693 89.4487 0.194296 84.4922 4.80023 82.9841L47.9187 68.8653L53.3802 85.5448L10.2618 99.6636C5.65588 101.172 0.699416 98.6606 -0.808759 94.0546Z" fill="#34C759" />
                            <Path d="M-4.4559 52.1679C-2.26545 47.8446 3.015 46.1156 7.33833 48.306L47.8111 68.8119L39.8788 84.468L-0.593979 63.9622C-4.91731 61.7717 -6.64635 56.4912 -4.4559 52.1679Z" fill="#34C759" />
                            <Path d="M48.5353 68.8172C49.7931 72.6584 43.1781 68.0045 37.5061 69.8617C31.8341 71.719 29.2529 79.3841 27.9951 75.5429C26.7374 71.7018 30.3158 67.0823 35.9878 65.225C41.6599 63.3678 47.2775 64.9761 48.5353 68.8172Z" fill="#1C1C1C" />
                            <Path d="M69.7882 61.8582C71.046 65.6994 64.431 61.0455 58.759 62.9028C53.087 64.76 50.5058 72.4251 49.2481 68.5839C47.9903 64.7428 51.5688 60.1233 57.2408 58.2661C62.9128 56.4088 68.5305 58.0171 69.7882 61.8582Z" fill="#1C1C1C" />
                        </Svg>

                    </View>
                    <View style={styles.redLogo}>
                        <Svg width="139" height="139" viewBox="0 0 139 139" fill="none" >
                            <Path d="M77.7765 14.7495C82.4428 16.2513 85.0081 21.2515 83.5063 25.9178L69.4471 69.6012L52.549 64.1626L66.6082 20.4792C68.11 15.813 73.1103 13.2477 77.7765 14.7495Z" fill="#DE7552" />
                            <Path d="M114.235 36.6477C116.473 41.0092 114.751 46.3589 110.389 48.5965L69.5592 69.5439L61.4561 53.7495L102.286 32.8021C106.648 30.5645 111.997 32.2862 114.235 36.6477Z" fill="#DE7552" />
                            <Path d="M124.531 77.9123C123.029 82.5786 118.029 85.1439 113.362 83.6421L69.6791 69.5828L75.1177 52.6847L118.801 66.744C123.467 68.2458 126.033 73.246 124.531 77.9123Z" fill="#DE7552" />
                            <Path d="M102.63 114.372C98.2686 116.61 92.919 114.888 90.6814 110.527L69.7339 69.6964L85.5283 61.5933L106.476 102.424C108.713 106.785 106.992 112.135 102.63 114.372Z" fill="#DE7552" />
                            <Path d="M61.3695 124.667C56.7032 123.165 54.1379 118.164 55.6397 113.498L69.6989 69.8149L86.597 75.2534L72.5378 118.937C71.036 123.603 66.0357 126.168 61.3695 124.667Z" fill="#DE7552" />
                            <Path d="M24.9109 102.768C22.6733 98.4068 24.3951 93.0571 28.7566 90.8195L69.5868 69.8721L77.6899 85.6665L36.8597 106.614C32.4982 108.852 27.1485 107.13 24.9109 102.768Z" fill="#DE7552" />
                            <Path d="M14.6167 61.4998C16.1185 56.8336 21.1187 54.2682 25.785 55.7701L69.4683 69.8293L64.0298 86.7274L20.3464 72.6682C15.6801 71.1663 13.1148 66.1661 14.6167 61.4998Z" fill="#DE7552" />
                            <Path d="M36.5149 25.0457C40.8764 22.8081 46.2261 24.5298 48.4637 28.8913L69.4111 69.7215L53.6167 77.8246L32.6693 36.9944C30.4317 32.6329 32.1534 27.2833 36.5149 25.0457Z" fill="#DE7552" />
                            <Path d="M70.0019 70.1576C68.7495 74.0491 66.0996 66.3096 60.3532 64.4602C54.6069 62.6108 47.9402 67.3517 49.1927 63.4602C50.4451 59.5687 56.1188 57.9133 61.8651 59.7627C67.6114 61.6122 71.2544 66.2661 70.0019 70.1576Z" fill="#1C1C1C" />
                            <Path d="M91.5337 77.0873C90.2812 80.9787 87.6313 73.2393 81.885 71.3899C76.1387 69.5404 69.472 74.2814 70.7244 70.3899C71.9769 66.4984 77.6505 64.843 83.3968 66.6924C89.1431 68.5418 92.7861 73.1958 91.5337 77.0873Z" fill="#1C1C1C" />
                        </Svg>

                    </View>
                    <View style={styles.blueLogo}>
                        <Svg width="110" height="110" viewBox="0 0 110 110" fill="none" >
                            <Path d="M46.1681 0.404297C51.0235 0.404297 54.9595 4.34031 54.9595 9.19562L54.9595 54.6487H37.3768L37.3768 9.19562C37.3768 4.3403 41.3128 0.404297 46.1681 0.404297Z" fill="#007AFF" />
                            <Path d="M87.1889 9.98867C90.6221 13.4219 90.6221 18.9883 87.1889 22.4215L55.0487 54.5616L42.6159 42.1288L74.7561 9.98866C78.1893 6.55544 83.7556 6.55544 87.1889 9.98867Z" fill="#007AFF" />
                            <Path d="M109.417 45.7653C109.417 50.6206 105.481 54.5566 100.626 54.5566L55.1731 54.5566L55.1731 36.974L100.626 36.974C105.481 36.974 109.417 40.91 109.417 45.7653Z" fill="#007AFF" />
                            <Path d="M99.8321 86.7895C96.3989 90.2227 90.8325 90.2227 87.3993 86.7895L55.2592 54.6493L67.692 42.2165L99.8321 74.3566C103.265 77.7899 103.265 83.3562 99.8321 86.7895Z" fill="#007AFF" />
                            <Path d="M64.053 109.016C59.1977 109.016 55.2617 105.08 55.2617 100.224L55.2617 54.7713L72.8444 54.7713L72.8444 100.224C72.8444 105.08 68.9084 109.016 64.053 109.016Z" fill="#007AFF" />
                            <Path d="M23.0338 99.4332C19.6006 96 19.6006 90.4336 23.0338 87.0004L55.1739 54.8602L67.6067 67.2931L35.4666 99.4332C32.0334 102.866 26.467 102.866 23.0338 99.4332Z" fill="#007AFF" />
                            <Path d="M0.804687 63.6468C0.804687 58.7915 4.7407 54.8555 9.59602 54.8555L55.049 54.8555L55.049 72.4381L9.59601 72.4381C4.7407 72.4381 0.804687 68.5021 0.804687 63.6468Z" fill="#007AFF" />
                            <Path d="M10.3895 22.6324C13.8228 19.1992 19.3891 19.1992 22.8224 22.6324L54.9625 54.7726L42.5297 67.2054L10.3895 35.0652C6.95632 31.632 6.95632 26.0657 10.3895 22.6324Z" fill="#007AFF" />
                            <Path d="M55.6518 55.0035C55.6518 59.0526 50.8048 52.5596 44.8256 52.5596C38.8465 52.5596 33.9995 59.0526 33.9995 55.0035C33.9995 50.9544 38.8465 47.6719 44.8256 47.6719C50.8048 47.6719 55.6518 50.9544 55.6518 55.0035Z" fill="#1C1C1C" />
                            <Path d="M78.0561 55.0035C78.0561 59.0526 73.2091 52.5596 67.2299 52.5596C61.2508 52.5596 56.4038 59.0526 56.4038 55.0035C56.4038 50.9544 61.2508 47.6719 67.2299 47.6719C73.2091 47.6719 78.0561 50.9544 78.0561 55.0035Z" fill="#1C1C1C" />
                        </Svg>

                    </View>
                    <View style={styles.yellowLogo}>
                        <Svg width="100" height="123" viewBox="0 0 100 123" fill="none" >
                            <Path d="M45.3433 9.05989C50.1561 8.41844 54.5776 11.7999 55.2191 16.6127L61.224 61.6673L43.7955 63.9902L37.7905 18.9356C37.1491 14.1229 40.5306 9.70134 45.3433 9.05989Z" fill="#FFCC00" />
                            <Path d="M87.2702 13.1418C91.1269 16.0913 91.8623 21.6089 88.9128 25.4656L61.3005 61.5702L47.3341 50.8889L74.9464 14.7843C77.8959 10.9276 83.4135 10.1922 87.2702 13.1418Z" fill="#FFCC00" />
                            <Path d="M114.03 45.6724C114.672 50.4852 111.29 54.9067 106.478 55.5482L61.423 61.5531L59.1001 44.1246L104.155 38.1196C108.967 37.4782 113.389 40.8597 114.03 45.6724Z" fill="#FFCC00" />
                            <Path d="M109.949 87.5988C106.999 91.4556 101.482 92.1909 97.6252 89.2414L61.5206 61.6291L72.2019 47.6627L108.307 75.275C112.163 78.2246 112.899 83.7421 109.949 87.5988Z" fill="#FFCC00" />
                            <Path d="M77.4203 114.358C72.6076 115 68.1861 111.618 67.5446 106.805L61.5396 61.7507L78.9682 59.4277L84.9731 104.482C85.6146 109.295 82.2331 113.717 77.4203 114.358Z" fill="#FFCC00" />
                            <Path d="M35.4939 110.278C31.6372 107.329 30.9018 101.811 33.8514 97.9543L61.4637 61.8497L75.43 72.531L47.8178 108.636C44.8682 112.492 39.3506 113.228 35.4939 110.278Z" fill="#FFCC00" />
                            <Path d="M8.73225 77.7436C8.0908 72.9308 11.4723 68.5093 16.2851 67.8678L61.3397 61.8629L63.6626 79.2914L18.608 85.2964C13.7952 85.9378 9.37371 82.5563 8.73225 77.7436Z" fill="#FFCC00" />
                            <Path d="M12.8151 35.823C15.7647 31.9663 21.2822 31.2309 25.139 34.1805L61.2435 61.7928L50.5622 75.7591L14.4577 48.1469C10.6009 45.1973 9.86556 39.6797 12.8151 35.823Z" fill="#FFCC00" />
                            <Path d="M61.957 61.9322C62.4919 65.9458 56.8296 60.1501 50.9029 60.94C44.9762 61.7299 41.0294 68.8064 40.4945 64.7927C39.9595 60.7791 44.3304 56.885 50.2571 56.0951C56.1838 55.3052 61.422 57.9185 61.957 61.9322Z" fill="#1C1C1C" />
                            <Path d="M84.1655 58.9732C84.7004 62.9868 79.0381 57.1911 73.1114 57.981C67.1847 58.7709 63.2379 65.8474 62.703 61.8338C62.168 57.8201 66.5389 53.926 72.4656 53.1361C78.3923 52.3462 83.6305 54.9596 84.1655 58.9732Z" fill="#1C1C1C" />
                        </Svg>
                    </View>
                </View>
            </View>
            <MyButton2 onPress={handleSubmit} style={{ backgroundColor: "white" }}>
                <Text>
                    Continue
                </Text>
            </MyButton2>
        </View>)
}

const styles = StyleSheet.create({
    screenContainer: {
        backgroundColor: "rgb(17, 21, 28)",
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
    },
    textContainer: {
        alignItems: "center",
        justifyContent: "center",
        rowGap: 8,
    },
    circleContainer: {
        backgroundColor: "rgba(193, 241, 201, 1)",
        borderRadius: 999
    },
    slotlyFourLogos: {
        flexDirection: "row",
        paddingVertical: 20,
        columnGap: -56,
    },
    greenLogo: {
        position: "relative",
        flexShrink: 0,
        height: 139,
        width: 139,
        transform: "rotateZ(-18.13deg)",
        borderStyle: "solid",
        backgroundColor: "rgba(255, 255, 255, 1)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        columnGap: 8.767641067504883,
        paddingHorizontal: 14.904991149902344,
        paddingVertical: 14.02822494506836,
        borderWidth: 6.094229698181152,
        borderColor: "rgba(52, 199, 89, 1)",
        borderRadius: 69.70274353027344
    },
    group12: {
        position: "relative",
        height: 108,
        width: 108
    },
    redLogo: {
        position: "relative",
        flexShrink: 0,
        height: 141,
        width: 141,
        transform: "rotateZ(17.84deg)",
        borderStyle: "solid",
        backgroundColor: "rgba(255, 255, 255, 1)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        columnGap: 8.867923736572266,
        paddingHorizontal: 15.075471878051758,
        paddingVertical: 14.188678741455078,
        borderWidth: 6.163934707641602,
        borderColor: "rgba(222, 117, 82, 1)",
        borderRadius: 70.5,
        marginLeft: -50
    },
    blueLogo: {
        position: "relative",
        flexShrink: 0,
        height: 140,
        width: 140,
        borderStyle: "solid",
        backgroundColor: "rgba(255, 255, 255, 1)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        columnGap: 8.783467292785645,
        paddingHorizontal: 14.93189525604248,
        paddingVertical: 14.053546905517578,
        borderWidth: 6.105230331420898,
        borderColor: "rgba(0, 122, 255, 1)",
        borderRadius: 69.82855987548828,
        marginLeft: -50
    },
    yellowLogo: {
        position: "relative",
        flexShrink: 0,
        height: 140,
        width: 140,
        transform: "rotateZ(-7.59deg)",
        borderStyle: "solid",
        backgroundColor: "rgba(255, 255, 255, 1)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        columnGap: 8.783467292785645,
        paddingHorizontal: 14.931897163391113,
        paddingVertical: 14.053547859191895,
        borderWidth: 6.105230808258057,
        borderColor: "rgba(255, 204, 0, 1)",
        borderRadius: 69.82856750488281,
        marginLeft: -50
    },
    allDone: {
        textAlign: "center",
        color: "rgba(255, 255, 255, 1)",
        fontSize: 56,
        fontWeight: 700
    },
    welcomeaboardTimetoslotthingsin: {
        textAlign: "center",
        color: "rgba(162, 162, 162, 1)",
        fontSize: 24,
        fontWeight: 400
    }
});