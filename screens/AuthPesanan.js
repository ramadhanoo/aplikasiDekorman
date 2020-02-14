import React, { Component } from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';

export default class AuthPesanan extends Component {
  componentDidMount() {
    this._bootstrapAsync();
  }

  static navigationOptions = {
    header: null,
  }

  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('user');

    if(userToken) {
        this.props.navigation.navigate('Pesanan');
    } else {
        this.props.navigation.navigate('Pesananblmlogin');
    }
  };

  // Render any loading content that you like here
  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}