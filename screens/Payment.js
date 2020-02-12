import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import Midtrans from '@adrianha/react-native-midtrans';

const midtrans = new Midtrans({
  clientKey: 'SB-Mid-client-Ellc274P6h6HEUC6',
  baseUrl: 'http://192.168.1.7:3000/pay/',
  environment: Midtrans.ENVIRONMENT_SANDBOX,
  colorTheme: {
    primaryColor: '#dc143c',
  },
});


export default class Payment extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async prosses() {
    try {
      return fetch(`http://192.168.1.7:3000/pay`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: "dio",
          password: "data",
        }),
      })
        .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson);
          const result = midtrans.startPaymentWithSnapToken(responseJson);
          console.log({ result });
        });

    } catch (err) {
      alert(err);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.button1} onPress={() => this.prosses()}>
          <Text style={styles.text1}>Bismilah</Text>
        </TouchableOpacity>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  button1: {
    backgroundColor: 'red',
    height: 70,
    width: 150,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20
  },
  text1: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 17
  }
});
