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
import * as Animatable from 'react-native-animatable';
import User from '../config/User';
import Modal from "react-native-modal";
const layar = Dimensions.get("window");
import Icon from 'react-native-vector-icons/Ionicons';
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-community/google-signin';
//import { Ip } from '../static/Ip';
import { LoginManager, AccessToken } from "react-native-fbsdk";


const { height, width } = Dimensions.get("window");


export default class Pesananblmlogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            modalVisible: false,
            password: '',
            errorEmail: '',
            errorPass: '',
            userInfo: null,
            isModalVisible: false,
            emailval: false,
            emailvalidation: false,
            isModalSms: false
        }
    }

    static navigationOptions = {
        title: "Login",
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
        this.setState({ modalVisible: true })
    }

    toggleModal = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible });
    };

    toggleModal2 = () => {
        this.setState({ isModalSms: !this.state.isModalSms });
    };

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    handleViewRef = ref => this.view = ref;

    async loginwithgmail() {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            console.log(userInfo);
            this.setState({ userInfo });
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation (e.g. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // play services not available or outdated
            } else {
                console.log(error);
            }
        }
    }

    initUser(token) {
        fetch('https://graph.facebook.com/v2.5/me?fields=email,name,friends&access_token=' + token)
            .then((response) => response.json())
            .then((json) => {
                // Some user object has been set up somewhere, build that user here
                console.log(json);
                // user.name = json.name
                // user.id = json.id
                // user.user_friends = json.friends
                // user.email = json.email
                // user.username = json.name
                // user.loading = false
                // user.loggedIn = true
                // user.avatar = setAvatar(json.id)      
            })
            .catch(() => {
                reject('ERROR GETTING DATA FROM FACEBOOK')
            })
    }

    loginwithfacebook() {
        LoginManager.logInWithPermissions(["public_profile"]).then(
            function (result) {
                if (result.isCancelled) {
                    console.log("Login cancelled");
                } else {
                    AccessToken.getCurrentAccessToken().then(
                        (data) => {
                            console.log(data.accessToken.toString())
                            const { accessToken } = data
                            fetch('https://graph.facebook.com/v2.5/me?fields=email,name,friends&access_token=' + accessToken)
                                .then((response) => response.json())
                                .then((json) => {
                                    // Some user object has been set up somewhere, build that user here
                                    console.log(json);
                                    // user.name = json.name
                                    // user.id = json.id
                                    // user.user_friends = json.friends
                                    // user.email = json.email
                                    // user.username = json.name
                                    // user.loading = false
                                    // user.loggedIn = true
                                    // user.avatar = setAvatar(json.id)
                                })
                                .catch(() => {
                                    reject('ERROR GETTING DATA FROM FACEBOOK')
                                })
                        }
                    );
                }
            },
            function (error) {
                console.log("Login fail with error: " + error);
            }
        );
    }

    ubah() {
        this.setState({ emailval: false, errorPass: '' })
    }

    async save() {
        // buat konstruktor RegExp
        //var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        //let reg = /^[0-9]|08[0-9]{9,}$/
        let reg = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (reg.test(this.state.email)) {
            this.setState({ isModalSms: true })
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
        if (isNaN(this.state.email)) {

        } else {
            console.log(typeof (this.state.email));
        }

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
            return fetch('http://192.168.1.7:3000/login', {
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
                        this.setState({ errorPass: "Username Atau Password Salah" })
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
                this.setState({ errorEmail: 'format telepon salah', emailvalidation: false });
            } else {
                //alert("ini telepon")
                this.setState({ errorEmail: 'format telepon salah', emailvalidation: false });
            }

            //this.view.bounce(800).then(endState => console.log(endState.finished ? 'bounce finished' : 'bounce cancelled'));
        }
    }

    async sms() {

        fetch('http://192.168.1.4:3000/sms', {
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
                if (responseJson == 'berhasil') {
                    this.setState({ isModalSms: false })
                    this.props.navigation.navigate("Phonenumber");
                } else {
                    alert("error");
                }
                //this.props.navigation.navigate("Finalregis", { email: this.state.email, no_tlp: this.state.no_tlp, nama: this.state.nama, password: this.state.password, verif: responseJson });

            });


    }

    whatsApp() {
        alert("whatsapp");
    }

    render() {

        return (
            <View style={styles.container}>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                    }}>
                    <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
                        <View style={{ backgroundColor: '#fff', width: width, height: Platform.OS == 'android' ? 40 : 80, flexDirection: 'row', justifyContent: "space-between", alignItems: 'center' }}>
                            <TouchableHighlight onPress={() => this.setModalVisible(!this.state.modalVisible)} style={{ backgroundColor: '#fff', width: 80, height: 80, paddingTop: Platform.OS == 'android' ? 0 : 20, justifyContent: 'center', alignItems: 'center', paddingBottom: Platform.OS == 'ios' ? 0 : 10 }}>
                                <Text style={{ color: "#00000", fontWeight: '500', fontSize: 20 }}>Close</Text>
                            </TouchableHighlight>
                            <View style={{ backgroundColor: '#fff', width: 150, height: 80, paddingTop: Platform.OS == 'android' ? 0 : 20, justifyContent: 'center', alignItems: 'center', paddingBottom: Platform.OS == 'ios' ? 0 : 10 }}>
                                <Text style={{ color: "#00000", fontWeight: '500', fontSize: 20 }}>Login</Text>
                            </View>
                            <View style={{ backgroundColor: '#fff', width: 80, height: 80, paddingTop: Platform.OS == 'android' ? 0 : 20, justifyContent: 'center', alignItems: 'center', paddingBottom: Platform.OS == 'ios' ? 0 : 10 }}>
                                <Text style={{ color: "#00000", fontWeight: '500', fontSize: 20 }} onPress={() => this.props.navigation.navigate("Register")}>Daftar</Text>
                            </View>
                        </View>
                        <View style={{ width: width, backgroundColor: '#dcdcdc', height: 1 }}></View>
                        <View style={{ backgroundColor: '#fff', width: width, height: height }}>
                            <ImageBackground source={require("../images/dio.jpg")} style={styles.container}>

                                <View>
                                    <Animatable.View ref={this.handleViewRef}>
                                        <View style={styles.inputContainer}>
                                            <TextInput style={styles.inputs}
                                                placeholder="Email Atau Nomer Telepon"
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

                                    {this.state.emailval ? <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.masuk()}>
                                        <Text style={styles.loginText}>Masuk</Text>
                                    </TouchableOpacity> : <TouchableOpacity style={this.state.emailvalidation == true ? [styles.buttonContainer, styles.loginButton] : [styles.buttonContainer, styles.loginButton2]} onPress={() => this.save()} disabled={this.state.emailvalidation ? false : true}>
                                            <Text style={styles.loginText}>Selanjutnya</Text>
                                        </TouchableOpacity>}

                                    <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.toggleModal()}>
                                        <Text style={styles.loginText}>Metode Lain?</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={styles.buttonContainer} onPress={() => this.props.navigation.navigate("Register")}>
                                        <Text style={styles.btnText}>Register</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.buttonContainer1} onPress={() => this.props.navigation.navigate("Login")}>
                                        <Text style={styles.btnText}>Lupa Password?</Text>
                                    </TouchableOpacity>

                                    <Modal
                                        isVisible={this.state.isModalVisible}
                                        swipeDirection={['up', 'down']}
                                        style={{ justifyContent: 'flex-end', margin: 0 }}
                                        onBackdropPress={() => this.toggleModal()}
                                    >
                                        <View style={{
                                            backgroundColor: 'white',
                                            borderRadius: 10,
                                            borderColor: 'rgba(0, 0, 0, 0.1)',
                                        }}>

                                            <View style={{ backgroundColor: '#fff', width: layar.width, height: 210, borderRadius: 10 }}>
                                                <TouchableHighlight style={{ backgroundColor: '#fff', height: 29, width: 29, marginLeft: 10 }} onPress={() => this.toggleModal()}>
                                                    <Icon size={40} name='ios-close' color={'black'} />
                                                </TouchableHighlight>

                                                <View style={{ backgroundColor: '#fff', width: layar.width, height: 40, marginLeft: 10, justifyContent: 'center', paddingTop: 10 }}>
                                                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Silahkan Pilih Metode Login</Text>
                                                </View>
                                                <View style={{ backgroundColor: '#fff', width: layar.width, height: 200, alignItems: 'center' }}>
                                                    <TouchableOpacity style={{ backgroundColor: '#fff', width: layar.width / 1.05, height: 50, marginTop: 10, borderRadius: 5, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderColor: '#808080', borderWidth: 1 }} onPress={() => this.loginwithgmail()}>
                                                        <View style={{ backgroundColor: '#fff', height: 40, width: 50, marginLeft: 5, justifyContent: 'center', alignItems: 'center' }}>
                                                            <Image style={{ height: 20, width: 20 }} source={{ uri: 'data:image/png;base64,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' }} />
                                                        </View>
                                                        <View style={{ backgroundColor: '#fff', height: 40, width: layar.width / 1.70, marginLeft: 5, alignItems: 'center', justifyContent: 'center' }}>
                                                            <Text style={{ color: '#808080' }}>Google</Text>
                                                        </View>
                                                        <View style={{ backgroundColor: '#fff', height: 40, width: 50, marginRight: 5 }}></View>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity style={{ backgroundColor: '#fff', width: layar.width / 1.05, height: 50, marginTop: 10, borderRadius: 5, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderColor: '#808080', borderWidth: 1 }} onPress={() => this.loginwithfacebook()}>
                                                        <View style={{ backgroundColor: '#fff', height: 40, width: 50, marginLeft: 5, justifyContent: 'center', alignItems: 'center' }}>
                                                            <Image style={{ height: 20, width: 20 }} source={{ uri: 'data:image/png;base64,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' }} />
                                                        </View>
                                                        <View style={{ backgroundColor: '#fff', height: 40, width: layar.width / 1.70, marginLeft: 5, alignItems: 'center', justifyContent: 'center' }}>
                                                            <Text style={{ color: '#808080' }}>Facebook</Text>
                                                        </View>
                                                        <View style={{ backgroundColor: '#fff', height: 40, width: 50, marginRight: 5 }}></View>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        </View>
                                    </Modal>

                                    <Modal
                                        isVisible={this.state.isModalSms}
                                        swipeDirection={['up', 'down']}
                                        style={{ justifyContent: 'flex-end', margin: 0 }}
                                        onBackdropPress={() => this.toggleModal2()}
                                    >
                                        <View style={{
                                            backgroundColor: 'white',
                                            borderRadius: 10,
                                            borderColor: 'rgba(0, 0, 0, 0.1)',
                                        }}>

                                            <View style={{ backgroundColor: '#fff', width: layar.width, height: layar.height, borderRadius: 10, alignItems: 'center' }}>

                                                <View style={{ backgroundColor: '#fff', width: layar.width, height: Platform.OS == 'android' ? 80 : 80, flexDirection: 'row', justifyContent: "space-between", alignItems: 'center' }}>
                                                    <TouchableHighlight onPress={() => this.toggleModal2()} style={{ backgroundColor: '#fff', width: 80, height: 80, paddingTop: Platform.OS == 'android' ? 30 : 30, justifyContent: 'center', alignItems: 'center' }}>
                                                        <Icon size={40} name='ios-close' color={'black'} />
                                                    </TouchableHighlight>
                                                    <View style={{ backgroundColor: '#fff', width: 150, height: 80, paddingTop: Platform.OS == 'android' ? 30 : 30, justifyContent: 'center', alignItems: 'center' }}>
                                                        <Text style={{ color: "#00000", fontWeight: '500', fontSize: 20 }}>Verifikasi</Text>
                                                    </View>
                                                    <View style={{ backgroundColor: '#fff', width: 80, height: 80, paddingTop: Platform.OS == 'android' ? 10 : 20, justifyContent: 'center', alignItems: 'center' }}>
                                                        <Text style={{ color: "#00000", fontWeight: '500', fontSize: 20 }} onPress={() => this.props.navigation.navigate("Register")}>Daftar</Text>
                                                    </View>
                                                </View>
                                                <View style={{ width: layar.width, backgroundColor: '#dcdcdc', height: 1 }}></View>
                                                <View style={{ backgroundColor: '#fff', width: layar.width, height: 70, alignItems: "center", justifyContent: 'center' }}>
                                                    <Text style={{ fontWeight: 'bold', fontSize: 20, marginTop: 35 }}>Pilih Metode Verifikasi</Text>
                                                </View>
                                                <View style={{ backgroundColor: '#fff', width: layar.width - 50, height: 70, alignItems: "center" }}>
                                                    <Text style={{ marginTop: 16, textAlign: 'center' }}>Pilih Salah Satu Metode Di Bawah Ini Untuk  Mendapatkan Kode Verifikasi</Text>
                                                </View>
                                                <View style={{ backgroundColor: '#fff', width: layar.width, height: 190, alignItems: "center", paddingTop: 10 }}>
                                                    <TouchableOpacity style={Platform.OS == "ios" ? styles.but : styles.but2} onPress={() => this.sms()}>
                                                        <View style={{ backgroundColor: '#fff', width: 55, height: 55, alignItems: 'center', justifyContent: 'center', marginLeft: 2 }}>
                                                            <Image style={{ height: 30, width: 30 }} source={{ uri: 'https://cdn.onlinewebfonts.com/svg/img_167300.png' }} />
                                                        </View>
                                                        <Text style={{ fontSize: 16 }}>Melalui SMS Ke 085939623506</Text>
                                                        <View style={{ backgroundColor: '#fff', width: 20, height: 20, marginRight: 2 }}></View>

                                                    </TouchableOpacity>

                                                    <TouchableOpacity style={Platform.OS == "ios" ? styles.but : styles.but2} onPress={() => this.whatsApp()}>
                                                        <View style={{ backgroundColor: '#fff', width: 55, height: 55, alignItems: 'center', justifyContent: 'center', marginLeft: 2 }}>
                                                            <Image style={{ height: 30, width: 30 }} source={{ uri: 'https://cdn2.iconfinder.com/data/icons/social-icons-33/128/WhatsApp-512.png' }} />
                                                        </View>
                                                        <Text style={{ fontSize: 16 }}>Melalui WhatsApp Ke 085939623506</Text>
                                                        <View style={{ backgroundColor: '#fff', width: 20, height: 20, marginRight: 2 }}></View>

                                                    </TouchableOpacity>
                                                </View>
                                            </View>

                                        </View>
                                    </Modal>
                                </View>


                            </ImageBackground>
                        </View>
                    </View>
                </Modal>
                <Text>Anda Blm Login</Text>
            </View>
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
