import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import Login from './components/Login';
import MoviePage from './components/MoviePage';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
// import RegisterPage from './components/RegisterPage';
import RegisterForm from './components/RegisterForm';
import OtpPage from './components/OtpPage';
import Dashboard from './components/Dashboard';
import DashboardDesigner from './components/DashboardDesigner';



const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="LandingPage" component={LandingPage} />
        <Stack.Screen name="LoginPage" component={LoginPage} />
        <Stack.Screen name="RegisterForm" component={RegisterForm} />
        <Stack.Screen name="OtpPage" component={OtpPage} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="DashboardDesigner" component={DashboardDesigner} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}