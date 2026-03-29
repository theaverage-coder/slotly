import { Platform } from 'react-native';

const API_URL =
    Platform.OS === 'web'
        ? process.env.EXPO_PUBLIC_API_URL_WEB
        : process.env.EXPO_PUBLIC_API_URL_MOBILE;

export default API_URL;