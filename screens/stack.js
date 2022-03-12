import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../stack/home';
import Contact from '../stack/contact';
import ReviewPage from '../stack/reviewpage';
import otherReview from './otherReview';
import { Button } from 'react-native-elements';



const Stack = ({navigation}) => {
      const Stack = createStackNavigator();
    return (
      
            <Stack.Navigator 
            screenOptions={
              {
                headerLeft: () => (
                    <Button 
                    type="clear"
                    onPress={() => {
                      navigation.toggleDrawer();
                    }}
                    icon={{
                      name: "bars",
                      type: 'font-awesome',
                      // size: 15,
                      color: 'dodgerblue',
                      // backgroundColor: 'white'
                    }}
                    />
                )
              }
            }
            >
            <Stack.Screen
                name="Home"
                component={Home}
                // options={}
            />
             <Stack.Screen
        name="Contact"
        component={Contact}
        // options={{headerShown: false}}
       />
         <Stack.Screen
        name="Reviews"
        component={ReviewPage}
        // options={{headerShown: false}}
       />
         <Stack.Screen
        name="OtherReview"
        component={otherReview}
        // options={{headerShown: false}}
       />
            </Stack.Navigator>
       

    )
}

export default Stack