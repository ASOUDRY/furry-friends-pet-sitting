import React from 'react';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
// import { createStackNavigator } from '@react-navigation/stack';

import 'react-native-gesture-handler';

import Home from './screens/home';

import Profile from './screens/profile';
import Contact from './screens/contact';
import Login from './screens/login';
import Schedule from './screens/schedule'
import Review from './screens/review';

export default function App() {

  const Stack = createDrawerNavigator();
  return (
   <NavigationContainer>
     <Stack.Navigator initialRouteName="Home">
       <Stack.Screen
        name="Home"
        component={Home}
       />
       <Stack.Screen
       name="Review"
       component={Review}
       />
       <Stack.Screen
        name="Profile"
        component={Profile}
       />
       <Stack.Screen
        name="Contact"
        component={Contact}
       />
       <Stack.Screen
        name="Login"
        component={Login}
       />
       <Stack.Screen
        name="Schedule"
        component={Schedule}
       />
     </Stack.Navigator>
   </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  menu: {
      position: 'absolute',
      color: "black",
  }
})