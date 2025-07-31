import { Link } from "expo-router";
import { useState } from 'react';
import { Dimensions, StyleSheet, Text, TextInput, View } from 'react-native';
import { Circle, Path, Svg } from 'react-native-svg';

const { width, height } = Dimensions.get('window');

export default function OnboardingStepThree({ }) {
    const [password, setPassword] = useState('');

    return (
        <View style={styles.screenContainer}>
            <View style={styles.frame164}>
                <Link href="onboarding/onboardingStepTwo" style={styles.backArrow}>
                    <Svg style={styles.vector} width="40" height="40" viewBox="0 0 40 40" fill="none" >
                        <Path d="M20 0.5C16.1433 0.5 12.3731 1.64366 9.16639 3.78634C5.95963 5.92903 3.46027 8.97451 1.98436 12.5377C0.508449 16.1008 0.122284 20.0216 0.874696 23.8043C1.62711 27.5869 3.4843 31.0615 6.21143 33.7886C8.93855 36.5157 12.4131 38.3729 16.1957 39.1253C19.9784 39.8777 23.8992 39.4916 27.4623 38.0156C31.0255 36.5397 34.071 34.0404 36.2137 30.8336C38.3564 27.6269 39.5 23.8567 39.5 20C39.4945 14.83 37.4383 9.87322 33.7826 6.21745C30.1268 2.56167 25.1701 0.50546 20 0.5ZM27.5 21.5H16.1206L19.5613 24.9387C19.7006 25.0781 19.8112 25.2436 19.8866 25.4257C19.962 25.6077 20.0008 25.8029 20.0008 26C20.0008 26.1971 19.962 26.3923 19.8866 26.5743C19.8112 26.7564 19.7006 26.9219 19.5613 27.0613C19.4219 27.2006 19.2564 27.3112 19.0744 27.3866C18.8923 27.462 18.6971 27.5008 18.5 27.5008C18.3029 27.5008 18.1078 27.462 17.9257 27.3866C17.7436 27.3112 17.5781 27.2006 17.4388 27.0613L11.4388 21.0613C11.2993 20.9219 11.1887 20.7565 11.1132 20.5744C11.0377 20.3923 10.9988 20.1971 10.9988 20C10.9988 19.8029 11.0377 19.6077 11.1132 19.4256C11.1887 19.2435 11.2993 19.0781 11.4388 18.9387L17.4388 12.9387C17.7202 12.6573 18.102 12.4992 18.5 12.4992C18.8981 12.4992 19.2798 12.6573 19.5613 12.9387C19.8427 13.2202 20.0008 13.602 20.0008 14C20.0008 14.398 19.8427 14.7798 19.5613 15.0613L16.1206 18.5H27.5C27.8978 18.5 28.2794 18.658 28.5607 18.9393C28.842 19.2206 29 19.6022 29 20C29 20.3978 28.842 20.7794 28.5607 21.0607C28.2794 21.342 27.8978 21.5 27.5 21.5Z" fill="white" />
                    </Svg>
                </Link>
                <View style={styles.contentContainer}>
                    <View style={styles.inputContainer}>
                        <View style={styles.topText}>
                            <View style={styles.steps}>
                                <Text style={styles.step3of4}>
                                    {`Step 3 of 4`}
                                </Text>
                                <View style={styles.slotlyFourLogos}>
                                    <View style={styles.frame137}>
                                        <View style={styles._frame137}>
                                            <Svg style={styles.group12} width="42" height="42" viewBox="0 0 42 42" fill="none" >
                                                <Path d="M17.7712 0.804688C19.5871 0.804688 21.0591 2.27671 21.0591 4.09255L21.0591 21.0915H14.4834L14.4834 4.09255C14.4834 2.27672 15.9554 0.804688 17.7712 0.804688Z" fill="#34C759" />
                                                <Path d="M33.1117 4.38802C34.3956 5.67201 34.3956 7.75377 33.1117 9.03776L21.0916 21.0578L16.4418 16.4081L28.4619 4.38802C29.7459 3.10403 31.8277 3.10403 33.1117 4.38802Z" fill="#34C759" />
                                                <Path d="M41.4248 17.7688C41.4248 19.5846 39.9528 21.0566 38.1369 21.0566L21.138 21.0566V14.4809L38.1369 14.4809C39.9528 14.4809 41.4248 15.9529 41.4248 17.7688Z" fill="#34C759" />
                                                <Path d="M37.8405 33.1087C36.5565 34.3927 34.4747 34.3927 33.1908 33.1087L21.1707 21.0886L25.8204 16.4389L37.8405 28.459C39.1245 29.743 39.1245 31.8247 37.8405 33.1087Z" fill="#34C759" />
                                                <Path d="M24.4597 41.4238C22.6439 41.4238 21.1719 39.9518 21.1719 38.136L21.1719 21.137H27.7476L27.7476 38.136C27.7476 39.9518 26.2756 41.4238 24.4597 41.4238Z" fill="#34C759" />
                                                <Path d="M9.11882 37.8405C7.83483 36.5565 7.83483 34.4747 9.11882 33.1908L21.1389 21.1707L25.7886 25.8204L13.7686 37.8405C12.4846 39.1245 10.4028 39.1245 9.11882 37.8405Z" fill="#34C759" />
                                                <Path d="M0.805176 24.4558C0.805176 22.64 2.2772 21.168 4.09304 21.168L21.092 21.168V27.7437L4.09304 27.7437C2.27721 27.7437 0.805176 26.2717 0.805176 24.4558Z" fill="#34C759" />
                                                <Path d="M4.38948 9.11589C5.67347 7.8319 7.75524 7.8319 9.03923 9.11589L21.0593 21.136L16.4096 25.7857L4.38949 13.7656C3.10549 12.4816 3.10549 10.3999 4.38948 9.11589Z" fill="#34C759" />
                                                <Circle cx="16.9839" cy="20.6724" r="4.04545" fill="white" />
                                                <Circle cx="26.1397" cy="20.6724" r="4.04545" fill="white" />
                                                <Circle cx="27.8714" cy="20.7806" r="2.66148" fill="#1C1C1C" />
                                                <Circle cx="18.7157" cy="20.7806" r="2.66148" fill="#1C1C1C" />
                                            </Svg>

                                        </View>
                                    </View>
                                    <View style={styles.frame138}>
                                        <View style={styles.__frame137}>
                                            <Svg style={styles.Group12} width="41" height="42" viewBox="0 0 41 42" fill="none" >
                                                <Path d="M17.0012 0.804688C18.817 0.804688 20.2891 2.27671 20.2891 4.09255L20.2891 21.0915H13.7133L13.7133 4.09255C13.7133 2.27672 15.1854 0.804688 17.0012 0.804688Z" fill="#DE7552" />
                                                <Path d="M32.3421 4.38802C33.6261 5.67201 33.6261 7.75377 32.3421 9.03776L20.322 21.0578L15.6723 16.4081L27.6924 4.38802C28.9764 3.10403 31.0581 3.10403 32.3421 4.38802Z" fill="#DE7552" />
                                                <Path d="M40.6558 17.7688C40.6558 19.5846 39.1837 21.0566 37.3679 21.0566L20.3689 21.0566V14.4809L37.3679 14.4809C39.1837 14.4809 40.6558 15.9529 40.6558 17.7688Z" fill="#DE7552" />
                                                <Path d="M37.071 33.1087C35.787 34.3927 33.7052 34.3927 32.4212 33.1087L20.4011 21.0886L25.0509 16.4389L37.071 28.459C38.355 29.743 38.355 31.8247 37.071 33.1087Z" fill="#DE7552" />
                                                <Path d="M23.6897 41.4238C21.8739 41.4238 20.4019 39.9518 20.4019 38.136L20.4019 21.137H26.9776L26.9776 38.136C26.9776 39.9518 25.5056 41.4238 23.6897 41.4238Z" fill="#DE7552" />
                                                <Path d="M8.34929 37.8405C7.06529 36.5565 7.06529 34.4747 8.34929 33.1908L20.3694 21.1707L25.0191 25.8204L12.999 37.8405C11.715 39.1245 9.63328 39.1245 8.34929 37.8405Z" fill="#DE7552" />
                                                <Path d="M0.0351562 24.4558C0.0351562 22.64 1.50718 21.168 3.32302 21.168L20.322 21.168V27.7437L3.32302 27.7437C1.50719 27.7437 0.0351562 26.2717 0.0351562 24.4558Z" fill="#DE7552" />
                                                <Path d="M3.61946 9.11589C4.90346 7.8319 6.98522 7.8319 8.26921 9.11589L20.2893 21.136L15.6395 25.7857L3.61947 13.7656C2.33548 12.4816 2.33547 10.3999 3.61946 9.11589Z" fill="#DE7552" />
                                                <Circle cx="16.2139" cy="20.6724" r="4.04545" fill="white" />
                                                <Circle cx="25.3697" cy="20.6724" r="4.04545" fill="white" />
                                                <Circle cx="27.1019" cy="20.7806" r="2.66148" fill="#1C1C1C" />
                                                <Circle cx="17.9457" cy="20.7806" r="2.66148" fill="#1C1C1C" />
                                            </Svg>

                                        </View>
                                    </View>
                                    <View style={styles.frame139}>
                                        <View style={styles.___frame137}>
                                            <Svg style={styles.Group12} width="41" height="42" viewBox="0 0 41 42" fill="none" >
                                                <Path d="M17.2317 0.806641C19.0475 0.806641 20.5195 2.27867 20.5195 4.09451L20.5195 21.0935H13.9438L13.9438 4.09451C13.9438 2.27867 15.4158 0.806641 17.2317 0.806641Z" fill="#007AFF" />
                                                <Path d="M32.5726 4.38997C33.8566 5.67396 33.8566 7.75572 32.5726 9.03972L20.5525 21.0598L15.9028 16.41L27.9228 4.38997C29.2068 3.10598 31.2886 3.10598 32.5726 4.38997Z" fill="#007AFF" />
                                                <Path d="M40.8857 17.7707C40.8857 19.5866 39.4137 21.0586 37.5979 21.0586L20.5989 21.0586V14.4829L37.5979 14.4829C39.4137 14.4829 40.8857 15.9549 40.8857 17.7707Z" fill="#007AFF" />
                                                <Path d="M37.3014 33.1107C36.0174 34.3947 33.9357 34.3947 32.6517 33.1107L20.6316 21.0906L25.2814 16.4409L37.3014 28.4609C38.5854 29.7449 38.5854 31.8267 37.3014 33.1107Z" fill="#007AFF" />
                                                <Path d="M23.9202 41.4258C22.1044 41.4258 20.6323 39.9538 20.6323 38.1379L20.6323 21.139H27.2081L27.2081 38.1379C27.2081 39.9538 25.736 41.4258 23.9202 41.4258Z" fill="#007AFF" />
                                                <Path d="M8.57975 37.8424C7.29576 36.5585 7.29576 34.4767 8.57975 33.1927L20.5998 21.1726L25.2496 25.8224L13.2295 37.8424C11.9455 39.1264 9.86375 39.1264 8.57975 37.8424Z" fill="#007AFF" />
                                                <Path d="M0.265625 24.4578C0.265625 22.6419 1.73765 21.1699 3.55349 21.1699L20.5524 21.1699V27.7457L3.55349 27.7457C1.73765 27.7457 0.265625 26.2736 0.265625 24.4578Z" fill="#007AFF" />
                                                <Path d="M3.85042 9.11784C5.13441 7.83385 7.21617 7.83385 8.50016 9.11784L20.5202 21.1379L15.8705 25.7877L3.85042 13.7676C2.56643 12.4836 2.56643 10.4018 3.85042 9.11784Z" fill="#007AFF" />
                                                <Circle cx="16.4444" cy="20.6744" r="4.04545" fill="white" />
                                                <Circle cx="25.6001" cy="20.6744" r="4.04545" fill="white" />
                                                <Circle cx="27.3324" cy="20.7826" r="2.66148" fill="#1C1C1C" />
                                                <Circle cx="18.1761" cy="20.7826" r="2.66148" fill="#1C1C1C" />
                                            </Svg>

                                        </View>
                                    </View>
                                    <View style={styles.frame140}>
                                        <View style={styles.____frame137}>
                                            <Svg style={styles.Group12} width="42" height="42" viewBox="0 0 42 42" fill="none" >
                                                <Path d="M17.4612 0.804688C19.277 0.804688 20.749 2.27671 20.749 4.09255L20.749 21.0915H14.1733L14.1733 4.09255C14.1733 2.27672 15.6453 0.804688 17.4612 0.804688Z" fill="#FFCC00" />
                                                <Path d="M32.8026 4.38802C34.0866 5.67201 34.0866 7.75377 32.8026 9.03776L20.7825 21.0578L16.1328 16.4081L28.1528 4.38802C29.4368 3.10403 31.5186 3.10403 32.8026 4.38802Z" fill="#FFCC00" />
                                                <Path d="M41.1157 17.7688C41.1157 19.5846 39.6437 21.0566 37.8279 21.0566L20.8289 21.0566V14.4809L37.8279 14.4809C39.6437 14.4809 41.1157 15.9529 41.1157 17.7688Z" fill="#FFCC00" />
                                                <Path d="M37.5314 33.1087C36.2474 34.3927 34.1657 34.3927 32.8817 33.1087L20.8616 21.0886L25.5113 16.4389L37.5314 28.459C38.8154 29.743 38.8154 31.8247 37.5314 33.1087Z" fill="#FFCC00" />
                                                <Path d="M24.1497 41.4238C22.3338 41.4238 20.8618 39.9518 20.8618 38.136L20.8618 21.137H27.4375L27.4375 38.136C27.4375 39.9518 25.9655 41.4238 24.1497 41.4238Z" fill="#FFCC00" />
                                                <Path d="M8.80925 37.8405C7.52526 36.5565 7.52526 34.4747 8.80925 33.1908L20.8293 21.1707L25.4791 25.8204L13.459 37.8405C12.175 39.1245 10.0932 39.1245 8.80925 37.8405Z" fill="#FFCC00" />
                                                <Path d="M0.496094 24.4558C0.496094 22.64 1.96812 21.168 3.78396 21.168L20.7829 21.168V27.7437L3.78396 27.7437C1.96812 27.7437 0.496094 26.2717 0.496094 24.4558Z" fill="#FFCC00" />
                                                <Path d="M4.0804 9.11589C5.36439 7.8319 7.44615 7.8319 8.73014 9.11589L20.7502 21.136L16.1005 25.7857L4.0804 13.7656C2.79641 12.4816 2.79641 10.3999 4.0804 9.11589Z" fill="#FFCC00" />
                                                <Circle cx="16.6744" cy="20.6724" r="4.04545" fill="white" />
                                                <Circle cx="25.8301" cy="20.6724" r="4.04545" fill="white" />
                                                <Circle cx="27.5619" cy="20.7806" r="2.66148" fill="#1C1C1C" />
                                                <Circle cx="18.4061" cy="20.7806" r="2.66148" fill="#1C1C1C" />
                                            </Svg>

                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.stepsText}>
                                <Text style={styles.createYourPassword}>
                                    {`Create Your Password`}
                                </Text>
                                <Text style={styles.protectyouraccountsoonlyyoucanbookyourslots}>
                                    {`Protect your account so only you can book your slots`}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.inputPassword1}>
                            <View style={styles.inputPassword2}>
                                <TextInput
                                    style={styles.password}
                                    placeholder="Password*"
                                    value={password}
                                    onChangeText={(text) => setPassword(text)}
                                />
                            </View>
                        </View>
                    </View>
                    <Link href='onboarding/onboardingStepFour' style={styles.continue}>
                        <Text style={styles.continueButton}>
                            {`Continue`}
                        </Text>
                    </Link>
                </View>
            </View>
        </View>)
}

