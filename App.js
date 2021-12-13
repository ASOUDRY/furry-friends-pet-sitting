import React from 'react';
import Home from './screens/home';
import Booking from './screens/booking';
import Profile from './screens/profile';
import Contact from './screens/contact';
import Login from './screens/login';
import Calender from './screens/calender'
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Review from './screens/review';

export default function App() {
 
  const Stack = createStackNavigator();
  return (
   <NavigationContainer>
     <Stack.Navigator initialRouteName="Home">
       <Stack.Screen
        name="Home"
        component={Home}
       />
       <Stack.Screen
        name="Booking"
        component={Booking}
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
        name="Calendar"
        component={Calander}
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