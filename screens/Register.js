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

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            errorEmail: ''
        }
    }

    static navigationOptions = {
        title: "Register",
        headerLeft: null
    }

    handleViewRef = ref => this.view = ref;

    save() {
        if (this.state.email.length == 0 ) {
            this.setState({ errorEmail: 'Email Tidak Boleh Kosong' });
            this.view.bounce(800).then(endState => console.log(endState.finished ? 'bounce finished' : 'bounce cancelled'));
        } else if(this.state.email.search("@") == -1) {
            this.setState({ errorEmail: 'Format Email Salah' });
            this.view.bounce(800).then(endState => console.log(endState.finished ? 'bounce finished' : 'bounce cancelled'));
        } else {
            fetch('http://192.168.1.5:3000/emailVerification', {
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
                if(responseJson == "berhasil") {
                    Alert.alert(
                        this.state.email,
                        'Apakah Email Yang Anda Masukan Sudah benar?',
                        [
                            { text: 'Koreksi', onPress: () => console.log('Ask me later pressed') },
        
                            { text: 'Benar', onPress: () => this.props.navigation.navigate("Regis2", { email: this.state.email }) },
                        ],
                        { cancelable: false },
                    );
                } else {
                    Alert.alert(
                        this.state.email,
                        'Email Sudah Terdaftar',
                        [
                            { text: 'Koreksi', onPress: () => console.log('Ask me later pressed') },
        
                            { text: 'Login', onPress: () => this.props.navigation.navigate("Login") },
                        ],
                        { cancelable: false },
                    );
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
                </Animatable.View>
                

                <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.save()}>
                    <Text style={styles.loginText}>Register</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonContainer} onPress={() => this.props.navigation.navigate("Login")}>
                    <Text style={styles.btnText}>Login</Text>
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