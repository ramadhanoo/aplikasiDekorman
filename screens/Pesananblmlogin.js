import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Modal,
    TouchableHighlight,
    Alert,
    Dimensions,
    ImageBackground,
    TextInput,
    Image,
    TouchableOpacity,
    AsyncStorage,
    Platform
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import User from '../config/User';
import * as Animatable from 'react-native-animatable';
const { height, width } = Dimensions.get("window");


export default class Pesananblmlogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            email: '',
            password: '',
            errorEmail: '',
            errorPass: ''
        };
    }

    static navigationOptions = {
        headerBackTitle: null,
        headerLeft: null,
        title: 'Pesanan',

    }


    handleViewRef = ref => this.view = ref;

    componentDidMount() {
        this.setState({ modalVisible: true })
    }


    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

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
            <View style={styles.container2}>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                    }}>
                    <View style={{ flex: 1, flexDirection: 'column' }}>
                        <View style={{ backgroundColor: '#fff', width: width, height: Platform.OS == 'android' ? 60 : 80, flexDirection: 'row', justifyContent: "space-between", alignItems: 'center' }}>
                            <TouchableHighlight onPress={() => this.setModalVisible(!this.state.modalVisible)} style={{ backgroundColor: '#fff', width: 80, height: 80, paddingTop: Platform.OS == 'android' ? 10 : 20, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ color: "#00000", fontWeight: '500', fontSize: 20 }}>Close</Text>
                            </TouchableHighlight>
                            <View style={{ backgroundColor: '#fff', width: 150, height: 80, paddingTop: Platform.OS == 'android' ? 10 : 20, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ color: "#00000", fontWeight: '500', fontSize: 20 }}>Login</Text>
                            </View>
                            <View style={{ backgroundColor: '#fff', width: 80, height: 80, paddingTop: Platform.OS == 'android' ? 10 : 20, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ color: "#00000", fontWeight: '500', fontSize: 20 }} onPress={() => this.props.navigation.navigate("Register")}>Daftar</Text>
                            </View>
                        </View>
                        <View style={{ width: width, backgroundColor: '#dcdcdc', height: 1 }}></View>
                        <View style={{ backgroundColor: '#fff', width: width, height: height }}>
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
    container2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        height: height,
        width: width
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        height: height,
        width: width,
        marginBottom: 100
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
        width: width,
        height: height,
        justifyContent: 'center',
    },
    btnText: {
        color: "white",
        fontWeight: 'bold'
    }
}); 
