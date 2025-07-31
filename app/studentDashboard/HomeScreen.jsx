import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Defs, FeBlend, FeColorMatrix, FeComposite, FeFlood, FeGaussianBlur, FeOffset, Filter, G, Path, Svg } from 'react-native-svg';

import AddCourseModal from './AddCourseModal';

export default function HomeScreen() {
    const [modalVisible, setModalVisibility] = useState(false);


    return (
        <View style={[styles.screenContainer, styles.emptyScreen]}>
            <View style={styles.topContainer}>
                <View style={styles.slotlyLogo}>
                    <Svg style={styles.group} width="140" height="140" viewBox="0 0 140 140" fill="none" >
                        <G filter="url(#filter0_d_648_983)">
                            <Path d="M133 66.5C133 29.7731 103.227 0 66.5 0C29.7731 0 0 29.7731 0 66.5C0 103.227 29.7731 133 66.5 133C103.227 133 133 103.227 133 66.5Z" fill="white" />
                            <Path d="M57.561 12.2139C62.4142 12.2139 66.3489 16.1484 66.3489 21.0021V66.4394H48.7722V21.0021C48.7722 16.1484 52.7069 12.2139 57.561 12.2139Z" fill="#767676" />
                            <Path d="M98.5661 21.7935C101.999 25.2256 101.999 30.7899 98.5661 34.222L66.4372 66.351L54.0087 53.9225L86.1377 21.7935C89.5701 18.3615 95.1346 18.3615 98.5661 21.7935Z" fill="#767676" />
                            <Path d="M120.787 57.5597C120.787 62.4133 116.853 66.3479 111.999 66.3479H66.5613V48.7714H111.999C116.853 48.7714 120.787 52.706 120.787 57.5597Z" fill="#767676" />
                            <Path d="M111.206 98.5659C107.774 101.998 102.21 101.998 98.7774 98.5659L66.6484 66.4371L79.0769 54.0087L111.206 86.1374C114.638 89.5698 114.638 95.1343 111.206 98.5659Z" fill="#767676" />
                            <Path d="M75.438 120.787C70.5847 120.787 66.6501 116.852 66.6501 111.998V66.5614H84.2267V111.998C84.2267 116.852 80.2921 120.787 75.438 120.787Z" fill="#767676" />
                            <Path d="M34.4343 111.206C31.0019 107.774 31.0019 102.21 34.4343 98.7773L66.5633 66.6484L78.9918 79.0769L46.8628 111.206C43.4304 114.638 37.8659 114.638 34.4343 111.206Z" fill="#767676" />
                            <Path d="M12.2122 75.4351C12.2122 70.5814 16.1469 66.6467 21.001 66.6467H66.4382V84.2236H21.001C16.1469 84.2236 12.2122 80.289 12.2122 75.4351Z" fill="#767676" />
                            <Path d="M21.7929 34.4333C25.2245 31.0012 30.789 31.0012 34.2214 34.4333L66.3504 66.5623L53.9219 78.9908L21.7929 46.8618C18.3605 43.4297 18.3605 37.8653 21.7929 34.4333Z" fill="#767676" />
                            <Path d="M55.4567 76.1354C61.4287 76.1354 66.2699 71.2941 66.2699 65.3221C66.2699 59.3502 61.4287 54.5089 55.4567 54.5089C49.4847 54.5089 44.6434 59.3502 44.6434 65.3221C44.6434 71.2941 49.4847 76.1354 55.4567 76.1354Z" fill="white" />
                            <Path d="M79.9294 76.1354C85.9014 76.1354 90.7427 71.2941 90.7427 65.3221C90.7427 59.3502 85.9014 54.5089 79.9294 54.5089C73.9574 54.5089 69.1162 59.3502 69.1162 65.3221C69.1162 71.2941 73.9574 76.1354 79.9294 76.1354Z" fill="white" />
                            <Path d="M84.5588 72.7236C88.4878 72.7236 91.6728 69.5385 91.6728 65.6096C91.6728 61.6806 88.4878 58.4956 84.5588 58.4956C80.6299 58.4956 77.4449 61.6806 77.4449 65.6096C77.4449 69.5385 80.6299 72.7236 84.5588 72.7236Z" fill="#1C1C1C" />
                            <Path d="M60.086 72.7236C64.015 72.7236 67.2 69.5385 67.2 65.6096C67.2 61.6806 64.015 58.4956 60.086 58.4956C56.1571 58.4956 52.972 61.6806 52.972 65.6096C52.972 69.5385 56.1571 72.7236 60.086 72.7236Z" fill="#1C1C1C" />
                        </G>
                        <Defs>
                            <Filter id="filter0_d_648_983" x="0" y="0" width="139.609" height="139.609" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                <FeFlood floodOpacity="0" result="BackgroundImageFix" />
                                <FeColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                <FeOffset dx="3.30435" dy="3.30435" />
                                <FeGaussianBlur stdDeviation="1.65217" />
                                <FeComposite in2="hardAlpha" operator="out" />
                                <FeColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
                                <FeBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_648_983" />
                                <FeBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_648_983" result="shape" />
                            </Filter>
                        </Defs>
                    </Svg>
                </View>
                <Text style={styles.text1}>You don't have any meetings yet</Text>
                <Text style={styles.text2}>Add your courses to find professors and book your first meeting</Text>
                <View style={styles.textContainer}>
                    <Text style={styles.text3}>Tap the</Text>
                    <View style={styles.plusIconContainer}>
                        <Svg style={styles.plusIcon} width="9" height="9" viewBox="0 0 9 9" fill="none" >
                            <Path d="M8.25 4.5C8.25 4.58288 8.21708 4.66237 8.15847 4.72097C8.09987 4.77958 8.02038 4.8125 7.9375 4.8125H4.8125V7.9375C4.8125 8.02038 4.77958 8.09987 4.72097 8.15847C4.66237 8.21708 4.58288 8.25 4.5 8.25C4.41712 8.25 4.33763 8.21708 4.27903 8.15847C4.22042 8.09987 4.1875 8.02038 4.1875 7.9375V4.8125H1.0625C0.97962 4.8125 0.900134 4.77958 0.841529 4.72097C0.782924 4.66237 0.75 4.58288 0.75 4.5C0.75 4.41712 0.782924 4.33763 0.841529 4.27903C0.900134 4.22042 0.97962 4.1875 1.0625 4.1875H4.1875V1.0625C4.1875 0.97962 4.22042 0.900134 4.27903 0.841529C4.33763 0.782924 4.41712 0.75 4.5 0.75C4.58288 0.75 4.66237 0.782924 4.72097 0.841529C4.77958 0.900134 4.8125 0.97962 4.8125 1.0625V4.1875H7.9375C8.02038 4.1875 8.09987 4.22042 8.15847 4.27903C8.21708 4.33763 8.25 4.41712 8.25 4.5Z" fill="white" />
                        </Svg>
                    </View>
                    <Text style={styles.text3}>button to get started</Text>
                </View>
            </View>
            <View style={styles.bottomContainer}>
                <Pressable style={styles.plusButton} onPress={() => setModalVisibility(true)}>
                    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" >
                        <Path d="M24 12C24 12.2652 23.8946 12.5196 23.7071 12.7071C23.5196 12.8946 23.2652 13 23 13H13V23C13 23.2652 12.8946 23.5196 12.7071 23.7071C12.5196 23.8946 12.2652 24 12 24C11.7348 24 11.4804 23.8946 11.2929 23.7071C11.1054 23.5196 11 23.2652 11 23V13H1C0.734784 13 0.48043 12.8946 0.292893 12.7071C0.105357 12.5196 0 12.2652 0 12C0 11.7348 0.105357 11.4804 0.292893 11.2929C0.48043 11.1054 0.734784 11 1 11H11V1C11 0.734784 11.1054 0.48043 11.2929 0.292893C11.4804 0.105357 11.7348 0 12 0C12.2652 0 12.5196 0.105357 12.7071 0.292893C12.8946 0.48043 13 0.734784 13 1V11H23C23.2652 11 23.5196 11.1054 23.7071 11.2929C23.8946 11.4804 24 11.7348 24 12Z" fill="white" />
                    </Svg>
                </Pressable>
            </View>
            <AddCourseModal visible={modalVisible} onClose={() => setModalVisibility(false)} />
        </View>
    );
}

