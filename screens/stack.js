import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../stack/home';
import Contact from '../stack/contact';
import ReviewPage from '../stack/reviewpage';
import Reviewform from '../stack/reviewform';

const Stack = ({navigation}) => {
      const Stack = createStackNavigator();
    return (
            <Stack.Navigator 
            screenOptions={{ headerShown: false }}
            >
            <Stack.Screen
                name="Home"
                component={Home}
            />
             <Stack.Screen
        name="Contact"
        component={Contact}   
       />
         <Stack.Screen
        name="Reviews"
        component={ReviewPage}      
       />
         <Stack.Screen
        name="Reviewform"
        component={Reviewform}
       />     
            </Stack.Navigator>
    )
}

export default Stack