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
  TouchableHighlight,
  Platform,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
const layar = Dimensions.get("window");
import Icon from 'react-native-vector-icons/Ionicons';
import { LoginButton, AccessToken } from 'react-native-fbsdk';
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-community/google-signin';
import User from '../config/User'
const { width, height } = Dimensions.get("window");
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      loadingFull: false
    };
  }

  static navigationOptions = {
    title: "Home",
    headerBackTitle: null,
    tabBarVisible: false
}





  render() {
    console.log(User);
    return (
      <View style={{flex: 1, alignItems:'center', justifyContent: 'center', backgroundColor: '#fff' }}>
        <Text>sasasa</Text>
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