const styles = StyleSheet.create({
    screenContainer: {
        backgroundColor: "rgba(33, 33, 33, 1)",
        height: "70vh"
    },
    emptyScreen: {

    },
    topContainer: {
        height: "80%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        rowGap: 15
    },
    bottomContainer: {
        height: "20%",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "flex-end",
    },
    slotlyLogo: {
        opacity: 0.2,
    },
    textContainer: {
        display: "flex",
        flexDirection: "row"
    },
    text1: {
        color: "rgba(255, 255, 255, 1)",
        fontFamily: "Urbanist",
        fontSize: 24,
        fontWeight: 700
    },
    text2: {
        color: "rgba(173, 170, 170, 1)",
        fontFamily: "Urbanist",
        fontSize: 16,
        fontWeight: 600,
        textAlign: "center",
        width: "70vw"
    },
    text3: {
        color: "rgba(255, 255, 255, 1)",
        fontFamily: "Urbanist",
        fontSize: 18,
        fontWeight: 400
    },
    plusIconContainer: {
        height: 25,
        width: 25,
        marginLeft: 5,
        marginRight: 5,
        borderStyle: "solid",
        shadowColor: "rgba(0, 0, 0, 0.25)",
        shadowOffset: {
            width: 1.25,
            height: 1.25
        },
        shadowRadius: 7.5,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        columnGap: 3.125,
        padding: 1,
        borderWidth: 1,
        borderColor: "rgba(255, 255, 255, 1)",
        borderRadius: 7.5
    },
    plusButton: {
        height: 80,
        width: 80,
        backgroundColor: "rgba(129, 104, 255, 1)",
        shadowColor: "rgba(0, 0, 0, 0.25)",
        shadowOffset: {
            width: 4,
            height: 4
        },
        shadowRadius: 24,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        columnGap: 10,
        padding: 28,
        borderRadius: 24,
        marginBottom: 15,
        marginRight: 15
    }
})