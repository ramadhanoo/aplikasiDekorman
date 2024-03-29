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
//https://www.pngitem.com/pimgs/m/12-127052_message-clipart-mail-symbol-transparent-background-red-email.png
import { Ip } from '../config/Ip';

const { height, width } = Dimensions.get('window');

export default class Lupapass2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            kode: '',
            verif: props.navigation.getParam("verif"),
            email: props.navigation.getParam("email"),
            loading: false,
            loadingFull: false
        };
    }

    static navigationOptions = {
        title: "Verifikasi Akun",
        headerBackTitle: null
    }

    componentDidMount() {
        alert(this.state.verif);
    }

    async kirimUlang() {
        this.setState({ loading: true })
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
                alert(responseJson);
                this.setState({ verif: responseJson, loading: false })
                //this.props.navigation.navigate("Finalregis", { email: this.state.email, no_tlp: this.state.no_tlp, nama: this.state.nama, password: this.state.password, verif: responseJson });

            });
    }

    async proses() {
        
        var cod = parseInt(this.state.kode)
        console.log(typeof (cod));
        this.setState({ loading: true })
        if (cod == this.state.verif) {
            this.setState({ loading: false })
            this.props.navigation.navigate("Lupapass3", { email: this.state.email });
            
             
        } else {
            this.setState({ loading: false })
            alert("kode tidak valid");
            
        }

    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{ backgroundColor: '#fff', width: width, height: height / 3.90, alignItems: 'center', justifyContent: 'center', paddingTop: 50 }}>
                    <Image source={{ uri: "https://www.pngitem.com/pimgs/m/12-127052_message-clipart-mail-symbol-transparent-background-red-email.png" }} style={{ height: 200, width: 200, paddingTop: 70 }} />
                </View>
                <View style={{ backgroundColor: '#fff', width: width, height: 370, alignItems: 'center', paddingTop: 20 }}>
                    <View style={{ backgroundColor: '#fff', width: Platform.OS == "ios" ? width : width / 1.20, height: 100, alignItems: 'center' }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 17 }}>Verifikasi Email</Text>
                        <Text style={{ fontWeight: 'bold', color: '#696969', paddingTop: 20, textAlign: 'center' }}>Masukan 4 digit nomor yang telah kami kirim ke {this.state.email}</Text>
                    </View>
                    <View style={{ backgroundColor: '#fff', width: width, height: Platform.OS == "ios" ? height / 12.90 : height / 6.90, alignItems: 'center' }}>
                        <TextInput placeholder="Masukan  Kode" onChangeText={(kode) => this.setState({ kode: kode })} />
                        <View style={{ backgroundColor: '#696969', width: width / 3.10, height: 1 }}></View>
                    </View>
                    <TouchableHighlight style={{ backgroundColor: '#8b0000', height: 50, width: width / 1.10, borderRadius: 15, alignItems: 'center', justifyContent: 'center' }} onPress={() => this.proses()} disabled={this.state.loading == false ? false : true}>
                    {this.state.loading ? (<ActivityIndicator size="small" color="#fff" />) : (<Text style={{ color: '#fff', fontWeight: '700' }}>Verifikasi</Text>)}
                    </TouchableHighlight>
                    <View style={{ backgroundColor: '#fff', width: width, height: Platform.OS == "ios" ? height / 7.90 : height / 12.10, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontWeight: 'bold', color: '#696969', paddingTop: 20, textAlign: 'center' }}>Anda Tidak Mendapatkan Email?</Text>
                        <TouchableHighlight style={{ backgroundColor: '#fff', height: 20, width: 130 }} onPress={() => this.kirimUlang()}>
                        <Text style={{ fontWeight: 'bold', color: '#8b0000', textAlign: 'center', paddingTop: 5 }}>kirim Ulang Email</Text>
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
