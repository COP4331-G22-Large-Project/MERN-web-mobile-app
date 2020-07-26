import { StyleSheet } from 'react-native';
import * as Font from 'expo-font';

export const globalStyles = StyleSheet.create({
    container:{
        flex: 1,
        padding: 20,
    },

    titleText: {
        fontFamily: 'nunito-bold',
        fontSize: 18,
        color: '#333'
    },

    paragraph: {
        marginVertical: 8,
        lineHeight: 20,
    }
});