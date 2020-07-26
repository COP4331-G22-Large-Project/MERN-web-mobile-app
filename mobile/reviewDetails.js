import React from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
import{ globalStyles} from './Pages/styles/global';

export default function ReviewDetails({ navigation }) {
    return (
        <View style={globalStyles.container}>
            <Text>{ navigation.getParam('title') }</Text>
        </View>
    )
}

