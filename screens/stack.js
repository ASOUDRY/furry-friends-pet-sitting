import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import Home from '../stack/home';
import Contact from '../stack/contact';
import ReviewPage from '../stack/reviewpage';


const Stack = () => {
  // let data = props.route.params.inReview
  // console.log(data)
      const Stack = createStackNavigator();
    return (
      
            <Stack.Navigator >
            <Stack.Screen
                name="Home"
                component={Home}
                // initialParams={id: "test"}
                options={{ headerShown: false }}
            />
             <Stack.Screen
        name="Contact"
        component={Contact}
        options={{ headerShown: false }}
       />
         <Stack.Screen
        name="Reviews"
        component={ReviewPage}
          options={{ title: 'More Reviews', }}
       />
            </Stack.Navigator>
       

    )
}

export default Stack