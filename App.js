import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
//import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

import Icon from 'react-native-vector-icons/Ionicons';

import Home from './screens/Home';
import Login from './screens/Login';
import Kategori from './screens/Kategori';
import Search from './screens/Search';
import Profil from './screens/Profil';
import Pesanan from './screens/Pesanan';
import AuthLoading from './screens/AuthLoading';
//import Payment from './screens/Payment';

//Home
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
});

const ProfilStack = createStackNavigator({
  Profil: Profil,
  Login: Login
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
      
      return <Icon size={24}  name='md-home' color={tintColor}  />;
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
      
      return <Icon size={24}  name='ios-albums' color={tintColor}  />;
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
      
      return <Icon size={24}  name='md-search' color={tintColor}  />;
    },
  };
};

PesananStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
    tabBarLabel: 'Pesanan',   
    tabBarBadge: 3, 
    tabBarIcon: ({ focused, horizontal, tintColor }) => {
      
      return <Icon size={24}  name='ios-cart' color={tintColor}  />;
    },
  };
};

ProfilStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 1) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
    tabBarLabel: 'Profil',    
    tabBarIcon: ({ focused, horizontal, tintColor }) => {
      
      return <Icon size={24}  name='ios-contact' color={tintColor}  />;
    },
  };
};

//tab
const Tab = createMaterialBottomTabNavigator({
  HomeStack: HomeStack,
  KategoriStack: KategoriStack,
  SearchStack: SearchStack,
  PesananStack: PesananStack,
  ProfilStack: ProfilStack,
}, {
  initialRouteName: 'HomeStack',
  activeColor: '#8b0000',
  inactiveColor: '#dcdcdc',
  shifting: true,
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
