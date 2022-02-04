import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../stack/home';
import Contact from '../stack/contact';
import ReviewPage from '../stack/reviewpage';


const Stack = () => {
      const Stack = createStackNavigator();
    return (
      
            <Stack.Navigator >
            <Stack.Screen
                name="Home"
                component={Home}
                options={{headerShown: false}}
            />
             <Stack.Screen
        name="Contact"
        component={Contact}
        options={{headerShown: false}}
       />
         <Stack.Screen
        name="Reviews"
        component={ReviewPage}
        options={{headerShown: false}}
       />
            </Stack.Navigator>
       

    )
}

export default Stack