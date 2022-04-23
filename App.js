import React, {useEffect, useReducer, createContext, useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import 'react-native-gesture-handler';
import Profile from './screens/profile';
import Schedule from './screens/schedule'
import Stack from './screens/stack';
import Identification from './screens/identification';
import { auth } from './components/firebase.js'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from 'react-native-elements';
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
    
    if (auth.currentUser) {
    if (value) {
      dispatch({ type: 'SIGN_IN' })
    } 
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
<Drawer.Navigator

screenOptions={
  {
    headerStyle: {backgroundColor: '#F2F5EE', },
    headerShadowVisible: true,
    headerTitle: '',
    headerRight: () => (
      <Button
        onPress={() => {
          loggingOut()
        }}
        buttonStyle={styles.addButton}
        titleStyle={{color: 'black'}}
        title="Log Out"
      />
    ),
  }
}
>
    {state.loggedIn === true ? (
      <>
          <Drawer.Screen
         name="Stack"
         component={Stack}
         />

         <Drawer.Screen
          name="Schedule"
          component={Schedule}
         />

<Drawer.Screen
          name="Visit Info"
          component={Profile}
         />
      </>  
    ) : (
     <>
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
  addButton: {
    
    height: 35,
    width: 110,
    backgroundColor: '#6F7643',
    borderRadius: 10,
    marginBottom: 25,
    marginTop: 20
  }
})