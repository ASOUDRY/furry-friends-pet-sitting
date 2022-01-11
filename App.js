import React from 'react';
import {LogBox, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import 'react-native-gesture-handler';
import Profile from './screens/profile';
import Registration from './screens/register';
import Login from './screens/login';
import Schedule from './screens/schedule'
import Stack from './stack';


export default function App() {
  LogBox.ignoreAllLogs()
  const Drawer = createDrawerNavigator();
  return (
    <NavigationContainer>
    <Drawer.Navigator initialRouteName="Login">
    <Drawer.Screen
      name="Stack"
      component={Stack}
     //  options={{ title: 'Home', }}
      // options={{ headerShown: false }}
      />
     <Drawer.Screen
       name="Profile"
       component={Profile}
      />
       <Drawer.Screen
       name="Login"
       component={Login}
      />
      <Drawer.Screen
      name="Registration"
      component={Registration}
      />
      <Drawer.Screen
       name="Schedule"
       component={Schedule}
      />
    </Drawer.Navigator>
  </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  menu: {
      position: 'absolute',
      color: "black",
  }
})