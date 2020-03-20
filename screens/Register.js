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

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            errorEmail: '',
            emailval: false,
            isModalSms: false,
            verif: '',
            loading: false,
            loadingFull: false
        }
    }

    static navigationOptions = {
        title: "Register",
        headerLeft: null
    }

    handleViewRef = ref => this.view = ref;

    toggleModal2 = () => {
        this.setState({ isModalSms: !this.state.isModalSms });
    };

    validateEmail(email) {

        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let reg = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

        if (re.test(email)) {
            this.setState({ emailval: true, errorEmail: '', email: email })
        } else if (email.length == 0) {
            this.setState({ errorEmail: '' });
            //this.view.bounce(800).then(endState => console.log(endState.finished ? 'bounce finished' : 'bounce cancelled'));
        } else if (reg.test(email)) {
            this.setState({ errorEmail: '', emailval: true, email: email });
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

    async saveNomer() {
        this.setState({ loading: true })
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
                if (responseJson == "berhasil") {
                    Alert.alert(
                        this.state.email,
                        'Apakah Nomer Yang Anda Masukan Sudah benar?',
                        [
                            { text: 'Koreksi', onPress: () => this.setState({ loading: false }) },

                            { text: 'Benar', onPress: () => this.setState({ isModalSms: true, loading: false }) },
                        ],
                        { cancelable: false },
                    );
                } else {
                    Alert.alert(
                        this.state.email,
                        'Nomer Telepon Sudah Terdaftar',
                        [
                            { text: 'Koreksi', onPress: () => this.setState({ loading: false }) },

                            { text: 'Login', onPress: () => this.balikLogin() },
                        ],
                        { cancelable: false },
                    );
                }
            });
    }

    async valid() {
        // buat konstruktor RegExp
        //var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        //let reg = /^[0-9]|08[0-9]{9,}$/
        let reg = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (reg.test(this.state.email)) {

            this.saveNomer();
        } else if (re.test(this.state.email)) {
            this.save();
        } else {
            if (this.state.email.length == 0) {
                this.setState({ errorEmail: 'Email Tidak Boleh Kosong' });
                this.view.bounce(800).then(endState => console.log(endState.finished ? 'bounce finished' : 'bounce cancelled'));
            }
        }
    }

    validateEmail(email) {
        this.setState({ emailval: false });
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let reg = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

        if (re.test(email)) {
            this.setState({ emailval: true, errorEmail: '', email: email })
        } else if (email.length == 0) {
            this.setState({ errorEmail: '' });
            //this.view.bounce(800).then(endState => console.log(endState.finished ? 'bounce finished' : 'bounce cancelled'));
        } else if (reg.test(email)) {
            this.setState({ errorEmail: '', emailval: true, email: email });
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

    lanjutRegis2() {
        this.setState({ loading: false });
        this.props.navigation.navigate("Regis2", { email: this.state.email });
    }

    balikLogin() {
        this.setState({ loading: false });
        this.props.navigation.navigate("Login");
    }

    save() {
        this.setState({ loading: true })
        if (this.state.email.length == 0) {
            this.setState({ errorEmail: 'Email Tidak Boleh Kosong', loading: false });
            this.view.bounce(800).then(endState => console.log(endState.finished ? 'bounce finished' : 'bounce cancelled'));
        } else if (this.state.email.search("@") == -1) {
            this.setState({ errorEmail: 'Format Email Salah', loading: false });
            this.view.bounce(800).then(endState => console.log(endState.finished ? 'bounce finished' : 'bounce cancelled'));
        } else {
            fetch(`http://${Ip}:3000/emailVerification`, {
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
                            'Apakah Email Yang Anda Masukan Sudah benar?',
                            [
                                { text: 'Koreksi', onPress: () => this.setState({ loading: false }) },

                                { text: 'Benar', onPress: () => this.lanjutRegis2() },
                            ],
                            { cancelable: false },
                        );
                    } else {
                        Alert.alert(
                            this.state.email,
                            'Email Sudah Terdaftar',
                            [
                                { text: 'Koreksi', onPress: () => this.setState({ loading: false }) },

                                { text: 'Login', onPress: () => this.balikLogin() },
                            ],
                            { cancelable: false },
                        );
                    }
                });
        }


    }

    whatsApp() {
        alert("whatsapp")
    }

    async sms() {
        this.setState({ loading: true });
        fetch(`http://${Ip}:3000/sms`, {
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
                if (responseJson != 'gagal') {
                    this.setState({ isModalSms: false, verif: responseJson, loading: false })
                    this.props.navigation.navigate("PhoneNumberRegis", { verif: this.state.verif, email: this.state.email });
                } else {
                    this.setState({ loading: false });
                    alert("error");
                }
                //this.props.navigation.navigate("Finalregis", { email: this.state.email, no_tlp: this.state.no_tlp, nama: this.state.nama, password: this.state.password, verif: responseJson });

            });


    }

    render() {
        return (
            <ImageBackground source={require("../images/dio.jpg")} style={styles.container}>
                <View>
                    <Animatable.View ref={this.handleViewRef}>
                        <View style={styles.inputContainer}>
                            <TextInput style={styles.inputs}
                                placeholder="Email Atau Nomer Telepon"
                                underlineColorAndroid='transparent'
                                onChangeText={(email) => this.validateEmail(email)} />
                            <Image style={styles.inputIcon} source={{ uri: 'https://www.utm.my/isikl/files/2015/10/silhouette.png' }} />
                        </View>
                        {this.state.errorEmail != '' ? <Text style={{ color: "red", fontWeight: 'bold', textAlign: 'right', paddingBottom: 20 }}>{this.state.errorEmail}</Text> : null}
                    </Animatable.View>


                    <TouchableOpacity style={this.state.emailval == true ? [styles.buttonContainer, styles.loginButton] : [styles.buttonContainer, styles.loginButton2]} onPress={() => this.valid()} disabled={this.state.loading == false ? false : true}>
                        {this.state.loading ? (<ActivityIndicator size="small" color="#fff" />) : (<Text style={styles.loginText}>Register</Text>)}
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttonContainer} onPress={() => this.props.navigation.navigate("Login")}>
                        <Text style={styles.btnText}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonContainer1} onPress={() => this.props.navigation.navigate("Login")}>
                        <Text style={styles.btnText}>Lupa Password?</Text>
                    </TouchableOpacity>

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
                                    <View style={{ backgroundColor: '#fff', width: 80, height: 80, paddingTop: Platform.OS == 'android' ? 30 : 30, justifyContent: 'center', alignItems: 'center' }} onPress={() => this.props.navigation.navigate("Login")}>
                                        <Text style={{ color: "#00000", fontWeight: '500', fontSize: 20 }} >Login</Text>
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
                    {this.state.loading ? (<ActivityIndicator size="small" color="#8b0000" />) : (<Text style={{ fontSize: 16 }}>Melalui SMS Ke {this.state.email}</Text>)}
                                        <View style={{ backgroundColor: '#fff', width: 20, height: 20, marginRight: 2 }}></View>

                                    </TouchableOpacity>

                                    <TouchableOpacity style={Platform.OS == "ios" ? styles.but : styles.but2} onPress={() => this.whatsApp()}>
                                        <View style={{ backgroundColor: '#fff', width: 55, height: 55, alignItems: 'center', justifyContent: 'center', marginLeft: 2 }}>
                                            <Image style={{ height: 30, width: 30 }} source={{ uri: 'https://cdn2.iconfinder.com/data/icons/social-icons-33/128/WhatsApp-512.png' }} />
                                        </View>
                                        <Text style={{ fontSize: 16 }}>Melalui WhatsApp Ke {this.state.email}</Text>
                                        <View style={{ backgroundColor: '#fff', width: 20, height: 20, marginRight: 2 }}></View>

                                    </TouchableOpacity>
                                </View>
                            </View>

                        </View>
                    </Modal>
                </View>

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