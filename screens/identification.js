import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../stack/home';
import Contact from '../stack/contact';
import ReviewPage from '../stack/reviewpage';
import Registration from '../identification/register';
import Login from '../identification/login';

const Identification = () => {
      const Stack = createStackNavigator();
    return (
            <Stack.Navigator >
            <Stack.Screen
                name="Login"
                component={Login}
                options={{headerShown: false, title: "Login"}}
            />
             <Stack.Screen
        name="Registration"
        component={Registration}
        options={{headerShown: false}}
       />
            </Stack.Navigator>
    )
}

export default Identification