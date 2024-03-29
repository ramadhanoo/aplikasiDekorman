import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Button,
    Dimensions,
    Image,
    TextInput,
    Platform,
    TouchableHighlight,
    ActivityIndicator
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import User from '../config/User';
import { Ip } from '../config/Ip';
import AsyncStorage from '@react-native-community/async-storage';
//https://www.pngitem.com/pimgs/m/12-127052_message-clipart-mail-symbol-transparent-background-red-email.png

const { height, width } = Dimensions.get('window');

export default class Phonenumber extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: props.navigation.getParam("email"),
            kode: '',
            verif: props.navigation.getParam("verif"),
            loading1: false,
            loadingFull: false
        };
    }

    static navigationOptions = {
        title: "Verifikasi Akun",
        headerBackTitle: null
    }

    componentDidMount() {
        
    }

    async kirimUlang() {
        this.setState({ loading1: true });
        fetch(`http://${Ip}:3000/kirimulangnomor`, {
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
 
                this.setState({ verif: responseJson, loading1: false })
                //this.props.navigation.navigate("Finalregis", { email: this.state.email, no_tlp: this.state.no_tlp, nama: this.state.nama, password: this.state.password, verif: responseJson });

            });
    }

    async proses() {

        var cod = parseInt(this.state.kode)
        console.log(typeof (cod));
        this.setState({ loading1: true })
        if (cod == this.state.verif) {
            alert("berhasil");
            return fetch(`http://${Ip}:3000/loginNumber`, {
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
                    if (responseJson == "gagal") {
                        alert("gagal")
                        this.setState({ loading1: false })
                        // this.view.bounce(800).then(endState => console.log(endState.finished ? 'bounce finished' : 'bounce cancelled'));
                        // this.setState({ errorPass: "Username Atau Password Salah" })
                    } else {
                        this.setState({ loading1: false })
                        console.log(responseJson[0]);
                        var data = {
                            id_user: responseJson[0].id_user ? responseJson[0].id_user : '',
                            username: responseJson[0].username ? responseJson[0].username : '',
                            email: responseJson[0].email ? responseJson[0].email : '',
                            password: responseJson[0].password ? responseJson[0].password : '',
                            jk: responseJson[0].jk ? responseJson[0].jk : '',
                            no_tlp: responseJson[0].no_tlp ? responseJson[0].no_tlp : '',
                            nama: responseJson[0].nama ? responseJson[0].nama : '',
                            alamat: responseJson[0].alamat ? responseJson[0].alamat : '',
                            avatar_user: responseJson[0].avatar_user ? responseJson[0].avatar_user : '',
                            loginWith: responseJson[0].loginWith ? responseJson[0].loginWith : '',
                        }

                        console.log("ini data");
                        console.log(data);

                        AsyncStorage.setItem('user', JSON.stringify(data));
                        User.id_user = responseJson[0].id_user ? responseJson[0].id_user : '';
                        User.username = responseJson[0].username ? responseJson[0].username : '';
                        User.email = responseJson[0].email ? responseJson[0].email : '';
                        User.password = responseJson[0].password ? responseJson[0].password : '';
                        User.jk = responseJson[0].jk ? responseJson[0].jk : '';
                        User.no_tlp = responseJson[0].no_tlp ? responseJson[0].no_tlp : '';
                        User.nama = responseJson[0].nama ? responseJson[0].nama : '';
                        User.alamat = responseJson[0].alamat ? responseJson[0].alamat : '';
                        User.avatar_user = responseJson[0].avatar_user ? responseJson[0].avatar_user : '';
                        User.loginWith = responseJson[0].loginWith ? responseJson[0].loginWith : '';

                        this.props.navigation.navigate("AuthLoading");
                    }
                });

        } else {
            alert("kode tidak valid");
            this.setState({ loading1: false })
        }

    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{ backgroundColor: '#fff', width: width, height: height / 3.90, alignItems: 'center', justifyContent: 'center', paddingTop: 50 }}>
                    <Image style={{ height: 250, width: 250, paddingTop: 70 }} source={{ uri: 'https://www.pngitem.com/pimgs/m/223-2238155_click-through-rates-on-mobile-sms-are-4x.png' }} />
                </View>
                <View style={{ backgroundColor: '#fff', width: width, height: 370, alignItems: 'center', paddingTop: 20 }}>
                    <View style={{ backgroundColor: '#fff', width: Platform.OS == "ios" ? width : width / 1.20, height: 100, alignItems: 'center' }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 17 }}>Verifikasi Nomer Telepon</Text>
                        <Text style={{ fontWeight: 'bold', color: '#696969', paddingTop: 20, textAlign: 'center' }}>Masukan 4 digit nomor yang telah kami kirim ke nomor 085939623506</Text>
                    </View>
                    <View style={{ backgroundColor: '#fff', width: width, height: Platform.OS == "ios" ? height / 12.90 : height / 6.90, alignItems: 'center' }}>
                        <TextInput placeholder="Masukan  Kode" onChangeText={(kode) => this.setState({ kode: kode })} />
                        <View style={{ backgroundColor: '#696969', width: width / 3.10, height: 1 }}></View>
                    </View>
                    <TouchableHighlight style={{ backgroundColor: '#8b0000', height: 50, width: width / 1.10, borderRadius: 15, alignItems: 'center', justifyContent: 'center' }} onPress={() => this.proses()}>
                    {this.state.loading1 ? (<ActivityIndicator size="small" color="#fff" />) : (<Text style={{ color: '#fff', fontWeight: '700' }}>Verifikasi</Text>)}
                    </TouchableHighlight>
                    <View style={{ backgroundColor: '#fff', width: width, height: Platform.OS == "ios" ? height / 7.90 : height / 12.10, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontWeight: 'bold', color: '#696969', paddingTop: 20, textAlign: 'center' }}>Anda Tidak Mendapatkan Kode?</Text>
                        <TouchableHighlight style={{ backgroundColor: '#fff', height: 20, width: 130 }} onPress={() => this.kirimUlang()}>
                            {this.state.loading1 ? (<ActivityIndicator size="small" color="#fff" />) : (<Text style={{ fontWeight: 'bold', color: '#8b0000', textAlign: 'center', paddingTop: 5 }}>kirim Ulang Kode</Text>)}
                        </TouchableHighlight>
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

    }
});
