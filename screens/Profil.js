import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableHighlight,
    AsyncStorage
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import User from '../config/User';

export default class Profil extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    async logout() {
        await AsyncStorage.clear();
        this.props.navigation.navigate("Login");
    }

    render() {
        console.log(User);
        return (
            <View style={styles.container}>
                
                <TouchableHighlight style={{ backgroundColor: 'red', height: 50, width: 120, borderRadius: 10, justifyContent: 'center', alignItems: 'center'}} onPress={() => this.logout()}>
                    <Text style={{ fontWeight: 'bold', color: '#fff' }}>Logout</Text>
                </TouchableHighlight>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    }
});
