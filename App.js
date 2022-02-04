import React from 'react';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import 'react-native-gesture-handler';
import Profile from './screens/profile';
import Schedule from './screens/schedule'
import Stack from './screens/stack';
import Identification from './screens/identification';


export default function App() {
  const Drawer = createDrawerNavigator();
  return (
    <NavigationContainer>
    <Drawer.Navigator initialRouteName="Stack">
    <Drawer.Screen
      name="Stack"
      component={Stack}
      />
     <Drawer.Screen
       name="Profile"
       component={Profile}
      />
      <Drawer.Screen
       name="Schedule"
       component={Schedule}
      />
      <Drawer.Screen
      name="Identification"
      component={Identification}
      options={{headerShown: false, title: "Login"}}
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