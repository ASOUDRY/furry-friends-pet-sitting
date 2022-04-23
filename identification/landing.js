import React from 'react';
import { StyleSheet, Text,
    ImageBackground, Image, View 
  } from 'react-native';

const Landing = () => {
    return (
     
          <ImageBackground
       source={require(`../assets/landing_photo.jpg`)}
       style={styles.backImage}
       imageStyle={styles.fade}
       >
          <View 
          style={styles.fade}
          >
        <Image
        source={require(`../assets/Black_Logo.png`)}
        style={styles.image}
        />
         </View>
       </ImageBackground> 
    );
}

const styles = StyleSheet.create({
  
    backImage:{
      width: '100%',
      height: '100%',
    },
    fade:{
      ...StyleSheet.absoluteFillObject,
      backgroundColor: '#BEC3AA6E',
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',

    },
    image: {
    width: 400,
    height: 400,
    }
})

export default Landing;