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
import User from '../config/User';
const layar = Dimensions.get("window");
//import { Ip } from '../static/Ip';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      no_tlp: '',
      password: '',
    }
  }

  static navigationOptions = {
    header: null
  }

  handleViewRef = ref => this.view = ref;

  async save() {
    return fetch('http://192.168.1.5:3000/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        no_tlp: this.state.no_tlp,
        password: this.state.password,
      })
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson == "gagal") {
          this.view.bounce(800).then(endState => console.log(endState.finished ? 'bounce finished' : 'bounce cancelled'));
          alert("User Tidak Di Temukan");
        } else {
          console.log(responseJson[0]);
          var data = {
            id_user: responseJson[0].id_user,
            username: responseJson[0].username,
            email: responseJson[0].email,
            password: responseJson[0].password,
            jk: responseJson[0].jk,
            no_tlp: responseJson[0].no_tlp,
            nama: responseJson[0].nama,
            alamat: responseJson[0].alamat,
            avatar_user: responseJson[0].avatar_user,
          }

          AsyncStorage.setItem('user', JSON.stringify(data));
          User.id_user = responseJson[0].id_user;
          User.username = responseJson[0].username;
          User.email = responseJson[0].email;
          User.password = responseJson[0].password;
          User.jk = responseJson[0].jk;
          User.no_tlp = responseJson[0].no_tlp;
          User.nama = responseJson[0].nama;
          User.alamat = responseJson[0].alamat;
          User.avatar_user = responseJson[0].avatar_user;

          this.props.navigation.navigate("AuthLoading");
        }
      });
  }

  render() {
    return (
      <ImageBackground source={require("../images/dio.jpg")} style={styles.container}>
        <Animatable.View ref={this.handleViewRef}>
          <View style={styles.inputContainer}>
            <TextInput style={styles.inputs}
              placeholder="Telepon"
              underlineColorAndroid='transparent'
              onChangeText={(no_tlp) => this.setState({ no_tlp })} />
            <Image style={styles.inputIcon} source={{ uri: 'data:image/png;base64,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' }} />
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