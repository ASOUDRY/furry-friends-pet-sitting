import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import 'react-native-gesture-handler';
import Profile from './screens/profile';
import Schedule from './screens/schedule'
import Stack from './screens/stack';
import Identification from './screens/identification';
import { auth } from './components/firebase.js'
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function App() {
  const [run, setRun] = React.useState()
  useEffect(() => {
    test()
  }, [])
  
  const test = async () => {
    const value = await AsyncStorage.getItem('@storage_Key')
   setRun(value)
  }

  const Drawer = createDrawerNavigator();
  return (
    <NavigationContainer>
<Drawer.Navigator>
    {run ? (
      // No token found, user isn't signed in
      <>
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
      </>  
    ) : (
     <>
       <Drawer.Screen
         name="Stack"
         component={Stack}
         />
           <Drawer.Screen
         name="Identification"
         component={Identification}
         options={{headerShown: false, title: "Login"}}
         />
     </>
     
    )}
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