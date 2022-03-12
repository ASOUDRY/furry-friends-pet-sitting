import React, {useState, useEffect, useReducer, createContext, useMemo} from 'react';
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
import { Button, Text } from 'react-native-elements';
import { signOut } from '@firebase/auth'

export const UserContext = createContext();

export default function App() {

  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'SIGN_IN':
          return {
            ...prevState,
            loggedIn: true,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            loggedIn: false,
          };
      }
    },
    {
      loggedIn: false,
    }
  );

  const authContext = useMemo(
    () => ({
      signIn: async (data) => {
        dispatch({ type: 'SIGN_IN' });
      },
      signingOut: () => dispatch({ type: 'SIGN_OUT' }),
    }),
    []
  );

  useEffect(() => {
    restoreToken()
    return () => {

    } ;
  },[])
  
  const restoreToken = async () => {
    const value = await AsyncStorage.getItem('@storage_Key')
    console.log("this is " + value)
    if (value) {
      dispatch({ type: 'SIGN_IN' })
    } 
  }

  const loggingOut = async () => {
    const value = await AsyncStorage.removeItem('@storage_Key')
    console.log("storage key is now " + value )
    await signOut(auth)
    dispatch({ type: 'SIGN_OUT' })
  }

  const Drawer = createDrawerNavigator();
  return (
    <NavigationContainer>
      <UserContext.Provider value={authContext}>
<Drawer.Navigator>
    {state.loggedIn === true ? (
      <>
       <Drawer.Screen
         name="Stack"
         component={Stack}
         options={{headerShown: false, title: "Home"
        }}
         />
        <Drawer.Screen
          name="Profile"
          component={Profile}
          options={{
            headerRight: () => (
                  <Button
                    onPress={() => {
                      loggingOut()
                    }}
                    title="Log out"
                    color="#fff"
                  />
                ),
          }}
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
         options={{headerShown: false,
          title: "Home"
        }}
         />
           <Drawer.Screen
         name="Identification"
         component={Identification}
         options={{headerShown: false}}
         />
     </>
     
    )}
  </Drawer.Navigator>
  </UserContext.Provider>
  </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  menu: {
      position: 'absolute',
      color: "black",
  }
})