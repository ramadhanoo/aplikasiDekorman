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
  ScrollView,
  ActivityIndicator
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import User from '../config/User';
import Modal from "react-native-modal";
const layar = Dimensions.get("window");
import Icon from 'react-native-vector-icons/Ionicons';
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-community/google-signin';
//import { Ip } from '../static/Ip';
import { LoginManager, AccessToken } from "react-native-fbsdk";
import { Ip } from '../config/Ip';


export default class Lupapass1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errorEmail: '',
      errorPass: '',
      userInfo: null,
      isModalVisible: false,
      emailval: false,
      emailvalidation: false,
      isModalSms: false,
      verif: '',
      loading1: false,
      loadingFull: false
    }
  }

  static navigationOptions = {
    title: "Lupa Password",
    headerLeft: null
  }

  componentDidMount() {
    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
      webClientId: '904131581893-hnoirmo00qpqb4edptkjsoq47ebolfvo.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      forceConsentPrompt: true, // [Android] if you want to show the authorization prompt at each login.
      iosClientId: '904131581893-8dstvees1vo1lbb8c8dfgje27j91jb8r.apps.googleusercontent.com', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
    });
  }

  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  toggleModal2 = () => {
    this.setState({ isModalSms: !this.state.isModalSms });
  };

  handleViewRef = ref => this.view = ref;


  ubah() {
    this.setState({ emailval: false, errorPass: '' })
  }

  lanjut() {
    this.setState({ loading1: false });
    this.props.navigation.navigate("Register");
  }


  async save() {
    // buat konstruktor RegExp
    //var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    //let reg = /^[0-9]|08[0-9]{9,}$/
    let reg = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (reg.test(this.state.email)) {
      this.setState({ loading1: true })
      fetch(`http://${Ip}:3000/teleponVerification`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: this.state.email,
        })
      })
        .then((response) => response.json())
        .then((responseJson) => {

          console.log(responseJson);
          if (responseJson != "berhasil") {

            this.setState({ isModalSms: true, loading1: false })
          } else {
            this.view.bounce(800).then(endState => console.log(endState.finished ? 'bounce finished' : 'bounce cancelled'));
            this.setState({ errorEmail: 'Nomor Tidak Terdaftar', loading1: false });
          }
        });

    } else if (re.test(this.state.email)) {
      this.setState({ emailval: true })
    } else {
      if (this.state.email.length == 0) {
        this.setState({ errorEmail: 'Email Tidak Boleh Kosong' });
        this.view.bounce(800).then(endState => console.log(endState.finished ? 'bounce finished' : 'bounce cancelled'));
      }
    }
  }

  masuk() {
    this.setState({ loading1: true })
    if (isNaN(this.state.email)) {

    } else {
      console.log(typeof (this.state.email));
    }



    if (this.state.email.search("@") != -1) {
      this.setState({ errorEmail: '' });
      //this.view.bounce(800).then(endState => console.log(endState.finished ? 'bounce finished' : 'bounce cancelled'));
    }


    if (this.state.email.search("@") == -1) {
      this.setState({ errorEmail: 'Format Email Salah', loading1: false });
      this.view.bounce(800).then(endState => console.log(endState.finished ? 'bounce finished' : 'bounce cancelled'));
    } else {
      return fetch(`http://${Ip}:3000/emailVerification`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: this.state.email,
        })
      })
        .then((response) => response.json())
        .then((responseJson) => {

          console.log(responseJson);
          if (responseJson == "berhasil") {
            Alert.alert(
              this.state.email,
              'Email Belum Terdaftar',
              [
                { text: 'Koreksi', onPress: () => this.setState({ loading1: false }) },

                { text: 'Register', onPress: () => this.lanjut() },
              ],
              { cancelable: false },
            );
          } else {
            //alert(this.state.email);
            fetch(`http://${Ip}:3000/sendEmail`, {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                email: this.state.email,
              })
            })
              .then((response) => response.json())
              .then((responseJson) => {
                console.log(responseJson);
                this.setState({ loading1: false })
                this.props.navigation.navigate("Lupapass2", { verif: responseJson, email: this.state.email });

              });



          }
        });
    }
  }

  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let reg = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

    if (re.test(email)) {
      this.setState({ emailvalidation: true, errorEmail: '', email: email })
    } else if (email.length == 0) {
      this.setState({ errorEmail: '' });
      //this.view.bounce(800).then(endState => console.log(endState.finished ? 'bounce finished' : 'bounce cancelled'));
    } else if (reg.test(email)) {
      this.setState({ errorEmail: '', emailvalidation: true, email: email });
      //this.view.bounce(800).then(endState => console.log(endState.finished ? 'bounce finished' : 'bounce cancelled'));
    } else {
      var angka = parseInt(email);
      console.log(typeof (1));
      if (isNaN(angka)) {
        //alert("ini bukan telepon")
        this.setState({ errorEmail: 'Format Email Salah', emailvalidation: false });
      } else if (angka == 0) {
        //alert("ini telepon")
        this.setState({ errorEmail: 'Foemat Email Salah', emailvalidation: false });
      } else {
        //alert("ini telepon")
        this.setState({ errorEmail: 'Foemat Email Salah', emailvalidation: false });
      }

      //this.view.bounce(800).then(endState => console.log(endState.finished ? 'bounce finished' : 'bounce cancelled'));
    }
  }


  render() {
    var button1 = (<TouchableOpacity style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.masuk()} disabled={this.state.loading1 == false ? false : true}>
      {this.state.loading1 ? (<ActivityIndicator size="small" color="#fff" />) : (<Text style={styles.loginText}>Masuk</Text>)}
    </TouchableOpacity>);

    var button2 = (<TouchableOpacity style={this.state.emailvalidation == true ? [styles.buttonContainer, styles.loginButton] : [styles.buttonContainer, styles.loginButton2]} onPress={() => this.save()} disabled={this.state.loading == false ? false : true}>
      {this.state.loading1 ? (<ActivityIndicator size="small" color="#fff" />) : (<Text style={styles.loginText}>Selanjutnya</Text>)}
    </TouchableOpacity>);
    //alert(Platform.OS);
    if (this.state.loadingFull) {
      return (
        <View style={{ backgroundColor: '#fff', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#8b0000" />
        </View >
      )
    } else {
      return (

        <ImageBackground source={require("../images/dio.jpg")} style={styles.container}>

          <View>
            <Animatable.View ref={this.handleViewRef}>
              <View style={styles.inputContainer}>
                <TextInput style={styles.inputs}
                  placeholder="Email"
                  underlineColorAndroid='transparent'
                  onChangeText={(email) => this.validateEmail(email)} />
                {this.state.emailval ? (<TouchableOpacity onPress={() => this.ubah()}>
                  <Text style={{ color: 'blue', fontWeight: 'bold', marginRight: 10 }}>Ubah</Text>
                </TouchableOpacity>) : (<Image style={styles.inputIcon} source={{ uri: 'https://www.utm.my/isikl/files/2015/10/silhouette.png' }} />)}


              </View>
              {this.state.errorEmail != '' ? <Text style={{ color: "red", fontWeight: 'bold', textAlign: 'right', paddingBottom: 20 }}>{this.state.errorEmail}</Text> : null}
              {this.state.emailval ? (<View style={styles.inputContainer}>
                <TextInput style={styles.inputs}
                  placeholder="Password"
                  secureTextEntry={true}
                  underlineColorAndroid='transparent'
                  onChangeText={(password) => this.setState({ password })} />
                <Image style={styles.inputIcon} source={{ uri: 'https://img.icons8.com/nolan/40/000000/key.png' }} />
              </View>)

                : <Text></Text>}
              {this.state.errorPass != '' ? <Text style={{ color: "red", fontWeight: 'bold', textAlign: 'right', paddingBottom: 20 }}>{this.state.errorPass}</Text> : null}
            </Animatable.View>

            <TouchableOpacity style={this.state.emailvalidation == true ? [styles.buttonContainer, styles.loginButton] : [styles.buttonContainer, styles.loginButton2]} onPress={() => this.masuk()} disabled={this.state.emailvalidation ? false : true}>
              {this.state.loading1 ? (<ActivityIndicator size="small" color="#fff" />) : (<Text style={styles.loginText}>Selanjutnya</Text>)}
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonContainer} onPress={() => this.props.navigation.navigate("Register")}>
              <Text style={styles.btnText}>Register</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonContainer} onPress={() => this.props.navigation.navigate("Login")}>
              <Text style={styles.btnText}>Login</Text>
            </TouchableOpacity>


          </View>


        </ImageBackground>
      );
    }

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
  but: {
    backgroundColor: '#fff',
    width: layar.width - 50, height: 60,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    shadowColor: '#dcdcdc',
    shadowOffset: { width: 1, height: 5 },
    shadowOpacity: 10,
    shadowRadius: 5,
    borderRadius: 5
  },
  but2: {
    backgroundColor: '#fff',
    width: layar.width - 50, height: 60,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    borderColor: '#dcdcdc',
    borderWidth: 1,
    borderRadius: 5
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
      height: 45,
    },
    shadowOpacity: 0.50,
    shadowRadius: 12.35,

    elevation: 19,
  },
  loginButton2: {
    backgroundColor: "#dcdcdc",

    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 9,
      height: 45,
    },
    shadowOpacity: 0.50,
    shadowRadius: 12.35,

    elevation: 19,
  },
  loginText: {
    color: 'white',
    fontWeight: 'bold'
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