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
    AsyncStorage,
    ActivityIndicator
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import User from '../config/User';
import { Ip } from '../config/Ip';
//https://www.pngitem.com/pimgs/m/12-127052_message-clipart-mail-symbol-transparent-background-red-email.png

const { height, width } = Dimensions.get('window');

export default class PhoneNumberRegis extends Component {
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
        alert(this.props.navigation.getParam("verif"));
    }

    async kirimUlang() {
        this.setState({ loading1: true })
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
                alert(responseJson);
                this.setState({ verif: responseJson, loading1: false })
                //this.props.navigation.navigate("Finalregis", { email: this.state.email, no_tlp: this.state.no_tlp, nama: this.state.nama, password: this.state.password, verif: responseJson });

            });
    }

    async proses() {

        var cod = parseInt(this.state.kode)
        console.log(typeof (cod));

        if (cod == this.state.verif) {
            
            this.props.navigation.navigate("NomorFinal", { email: this.state.email, verif: this.state.verif })
            
        } else {
            alert("kode tidak valid");
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
