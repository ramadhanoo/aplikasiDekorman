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
      email: '',
      password: '',
      errorEmail: '',
      errorPass: ''
    }
  }

  static navigationOptions = {
    title: "Login",
    headerLeft: null
  }

  handleViewRef = ref => this.view = ref;

  async save() {

    if (this.state.email.length != 0) {
      this.setState({ errorEmail: '' })
      //this.view.bounce(800).then(endState => console.log(endState.finished ? 'bounce finished' : 'bounce cancelled'));
    }

    if (this.state.email.search("@") != -1) {
      this.setState({ errorEmail: '' });
      //this.view.bounce(800).then(endState => console.log(endState.finished ? 'bounce finished' : 'bounce cancelled'));
    }

    if (this.state.password.length != 0) {
      this.setState({ errorPass: '' })
      //this.view.bounce(800).then(endState => console.log(endState.finished ? 'bounce finished' : 'bounce cancelled'));
    }

    if (this.state.password.length >= 7) {
      this.setState({ errorPass: '' })
      //this.view.bounce(800).then(endState => console.log(endState.finished ? 'bounce finished' : 'bounce cancelled'));
    }

    if (this.state.email.length == 0) {
      this.setState({ errorEmail: 'Email Tidak Boleh Kosong' });
      this.view.bounce(800).then(endState => console.log(endState.finished ? 'bounce finished' : 'bounce cancelled'));
    } else if (this.state.email.search("@") == -1) {
      this.setState({ errorEmail: 'Format Email Salah' });
      this.view.bounce(800).then(endState => console.log(endState.finished ? 'bounce finished' : 'bounce cancelled'));
    } else if (this.state.password.length == 0) {
      this.setState({ errorPass: 'Password Tidak Boleh Kosong' });
      this.view.bounce(800).then(endState => console.log(endState.finished ? 'bounce finished' : 'bounce cancelled'));
    } else if (this.state.password.length <= 7) {
      this.setState({ errorPass: 'Password Kurang Dari 8 Kata' })
      this.view.bounce(800).then(endState => console.log(endState.finished ? 'bounce finished' : 'bounce cancelled'));
    } else {
      return fetch('http://192.168.1.5:3000/login', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: this.state.email,
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

  }

  render() {
    return (
      <ImageBackground source={require("../images/dio.jpg")} style={styles.container}>
        <Animatable.View ref={this.handleViewRef}>
          <View style={styles.inputContainer}>
            <TextInput style={styles.inputs}
              placeholder="Email"
              underlineColorAndroid='transparent'
              onChangeText={(email) => this.setState({ email })} />
            <Image style={styles.inputIcon} source={{ uri: 'https://www.netclipart.com/pp/m/31-313150_letter-send-inbox-newsletter-svg-png-icon-email.png' }} />
          </View>
          {this.state.errorEmail != '' ? <Text style={{ color: "red", fontWeight: 'bold', textAlign: 'right', paddingBottom: 20 }}>{this.state.errorEmail}</Text> : null}
          <View style={styles.inputContainer}>
            <TextInput style={styles.inputs}
              placeholder="Password"
              secureTextEntry={true}
              underlineColorAndroid='transparent'
              onChangeText={(password) => this.setState({ password })} />
            <Image style={styles.inputIcon} source={{ uri: 'https://img.icons8.com/nolan/40/000000/key.png' }} />
          </View>
          {this.state.errorPass != '' ? <Text style={{ color: "red", fontWeight: 'bold', textAlign: 'right', paddingBottom: 20 }}>{this.state.errorPass}</Text> : null}
        </Animatable.View>

        <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.save()}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonContainer} onPress={() => this.props.navigation.navigate("Register")}>
          <Text style={styles.btnText}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonContainer1} onPress={() => this.props.navigation.navigate("Login")}>
          <Text style={styles.btnText}>Lupa Password?</Text>
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
  buttonContainer1: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 300,
    borderRadius: 30,
    paddingBottom: 30,
    backgroundColor: 'transparent'
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