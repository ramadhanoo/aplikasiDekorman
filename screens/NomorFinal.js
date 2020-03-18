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

const { height, width } = Dimensions.get("window");

export default class NomorFinal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            verif: props.navigation.getParam('verif'),
            email: props.navigation.getParam('email'),
            nama: '',
            disable: true,
            loading: false,
            loadingFull: false
        };
    }

    edit(nama) {
        this.setState({ disable: true })
        if (nama.length != 0) {
            this.setState({ nama: nama, disable: false })
        } else {
            console.log("masih kosong")
        }
    }

    proses() {
        //alert(this.state.nama);
        this.setState({ loading: true })
        return fetch(`http://${Ip}:3000/registerTelepon`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: this.state.email,
                nama: this.state.nama,
            })
        })
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson == "gagal") {
                    this.setState({ loading: false })
                    //this.view.bounce(800).then(endState => console.log(endState.finished ? 'bounce finished' : 'bounce cancelled'));
                    alert("User Tidak Di Temukan");
                } else {
                    //console.log(responseJson[0]);

                    console.log(responseJson);
                    var data = {
                        id_user: '',
                        username: '',
                        email: '',
                        password: '',
                        jk: '',
                        no_tlp: this.state.email,
                        nama: this.state.nama,
                        alamat: '',
                        avatar_user: '',
                    }

                    AsyncStorage.setItem('user', JSON.stringify(data));
                    User.id_user = '';
                    User.username = '';
                    User.email = '';
                    User.password = '';
                    User.jk = '';
                    User.no_tlp = this.state.email;
                    User.nama = this.state.nama;
                    User.alamat = '';
                    User.avatar_user = '';
                    this.setState({ loading: false });
                    this.props.navigation.navigate("AuthLoading");
                }
            });
    }

    render() {
        //alert(this.state.verif);
        //alert(this.state.email);
        return (
            <View style={styles.container}>
                <View style={{ backgroundColor: '#fff', width: layar.width, height: layar.height, borderRadius: 10, alignItems: 'center' }}>


                    <View style={{ width: layar.width, backgroundColor: '#dcdcdc', height: 1 }}></View>
                    <View style={{ backgroundColor: '#fff', width: layar.width / 1.20, height: 170, alignItems: "", justifyContent: 'center' }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 30, marginTop: 35, textAlign: 'auto' }}>Silahkan</Text>
                        <Text style={{ fontWeight: 'bold', fontSize: 30, textAlign: 'auto' }}>Masukan Nama Lengkap Anda</Text>
                    </View>
                    <View style={{ backgroundColor: '#fff', width: layar.width / 1.20, height: 20 }}>



                    </View>
                    <View style={{ backgroundColor: '#fff', width: layar.width / 1.20, height: 190 }}>
                        <View style={{ backgroundColor: '#fff', flexDirection: 'row' }}>
                            <View style={{ width: 50, height: 50, backgroundColor: '#fff', borderRadius: 25, justifyContent: 'center', alignItems: 'center', shadowColor: '#dcdc', shadowOffset: { width: 1, height: 1 }, shadowOpacity: 10, shadowRadius: 5, marginRight: 10 }}>
                                <Image style={{ height: 30, width: 30 }} source={{ uri: 'https://www.utm.my/isikl/files/2015/10/silhouette.png' }} />
                            </View>
                            <View style={{ backgroundColor: '#fff', width: layar.width / 1.10, justifyContent: 'center' }}>
                                <TextInput placeholder={"Masukan Nama"} textContentType='givenName' selectionColor='#8b0000' scrollEnabled={true} textBreakStrategy="balanced" style={{ fontSize: 20, fontWeight: '400', borderColor: '#dcdcdc', paddingTop: 10 }} allowFontScaling={true} onChangeText={(nama) => this.edit(nama)} />
                                <View style={{ backgroundColor: '#dcdcdc', height: 1, marginTop: 10, width: layar.width / 1.48 }}></View>
                                <View style={{ backgroundColor: '#fff', height: 20, marginTop: 10, width: layar.width / 1.48 }}>
                                    <Text style={{ marginTop: 5, textAlign: 'right', fontWeight: '400' }}>*Masukan Nama Asli Anda</Text>
                                </View>
                            </View>

                        </View>


                        <View style={{ width: layar.width / 1.20, backgroundColor: '#fff', height: 200, marginTop: 10 }}>
                            <TouchableOpacity style={!this.state.disable ? styles.buttonDisable : styles.buttonTdkDisable} onPress={() => this.proses()} disabled={this.state.disable}>
                            {this.state.loading ? (<ActivityIndicator size="small" color="#fff" />) : (<Text style={{ fontWeight: 'bold', color: '#fff' }}>Selesai</Text>)}
                            </TouchableOpacity>
                        </View>



                    </View>
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center'
    },
    buttonDisable: {
        width: layar.width / 1.20,
        backgroundColor: '#8b0000',
        height: 50,
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5
    },
    buttonTdkDisable: {
        width: layar.width / 1.20,
        backgroundColor: '#dcdcdc',
        height: 50,
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5
    },

})