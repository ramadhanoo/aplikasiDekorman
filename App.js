import React, { Component } from 'react';

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
//import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import User from './config/User';

import Home from './screens/Home';
import Login from './screens/Login';
import Kategori from './screens/Kategori';
import Search from './screens/Search';
import Profil from './screens/Profil';
import Pesanan from './screens/Pesanan';
import AuthLoading from './screens/AuthLoading';
import Pesananblmlogin from './screens/Pesananblmlogin';
import Register from './screens/Register';
import Regis2 from './screens/Regis2';
import Finalregis from './screens/Finalregis';
import Phonenumber from './screens/Phonenumber';
import PhoneNumberRegis from './screens/PhoneNumberRegis';
import NomorFinal from './screens/NomorFinal';
import Lupapass1 from './screens/Lupapass1';
import Lupapass2 from './screens/Lupapass2';
import Lupapass3 from './screens/Lupapass3';
import { Avatar } from 'react-native-paper';
import Data from './config/Data';
//import Payment from './screens/Payment';


//console.log(User);
//console.log(User);
//Home

var coba = async () => {
  try {
    const userToken = await AsyncStorage.getItem('user');
    let jsonObject = JSON.parse(userToken);
    var ini;
    if (jsonObject != null) {
      ini = false
    } else {
      ini = false
    }
    return ini;
  } catch (error) {

  }
}









const HomeStack = createStackNavigator({
  Home: Home,
});

//kategori
const KategoriStack = createStackNavigator({
  Kategori: Kategori,
});

//pesanan
const PesananStack = createStackNavigator({
  Pesanan: Pesanan,
  Pesananblmlogin: Pesananblmlogin
});

const ProfilStack = createStackNavigator({
  Profil: Profil,
  Login: Login,
  Register: Register,
  Regis2: Regis2,
  Finalregis: Finalregis,
  Phonenumber: Phonenumber,
  PhoneNumberRegis: PhoneNumberRegis,
  NomorFinal: NomorFinal,
  Lupapass1: Lupapass1,
  Lupapass2: Lupapass2,
  Lupapass3: Lupapass3
});

const SearchStack = createStackNavigator({
  Search: Search,
});


//seting tab
HomeStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }


  return {
    tabBarVisible,
    tabBarLabel: 'Home',
    tabBarIcon: ({ focused, horizontal, tintColor }) => {

      return <Icon size={24} name='md-home' color={tintColor} />;
    },
  };
};

KategoriStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
    tabBarLabel: 'Kategori',
    tabBarIcon: ({ focused, horizontal, tintColor }) => {

      return <Icon size={24} name='ios-albums' color={tintColor} />;
    },
  };
};

SearchStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
    tabBarLabel: 'Search',
    tabBarIcon: ({ focused, horizontal, tintColor }) => {

      return <Icon size={24} name='md-search' color={tintColor} />;
    },
  };
};

PesananStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 1) {
    tabBarVisible = false;
    console.log(navigation.state.index);
  }

  return {
    tabBarVisible,
    tabBarLabel: 'Pesanan',
    tabBarBadge: 3,
    tabBarIcon: ({ focused, horizontal, tintColor }) => {

      return <Icon size={24} name='ios-cart' color={tintColor} />;
    },
    tabBarOnPress: async ({ navigation }) => {
      const userToken = await AsyncStorage.getItem('user');
      //console.log(userToken);
      if (userToken != null) {
        navigation.navigate("Pesanan");
      } else {
        navigation.navigate("Pesananblmlogin");
      }
    },
  };
};

ProfilStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 4) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
    tabBarLabel: 'Profil',
    tabBarIcon: ({ focused, horizontal, tintColor }) => {

      return <Icon size={24} name='ios-contact' color={tintColor} />;
    },

    tabBarOnPress: async ({ navigation }) => {
      var userToken = await AsyncStorage.getItem('user');
      //console.log(userToken);
      if (userToken != null) {
        navigation.navigate("Profil");
      } else {
        navigation.navigate("Login");
      }
    }

  };
};

const Tab = createMaterialBottomTabNavigator(
  {
    HomeStack: HomeStack,
    KategoriStack: KategoriStack,
    SearchStack: SearchStack,
    PesananStack: PesananStack,
    ProfilStack: ProfilStack,
  }, {

  initialRouteName: 'HomeStack',
  activeColor: '#8b0000',
  inactiveColor: '#000000',
  resetOnBlur: true,
  shifting: true,
  labeled: true,
  barStyle: { backgroundColor: '#fff', paddingBottom: 10 }
})



export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoading,
      Tab: Tab
    },
    {
      initialRouteName: 'AuthLoading',
    }
  )
);
