import React, {useEffect, useState} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Registration from '../identification/register';
import Login from '../identification/login';
import Landing from '../identification/landing';

const Identification = () => {
    const [landingFade, setFade] = useState(false)

    useEffect(() => {
        console.log(landingFade)
     setTimeout(() => {setFade(true)
    }, 5000 )
      }, []);

      const forFade = ({ current }) => ({
        cardStyle: {
          opacity: current.progress,
        },
      });

      const Stack = createStackNavigator();
    return (
        <Stack.Navigator
        screenOptions={{
            cardStyleInterpolator: forFade
        }}>
{landingFade === false ? (
      <>
       <Stack.Screen
         name="Landing"
         component={Landing}
         options={{headerShown: false }}
         />
      </>  
    ) : (
     <>
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

     
       
     </>
    )}
            </Stack.Navigator>
    )
}

export default Identification