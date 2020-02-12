import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Button
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default class Pesanan extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }


    render() {
        return (
            <View style={styles.container}>
                <Text onPress={() => this.props.navigation.navigate("Payment")}>Pesanan</Text>
                
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