const styles = StyleSheet.create({
    screenContainer: {
        position: "relative",
        flexShrink: 0,
        height: height,
        width: width,
        backgroundColor: "rgba(33, 33, 33, 1)",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        rowGap: 0
    },
    frame164: {
        position: "absolute",
        flexShrink: 0,
        top: 41,
        left: 16,
        width: 371,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        rowGap: 24,
        width: '95%',
        height: '90%',
    },
    backArrow: {
        position: "relative",
        flexShrink: 0,
        height: '10%',
        width: 48,
        paddingTop: 20,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        rowGap: 0,
    },
    vector: {
        position: "absolute",
        flexShrink: 0,
        top: 5,
        right: 5,
        bottom: 4,
        left: 4,
        overflow: "visible"
    },
    contentContainer: {
        position: "relative",
        alignSelf: "stretch",
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        height: "90%",
        borderWidth: 2,
        borderColor: 'orange'
    },
    inputContainer: {
        position: "relative",
        alignSelf: "stretch",
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        rowGap: 28,
        height: "90%",
        borderWidth: 2,
        borderColor: 'green'
    },
    topText: {
        position: "relative",
        alignSelf: "stretch",
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        rowGap: 16
    },
    steps: {
        position: "relative",
        alignSelf: "stretch",
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        rowGap: 16
    },
    step3of4: {
        position: "relative",
        alignSelf: "stretch",
        flexShrink: 0,
        textAlign: "left",
        color: "rgba(117, 117, 117, 1)",
        fontFamily: "Urbanist",
        fontSize: 16,
        fontWeight: 500
    },
    slotlyFourLogos: {
        position: "relative",
        alignSelf: "stretch",
        flexShrink: 0,
        display: "flex",
        flexDirection: 'row',
        alignItems: "center",
        columnGap: 54
    },
    frame137: {
        position: "relative",
        flexShrink: 0,
        shadowColor: "rgba(0, 0, 0, 0.15)",
        shadowOffset: {
            width: 1.2362204790115356,
            height: 1.2362204790115356
        },
        shadowRadius: 1.2362204790115356,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        columnGap: 7.703413963317871
    },
    _frame137: {
        position: "relative",
        flexShrink: 0,
        height: 52,
        width: 52,
        borderStyle: "solid",
        backgroundColor: "rgba(255, 255, 255, 1)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        columnGap: 3.2849252223968506,
        paddingHorizontal: 5.584373474121094,
        paddingVertical: 5.255879878997803,
        borderWidth: 2.4724409580230713,
        borderColor: "rgba(52, 199, 89, 1)",
        borderRadius: 26.115154266357422
    },
    group12: {
        position: "relative",
        flexShrink: 0,
        height: 41,
        width: 41
    },
    frame138: {
        position: "relative",
        flexShrink: 0,
        shadowColor: "rgba(0, 0, 0, 0.15)",
        shadowOffset: {
            width: 1.2362204790115356,
            height: 1.2362204790115356
        },
        shadowRadius: 1.2362204790115356,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        columnGap: 7.703413963317871
    },
    __frame137: {
        position: "relative",
        flexShrink: 0,
        height: 52,
        width: 52,
        borderStyle: "solid",
        backgroundColor: "rgba(255, 255, 255, 1)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        columnGap: 3.2849252223968506,
        paddingHorizontal: 5.584373474121094,
        paddingVertical: 5.255879878997803,
        borderWidth: 2.4724409580230713,
        borderColor: "rgba(222, 117, 82, 1)",
        borderRadius: 26.115154266357422
    },
    _group12: {
        position: "relative",
        flexShrink: 0,
        height: 41,
        width: 41
    },
    frame139: {
        position: "relative",
        flexShrink: 0,
        shadowColor: "rgba(0, 0, 0, 0.15)",
        shadowOffset: {
            width: 1.2362204790115356,
            height: 1.2362204790115356
        },
        shadowRadius: 1.2362204790115356,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        columnGap: 7.703413963317871
    },
    ___frame137: {
        position: "relative",
        flexShrink: 0,
        height: 52,
        width: 52,
        borderStyle: "solid",
        backgroundColor: "rgba(255, 255, 255, 1)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        columnGap: 3.2849252223968506,
        paddingHorizontal: 5.584373474121094,
        paddingVertical: 5.255879878997803,
        borderWidth: 2.4724409580230713,
        borderColor: "rgba(0, 122, 255, 1)",
        borderRadius: 26.115154266357422
    },
    __group12: {
        position: "relative",
        flexShrink: 0,
        height: 41,
        width: 41
    },
    frame140: {
        position: "relative",
        flexShrink: 0,
        shadowColor: "rgba(0, 0, 0, 0.15)",
        shadowOffset: {
            width: 1.2362204790115356,
            height: 1.2362204790115356
        },
        shadowRadius: 1.2362204790115356,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        columnGap: 7.703413963317871
    },
    ____frame137: {
        position: "relative",
        flexShrink: 0,
        height: 52,
        width: 52,
        borderStyle: "solid",
        backgroundColor: "rgba(255, 255, 255, 1)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        columnGap: 3.2849252223968506,
        paddingHorizontal: 5.584373474121094,
        paddingVertical: 5.255879878997803,
        borderWidth: 2.4724409580230713,
        borderColor: "rgba(255, 204, 0, 1)",
        borderRadius: 26.115154266357422
    },
    ___group12: {
        position: "relative",
        flexShrink: 0,
        height: 41,
        width: 41
    },
    stepsText: {
        position: "relative",
        alignSelf: "stretch",
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        rowGap: 8
    },
    createYourPassword: {
        position: "relative",
        alignSelf: "stretch",
        flexShrink: 0,
        textAlign: "left",
        color: "rgba(255, 255, 255, 1)",
        fontFamily: "Urbanist",
        fontSize: 36,
        fontWeight: 700
    },
    protectyouraccountsoonlyyoucanbookyourslots: {
        position: "relative",
        alignSelf: "stretch",
        flexShrink: 0,
        textAlign: "left",
        color: "rgba(117, 117, 117, 1)",
        fontFamily: "Urbanist",
        fontSize: 18,
        fontWeight: 500
    },
    inputPassword1: {
        position: "relative",
        alignSelf: "stretch",
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        rowGap: 24,
        paddingTop: 100
    },
    inputPassword2: {
        position: "relative",
        alignSelf: "stretch",
        flexShrink: 0,
        height: 60,
        backgroundColor: "rgba(50, 50, 50, 1)",
        display: "flex",
        alignItems: "center",
        columnGap: 10,
        paddingHorizontal: 24,
        paddingVertical: 10,
        borderRadius: 16
    },
    password: {
        position: "relative",
        flexShrink: 0,
        textAlign: "left",
        color: "rgba(117, 117, 117, 1)",
        fontFamily: "Urbanist",
        fontSize: 16,
        fontWeight: 500
    },
    continue: {
        position: "relative",
        alignSelf: "stretch",
        flexShrink: 0,
        backgroundColor: "rgba(255, 255, 255, 1)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        columnGap: 10,
        paddingHorizontal: 10,
        paddingVertical: 16,
        borderRadius: 32,
        height: "10%",
        borderWidth: 2,
        borderColor: 'brown'
    },
    continueButton: {
        position: "relative",
        flexShrink: 0,
        textAlign: "left",
        color: "rgba(28, 28, 28, 1)",
        fontFamily: "Urbanist",
        fontSize: 18,
        fontWeight: 500
    },
});