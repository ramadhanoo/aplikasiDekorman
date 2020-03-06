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
  AsyncStorage,
  TouchableHighlight,
  Platform,
  ScrollView
} from 'react-native';
const layar = Dimensions.get("window");
import Icon from 'react-native-vector-icons/Ionicons';
import { LoginButton, AccessToken } from 'react-native-fbsdk';
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-community/google-signin';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      this.setState({ user: null }); // Remember to remove the user from your app's state as well
      console.log("success");
    } catch (error) {
      console.error(error);
    }
  };



  render() {
    return (
      <View style={styles.container}>
        <Icon name="md-menu" size={30} />
        <Text onPress={() => this.props.navigation.navigate("Payment")}>Bismilah</Text>
        <LoginButton
          onLoginFinished={
            (error, result) => {
              if (error) {
                console.log("login has error: " + result.error);
              } else if (result.isCancelled) {
                console.log("login is cancelled.");
              } else {
                AccessToken.getCurrentAccessToken().then(
                  (data) => {
                    console.log(data.accessToken.toString())
                  }
                )
              }
            }
          }
          onLogoutFinished={() => console.log("logout.")} />
        <TouchableOpacity onPress={() => this.signOut()}>
          <Text>Logout</Text>
        </TouchableOpacity>
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
