import React, { Component } from 'react';
import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import User from '../config/User';
import AsyncStorage from '@react-native-community/async-storage';

export default class AuthLoading extends Component {
  componentDidMount() {
    this._bootstrapAsync();
  }

  static navigationOptions = {
    header: null
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const user = await AsyncStorage.getItem('user');


    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    //this.props.navigation.navigate(user ? 'LoginStack' : 'Tab');
    if (user) {
      let data = JSON.parse(user);
      User.id_user = data.id_user;
      User.username = data.username;
      User.email = data.email;
      User.password = data.password;
      User.jk = data.jk;
      User.no_tlp = data.no_tlp;
      User.nama = data.nama;
      User.alamat = data.alamat;
      User.avatar_user = data.avatar_user;
      this.props.navigation.navigate('Tab');
    } else {
      this.props.navigation.navigate('Tab');
    }
  };

  // Render any loading content that you like here
  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}