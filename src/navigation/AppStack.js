import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import CustomDrawer from '../components/CustomDrawer';

import Ionicons from 'react-native-vector-icons/Ionicons';

import ProfileScreen from '../screens/ProfileScreen';
import MessagesScreen from '../screens/MessagesScreen';
import MomentsScreen from '../screens/MomentsScreen';
import SettingsScreen from '../screens/SettingsScreen';

import TabNavigator from './TabNavigator';
import OnboardingScreen from '../screens/OnboardingScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import GameDetailsScreen from '../screens/GameDetailsScreen';
import Terms from '../screens/Drawer/Terms';
import About from '../screens/Drawer/About';
import Contact from '../screens/Drawer/Contact';
import CategoryList from '../screens/CategoryList';
import NotificationScreen from '../screens/NotificationScreen';
import OrderStatus from '../screens/Drawer/OrderStatus';
import CartScreen from '../screens/CartScreen';
import CarouselScreen from '../screens/CarouselScreen';
import OrderList from '../screens/Drawer/OrderList';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Onboarding"
        component={OnboardingScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Home"
        component={TabNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CategoryList"
        component={CategoryList}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="NotificationScreen"
        component={NotificationScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CartScreen"
        component={CartScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CarouselScreen"
        component={CarouselScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="OrderList"
        component={OrderList}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="GameDetails"
        component={GameDetailsScreen}
        options={({route}) => ({
          title: route.params?.title,
        })}
      />
    </Stack.Navigator>
  );
};

const AuthStack = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: '#F00976',
        drawerActiveTintColor: '#fff',
        drawerInactiveTintColor: '#333',
        drawerLabelStyle: {
          marginLeft: -25,
          fontFamily: 'Roboto-Medium',
          fontSize: 15,
        },
      }}>
      <Drawer.Screen
        name="Home"
        component={HomeStack}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="home-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="person-outline" size={22} color={color} />
          ),
        }}
      />
      {/* <Drawer.Screen
        name="OrderStatus"
        component={OrderStatus}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="clipboard-outline" size={22} color={color} />
          ),
        }}
      /> */}
      {/* <Drawer.Screen
        name="About us"
        component={About}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="information-circle-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Terms & Conditions"
        component={Terms}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="information-circle-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Contact us"
        component={Contact}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="information-circle-outline" size={22} color={color} />
          ),
        }}
      /> */}
      {/* <Drawer.Screen
        name="Messages"
        component={MessagesScreen}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="chatbox-ellipses-outline" size={22} color={color} />
          ),
        }}
      /> */}
      {/* <Drawer.Screen
        name="Moments"
        component={MomentsScreen}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="timer-outline" size={22} color={color} />
          ),
        }}
      /> */}
      {/* <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="settings-outline" size={22} color={color} />
          ),
        }}
      /> */}
    </Drawer.Navigator>
  );
};

export default AuthStack;
