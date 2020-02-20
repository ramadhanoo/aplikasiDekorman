import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Image,
    Button,
    Alert,
    Dimensions,
    ImageBackground,
    AsyncStorage
} from 'react-native';

class Data extends Component {
    async render() {
        try {
            const userToken = await AsyncStorage.getItem('user');
            if(userToken != null) {
                return "success";
            } else {
                return "gagal";
            }
        } catch(err) {
            return err
        }
    }
}

export default Data.render