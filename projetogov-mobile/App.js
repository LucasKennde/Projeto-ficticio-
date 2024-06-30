import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from './src/screens/login/login.jsx';
import Register from './src/screens/register/register.jsx';
import IndexAdmin from './src/screens/homeAdmin/home.jsx';
import IndexUser from './src/screens/homeUser/home.jsx'
import CadEnd from './src/screens/cadEnd/cadEnd.jsx';
import CadEco from './src/screens/cadEco/cadEco.jsx';
import AdmUser from './src/screens/admUser/admUser.jsx';
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="login">
        <Stack.Screen name="login" component={Login} options={{
          headerShown: false}}/>
        <Stack.Screen name="homeAdmin" component={IndexAdmin} options={{
          headerShown: false}}/>
        <Stack.Screen name="homeUser" component={IndexUser} options={{
          headerShown: false}}/>
        <Stack.Screen name="cadEnd" component={CadEnd} options={{
          headerShown: false}}/>
        <Stack.Screen name="cadEco" component={CadEco} options={{
          headerShown: false}}/>
        <Stack.Screen name="admUser" component={AdmUser} options={{
          headerShown: false}}/>
        <Stack.Screen name="register" component={Register} options={{
          headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}


