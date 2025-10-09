import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { Circle, Path, Svg } from 'react-native-svg';

import ContinueButton from "../../components/ContinueButton";

const { width, height } = Dimensions.get('window');

export default function OnboardingDefault({ }) {

    return (
        <View style={styles.screenContainer}>
            <View style={styles.topTextContainer}>
                <View style={styles.frame121}>
                    <Svg style={styles.group12} width="31" height="32" viewBox="0 0 31 32" fill="none" >
                        <Path d="M12.9147 0.908203C14.2969 0.908203 15.4175 2.02874 15.4175 3.41099L15.4175 16.3509H10.4119L10.4119 3.41099C10.4119 2.02874 11.5324 0.908203 12.9147 0.908203Z" fill="white" />
                        <Path d="M24.5926 3.63651C25.57 4.61391 25.57 6.19859 24.5926 7.17599L15.4426 16.3259L11.9032 12.7864L21.0531 3.63651C22.0305 2.65911 23.6152 2.65911 24.5926 3.63651Z" fill="white" />
                        <Path d="M30.9209 13.8234C30.9209 15.2056 29.8004 16.3262 28.4181 16.3262H15.4782V11.3206L28.4181 11.3206C29.8004 11.3206 30.9209 12.4411 30.9209 13.8234Z" fill="white" />
                        <Path d="M28.1921 25.5017C27.2147 26.4791 25.63 26.4791 24.6526 25.5017L15.5027 16.3518L19.0422 12.8123L28.1921 21.9623C29.1695 22.9397 29.1695 24.5243 28.1921 25.5017Z" fill="white" />
                        <Path d="M18.0062 31.8301C16.624 31.8301 15.5034 30.7095 15.5034 29.3273L15.5034 16.3873H20.509L20.509 29.3273C20.509 30.7095 19.3885 31.8301 18.0062 31.8301Z" fill="white" />
                        <Path d="M6.32882 29.1018C5.35142 28.1244 5.35142 26.5397 6.32882 25.5623L15.4788 16.4124L19.0182 19.9518L9.8683 29.1018C8.8909 30.0792 7.30622 30.0792 6.32882 29.1018Z" fill="white" />
                        <Path d="M0 18.9129C0 17.5307 1.12054 16.4102 2.50279 16.4102L15.4427 16.4102V21.4157L2.50279 21.4157C1.12054 21.4157 0 20.2952 0 18.9129Z" fill="white" />
                        <Path d="M2.7288 7.23654C3.7062 6.25914 5.29088 6.25914 6.26828 7.23654L15.4182 16.3865L11.8787 19.9259L2.7288 10.776C1.75139 9.79862 1.75139 8.21394 2.7288 7.23654Z" fill="white" />
                        <Circle cx="12.3153" cy="16.0346" r="3.07948" fill="black" />
                        <Circle cx="19.285" cy="16.0346" r="3.07948" fill="black" />
                        <Circle cx="20.6627" cy="16.1158" r="2.02597" fill="white" />
                        <Circle cx="13.693" cy="16.1158" r="2.02597" fill="white" />
                    </Svg>
                    <View style={styles.frame119}>
                        <Text style={styles.slotly}>
                            {`S`}<Text style={{ "textAlign": "left", "color": "rgba(255, 255, 255, 1)", "fontFamily": "Poppins", "fontSize": 25.264427185058594, "fontWeight": 700, "letterSpacing": "-1.2632213592529298" }}>{`lotly`}</Text>
                        </Text>
                    </View>
                </View>
                <View style={styles.frame141}>
                    <Text style={styles.letsGetYouSlottedIn}>
                        {`Let’s Get You Slotted In!`}
                    </Text>
                    <Text style={styles.slotlymakesiteasytoschedulemeetingswithoutthechaos}>
                        {`Slotly makes it easy to schedule meetings, without the chaos.`}
                    </Text>
                </View>
            </View>
            <View style={styles.slotlyFourLogos}>
                <View style={styles.frame137}>
                    <View style={styles._frame137}>
                        <Svg style={styles._group12} width="98" height="133" viewBox="0 0 98 133" fill="none" >
                            <Path d="M20.6789 0.785156C26.5544 0.785156 31.3174 5.54815 31.3174 11.4236L31.3174 66.4266H10.0405L10.0405 11.4236C10.0405 5.54814 14.8035 0.785156 20.6789 0.785156Z" fill="#34C759" />
                            <Path d="M70.3173 12.3818C74.4719 16.5364 74.4719 23.2722 70.3173 27.4268L31.4243 66.3198L16.3793 51.2748L55.2723 12.3818C59.4269 8.22721 66.1628 8.22721 70.3173 12.3818Z" fill="#34C759" />
                            <Path d="M97.2163 55.678C97.2163 61.5534 92.4533 66.3164 86.5779 66.3164L31.5749 66.3164V45.0395L86.5779 45.0395C92.4533 45.0395 97.2163 49.8025 97.2163 55.678Z" fill="#34C759" />
                            <Path d="M85.6182 105.317C81.4636 109.472 74.7278 109.472 70.5732 105.317L31.6802 66.4243L46.7252 51.3793L85.6182 90.2723C89.7728 94.4269 89.7728 101.163 85.6182 105.317Z" fill="#34C759" />
                            <Path d="M42.3211 132.215C36.4456 132.215 31.6826 127.452 31.6826 121.576L31.6826 66.5734H52.9595L52.9595 121.576C52.9595 127.452 48.1965 132.215 42.3211 132.215Z" fill="#34C759" />
                            <Path d="M-7.31635 120.618C-11.4709 116.464 -11.4709 109.728 -7.31635 105.573L31.5766 66.6802L46.6217 81.7252L7.72867 120.618C3.5741 124.773 -3.16178 124.773 -7.31635 120.618Z" fill="#34C759" />
                            <Path d="M-34.2163 77.3162C-34.2163 71.4407 -29.4533 66.6777 -23.5779 66.6777L31.4251 66.6777V87.9546L-23.5779 87.9546C-29.4533 87.9546 -34.2163 83.1916 -34.2163 77.3162Z" fill="#34C759" />
                            <Path d="M-22.6182 27.6827C-18.4636 23.5281 -11.7278 23.5281 -7.57319 27.6827L31.3198 66.5757L16.2748 81.6207L-22.6182 42.7277C-26.7728 38.5731 -26.7728 31.8372 -22.6182 27.6827Z" fill="#34C759" />
                            <Circle cx="18.1322" cy="65.0741" r="13.0897" fill="white" />
                            <Circle cx="47.7572" cy="65.0741" r="13.0897" fill="white" />
                            <Circle cx="53.3612" cy="65.4222" r="8.61166" fill="#1C1C1C" />
                            <Circle cx="23.7357" cy="65.4222" r="8.61166" fill="#1C1C1C" />
                        </Svg>
                    </View>
                </View>
                <View style={styles.frame138}>
                    <View style={styles.__frame137}>
                        <Svg style={styles.__group12} width="133" height="133" viewBox="0 0 133 133" fill="none" >
                            <Path d="M55.6789 0.785156C61.5544 0.785156 66.3174 5.54815 66.3174 11.4236L66.3174 66.4266H45.0405L45.0405 11.4236C45.0405 5.54814 49.8035 0.785156 55.6789 0.785156Z" fill="#DE7552" />
                            <Path d="M105.317 12.3818C109.472 16.5364 109.472 23.2722 105.317 27.4268L66.4243 66.3198L51.3793 51.2748L90.2723 12.3818C94.4269 8.22721 101.163 8.22721 105.317 12.3818Z" fill="#DE7552" />
                            <Path d="M132.216 55.678C132.216 61.5534 127.453 66.3164 121.578 66.3164L66.5749 66.3164V45.0395L121.578 45.0395C127.453 45.0395 132.216 49.8025 132.216 55.678Z" fill="#DE7552" />
                            <Path d="M120.618 105.317C116.464 109.472 109.728 109.472 105.573 105.317L66.6802 66.4243L81.7252 51.3793L120.618 90.2723C124.773 94.4269 124.773 101.163 120.618 105.317Z" fill="#DE7552" />
                            <Path d="M77.3206 132.215C71.4451 132.215 66.6821 127.452 66.6821 121.576L66.6821 66.5734H87.959L87.959 121.576C87.959 127.452 83.196 132.215 77.3206 132.215Z" fill="#DE7552" />
                            <Path d="M27.6832 120.618C23.5286 116.464 23.5286 109.728 27.6832 105.573L66.5761 66.6802L81.6212 81.7252L42.7282 120.618C38.5736 124.773 31.8377 124.773 27.6832 120.618Z" fill="#DE7552" />
                            <Path d="M0.783203 77.3162C0.783203 71.4407 5.54619 66.6777 11.4216 66.6777L66.4246 66.6777V87.9546L11.4216 87.9546C5.54619 87.9546 0.783203 83.1916 0.783203 77.3162Z" fill="#DE7552" />
                            <Path d="M12.3813 27.6827C16.5359 23.5281 23.2718 23.5281 27.4263 27.6827L66.3193 66.5757L51.2743 81.6207L12.3813 42.7277C8.22672 38.5731 8.22673 31.8372 12.3813 27.6827Z" fill="#DE7552" />
                            <Circle cx="53.1317" cy="65.0741" r="13.0897" fill="white" />
                            <Circle cx="82.7572" cy="65.0741" r="13.0897" fill="white" />
                            <Circle cx="88.3607" cy="65.4222" r="8.61166" fill="#1C1C1C" />
                            <Circle cx="58.7352" cy="65.4222" r="8.61166" fill="#1C1C1C" />
                        </Svg>
                    </View>
                </View>
                <View style={styles.frame139}>
                    <View style={styles.___frame137}>
                        <Svg style={styles.___group12} width="133" height="133" viewBox="0 0 133 133" fill="none" >
                            <Path d="M55.6789 0.785156C61.5544 0.785156 66.3174 5.54815 66.3174 11.4236L66.3174 66.4266H45.0405L45.0405 11.4236C45.0405 5.54814 49.8035 0.785156 55.6789 0.785156Z" fill="#007AFF" />
                            <Path d="M105.317 12.3818C109.472 16.5364 109.472 23.2722 105.317 27.4268L66.4243 66.3198L51.3793 51.2748L90.2723 12.3818C94.4269 8.22721 101.163 8.22721 105.317 12.3818Z" fill="#007AFF" />
                            <Path d="M132.216 55.678C132.216 61.5534 127.453 66.3164 121.578 66.3164L66.5749 66.3164V45.0395L121.578 45.0395C127.453 45.0395 132.216 49.8025 132.216 55.678Z" fill="#007AFF" />
                            <Path d="M120.618 105.317C116.464 109.472 109.728 109.472 105.573 105.317L66.6802 66.4243L81.7252 51.3793L120.618 90.2723C124.773 94.4269 124.773 101.163 120.618 105.317Z" fill="#007AFF" />
                            <Path d="M77.3211 132.215C71.4456 132.215 66.6826 127.452 66.6826 121.576L66.6826 66.5734H87.9595L87.9595 121.576C87.9595 127.452 83.1965 132.215 77.3211 132.215Z" fill="#007AFF" />
                            <Path d="M27.6836 120.618C23.5291 116.464 23.5291 109.728 27.6836 105.573L66.5766 66.6802L81.6217 81.7252L42.7287 120.618C38.5741 124.773 31.8382 124.773 27.6836 120.618Z" fill="#007AFF" />
                            <Path d="M0.783691 77.3162C0.783691 71.4407 5.54668 66.6777 11.4221 66.6777L66.4251 66.6777V87.9546L11.4221 87.9546C5.54668 87.9546 0.783691 83.1916 0.783691 77.3162Z" fill="#007AFF" />
                            <Path d="M12.3818 27.6827C16.5364 23.5281 23.2722 23.5281 27.4268 27.6827L66.3198 66.5757L51.2748 81.6207L12.3818 42.7277C8.22721 38.5731 8.22721 31.8372 12.3818 27.6827Z" fill="#007AFF" />
                            <Circle cx="53.1322" cy="65.0741" r="13.0897" fill="white" />
                            <Circle cx="82.7577" cy="65.0741" r="13.0897" fill="white" />
                            <Circle cx="88.3612" cy="65.4222" r="8.61166" fill="#1C1C1C" />
                            <Circle cx="58.7357" cy="65.4222" r="8.61166" fill="#1C1C1C" />
                        </Svg>
                    </View>
                </View>
                <View style={styles.frame140}>
                    <View style={styles.____frame137}>
                        <Svg style={styles.____group12} width="98" height="133" viewBox="0 0 98 133" fill="none" >
                            <Path d="M55.6789 0.785156C61.5544 0.785156 66.3174 5.54815 66.3174 11.4236L66.3174 66.4266H45.0405L45.0405 11.4236C45.0405 5.54814 49.8035 0.785156 55.6789 0.785156Z" fill="#FFCC00" />
                            <Path d="M105.317 12.3818C109.472 16.5364 109.472 23.2722 105.317 27.4268L66.4243 66.3198L51.3793 51.2748L90.2723 12.3818C94.4269 8.22721 101.163 8.22721 105.317 12.3818Z" fill="#FFCC00" />
                            <Path d="M132.216 55.678C132.216 61.5534 127.453 66.3164 121.578 66.3164L66.5749 66.3164V45.0395L121.578 45.0395C127.453 45.0395 132.216 49.8025 132.216 55.678Z" fill="#FFCC00" />
                            <Path d="M120.618 105.317C116.464 109.472 109.728 109.472 105.573 105.317L66.6802 66.4243L81.7252 51.3793L120.618 90.2723C124.773 94.4269 124.773 101.163 120.618 105.317Z" fill="#FFCC00" />
                            <Path d="M77.3211 132.215C71.4456 132.215 66.6826 127.452 66.6826 121.576L66.6826 66.5734H87.9595L87.9595 121.576C87.9595 127.452 83.1965 132.215 77.3211 132.215Z" fill="#FFCC00" />
                            <Path d="M27.6836 120.618C23.5291 116.464 23.5291 109.728 27.6836 105.573L66.5766 66.6802L81.6217 81.7252L42.7287 120.618C38.5741 124.773 31.8382 124.773 27.6836 120.618Z" fill="#FFCC00" />
                            <Path d="M0.783691 77.3162C0.783691 71.4407 5.54668 66.6777 11.4221 66.6777L66.4251 66.6777V87.9546L11.4221 87.9546C5.54668 87.9546 0.783691 83.1916 0.783691 77.3162Z" fill="#FFCC00" />
                            <Path d="M12.3818 27.6827C16.5364 23.5281 23.2722 23.5281 27.4268 27.6827L66.3198 66.5757L51.2748 81.6207L12.3818 42.7277C8.22721 38.5731 8.22721 31.8372 12.3818 27.6827Z" fill="#FFCC00" />
                            <Circle cx="53.1322" cy="65.0741" r="13.0897" fill="white" />
                            <Circle cx="82.7577" cy="65.0741" r="13.0897" fill="white" />
                            <Circle cx="88.3612" cy="65.4222" r="8.61166" fill="#1C1C1C" />
                            <Circle cx="58.7357" cy="65.4222" r="8.61166" fill="#1C1C1C" />
                        </Svg>
                    </View>
                </View>
            </View>
            <View style={styles.createAccountLogin}>
                <ContinueButton nextScreen="/(onboarding)/OnboardingStepOneScreen" text="Continue" oppositeColours={false}></ContinueButton>
                <ContinueButton nextScreen="/(onboarding)/Login" text="Login" oppositeColours={true}></ContinueButton>
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
        alignItems: "center",
        rowGap: 0,
        columnGap: 0
    },
    slotlyMascot: {
        position: "absolute",
        flexShrink: 0,
        width: width,
        height: '10%'
    },
    topTextContainer: {
        flexShrink: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        rowGap: '0%',
        height: '50%',
    },
    frame121: {
        position: "relative",
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        columnGap: 8,
    },
    group12: {
        position: "relative",
        flexShrink: 0,
        height: 31,
        width: 31
    },
    frame119: {
        position: "relative",
        flexShrink: 0,
        height: 35,
        display: "flex",
        alignItems: "flex-start",
        columnGap: 8.694072723388672
    },
    slotly: {
        position: "relative",
        flexShrink: 0,
        textAlign: "left",
        color: "rgba(255, 255, 255, 1)",
        fontFamily: "Poppins",
        fontSize: 25.264427185058594,
        fontWeight: 700,
        letterSpacing: "-2.5264427185058596"
    },
    frame141: {
        position: "relative",
        alignSelf: "stretch",
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        rowGap: 12,
    },
    letsGetYouSlottedIn: {
        position: "relative",
        alignSelf: "stretch",
        flexShrink: 0,
        textAlign: "left",
        color: "rgba(255, 255, 255, 1)",
        fontFamily: "Urbanist",
        fontSize: 55,
        fontWeight: 700,
        letterSpacing: "-2.8"
    },
    slotlymakesiteasytoschedulemeetingswithoutthechaos: {
        position: "relative",
        alignSelf: "stretch",
        flexShrink: 0,
        textAlign: "left",
        color: "rgba(188, 188, 188, 1)",
        fontFamily: "Urbanist",
        fontSize: 28,
        fontWeight: 400
    },
    slotlyFourLogos: {
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        columnGap: -56,
        height: '30%',
        flexDirection: 'row',
    },
    frame137: {
        position: "relative",
        flexShrink: 0,
        shadowColor: "rgba(0, 0, 0, 0.15)",
        shadowOffset: {
            width: 4,
            height: 4
        },
        shadowRadius: 4,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        columnGap: 24.925695419311523
    },
    _frame137: {
        position: "relative",
        flexShrink: 0,
        height: 169,
        width: 169,
        borderStyle: "solid",
        backgroundColor: "rgba(255, 255, 255, 1)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        columnGap: 10.62893009185791,
        paddingHorizontal: 18.069181442260742,
        paddingVertical: 17.00628662109375,
        borderWidth: 8,
        borderColor: "rgba(52, 199, 89, 1)",
        borderRadius: 84.49999237060547,
    },
    _group12: {
        position: "relative",
        flexShrink: 0,
        height: 131,
        width: 131
    },
    frame138: {
        position: "relative",
        flexShrink: 0,
        shadowColor: "rgba(0, 0, 0, 0.15)",
        shadowOffset: {
            width: 4,
            height: 4
        },
        shadowRadius: 4,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        columnGap: 24.925695419311523
    },
    __frame137: {
        position: "relative",
        flexShrink: 0,
        height: 169,
        width: 169,
        borderStyle: "solid",
        backgroundColor: "rgba(255, 255, 255, 1)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        columnGap: 10.62893009185791,
        paddingHorizontal: 18.069181442260742,
        paddingVertical: 17.00628662109375,
        borderWidth: 8,
        borderColor: "rgba(222, 117, 82, 1)",
        borderRadius: 84.49999237060547,
        marginLeft: -60
    },
    __group12: {
        position: "relative",
        flexShrink: 0,
        height: 131,
        width: 131
    },
    frame139: {
        position: "relative",
        flexShrink: 0,
        shadowColor: "rgba(0, 0, 0, 0.15)",
        shadowOffset: {
            width: 4,
            height: 4
        },
        shadowRadius: 4,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        columnGap: 24.925695419311523
    },
    ___frame137: {
        position: "relative",
        flexShrink: 0,
        height: 169,
        width: 169,
        borderStyle: "solid",
        backgroundColor: "rgba(255, 255, 255, 1)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        columnGap: 10.62893009185791,
        paddingHorizontal: 18.069181442260742,
        paddingVertical: 17.00628662109375,
        borderWidth: 8,
        borderColor: "rgba(0, 122, 255, 1)",
        borderRadius: 84.49999237060547,
        marginLeft: -60

    },
    ___group12: {
        position: "relative",
        flexShrink: 0,
        height: 131,
        width: 131
    },
    frame140: {
        position: "relative",
        flexShrink: 0,
        shadowColor: "rgba(0, 0, 0, 0.15)",
        shadowOffset: {
            width: 4,
            height: 4
        },
        shadowRadius: 4,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        columnGap: 24.925695419311523
    },
    ____frame137: {
        position: "relative",
        flexShrink: 0,
        height: 169,
        width: 169,
        borderStyle: "solid",
        backgroundColor: "rgba(255, 255, 255, 1)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        columnGap: 10.62893009185791,
        paddingHorizontal: 18.069181442260742,
        paddingVertical: 17.00628662109375,
        borderWidth: 8,
        borderColor: "rgba(255, 204, 0, 1)",
        borderRadius: 84.49999237060547,
        marginLeft: -60

    },
    ____group12: {
        position: "relative",
        flexShrink: 0,
        height: 131,
        width: 131
    },
    createAccountLogin: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: '20%',
        width: "100%"
    },
});