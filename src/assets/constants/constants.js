import { Dimensions } from "react-native";

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export const height = screenHeight < screenWidth ? screenWidth : screenHeight;
export const width = screenWidth < screenHeight ? screenWidth : screenHeight;