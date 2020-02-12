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
import * as Animatable from 'react-native-animatable';
//import User from '../User';
const layar = Dimensions.get("window");
//import { Ip } from '../static/Ip';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    }
  }



  static navigationOptions = {
    header: null
  }

  save() {
    console.log(this.state.username);
    console.log(this.state.password);
  }

  render() {
    return (
      <ImageBackground source={require("../images/dio.jpg")} style={styles.container}>
        <Animatable.View ref={this.handleViewRef}>
          <View style={styles.inputContainer}>
            <TextInput style={styles.inputs}
              placeholder="Username"
              underlineColorAndroid='transparent'
              onChangeText={(username) => this.setState({ username })} />
            <Image style={styles.inputIcon} source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRdEIA5KsV6xI-bVngwR5-dh13ajP7bdH3Pt2ZIAfCy22dHq3Cj' }} />
          </View>

          <View style={styles.inputContainer}>
            <TextInput style={styles.inputs}
              placeholder="Password"
              secureTextEntry={true}
              underlineColorAndroid='transparent'
              onChangeText={(password) => this.setState({ password })} />
            <Image style={styles.inputIcon} source={{ uri: 'https://img.icons8.com/nolan/40/000000/key.png' }} />
          </View>

        </Animatable.View>
        <TouchableOpacity style={styles.btnForgotPassword} onPress={() => this.save()}>
          <Text style={styles.btnText}>Forgot your password?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.save()}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonContainer} onPress={() => this.props.navigation.navigate("Register")}>
          <Text style={styles.btnText}>Register</Text>
        </TouchableOpacity>
      </ImageBackground>
    );
  }
}

const resizeMode = 'center';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    height: '100%',
    width: '100%'
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    borderBottomWidth: 1,
    width: 300,
    height: 45,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',

    shadowColor: "#808080",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
    flex: 1,
  },
  inputIcon: {
    width: 30,
    height: 30,
    marginRight: 15,
    justifyContent: 'center'
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 300,
    borderRadius: 30,
    backgroundColor: 'transparent'
  },
  btnForgotPassword: {
    height: 15,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginBottom: 10,
    width: 300,
    backgroundColor: 'transparent'
  },
  loginButton: {
    backgroundColor: "#8b0000",

    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.50,
    shadowRadius: 12.35,

    elevation: 19,
  },
  loginText: {
    color: 'white',
  },
  bgImage: {
    resizeMode,
    position: 'absolute',
    width: layar.width,
    height: layar.height,
    justifyContent: 'center',
  },
  btnText: {
    color: "white",
    fontWeight: 'bold'
  }
}); 