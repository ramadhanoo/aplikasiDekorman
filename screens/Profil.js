import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableHighlight,
    ActivityIndicator
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import User from '../config/User';
import AsyncStorage from '@react-native-community/async-storage';

export default class Profil extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false
        };
    }

    async logout() {
        this.setState({ loading: true })
        await AsyncStorage.clear((call) => {
            this.setState({ loading: false })
            this.props.navigation.navigate("Login");
        }, (err) =>  {
            console.log(err);
        });
        
    }

    render() {
        return (
            <View style={styles.container}>
                
                <TouchableHighlight style={{ backgroundColor: 'red', height: 50, width: 120, borderRadius: 10, justifyContent: 'center', alignItems: 'center'}} onPress={() => this.logout()}>
                {this.state.loading ? (<ActivityIndicator size="small" color="#fff" />) : (<Text style={{ fontWeight: 'bold', color: '#fff' }}>Logout</Text>)}
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
