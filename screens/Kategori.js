import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Button
} from 'react-native';


export default class Kategori extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Kategori</Text>
                
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
