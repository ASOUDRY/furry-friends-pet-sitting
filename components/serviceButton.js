import React, {useState} from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Text } from 'react-native';

const ServiceButton = ({title, returnvisit}) => {
    return (
        <View>
<TouchableOpacity
    onPress={() => {returnvisit(title)}} style={styles.button}
    >
        <Text>{title}</Text>
      </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    clicked: {
         backgroundColor: 'red',
         borderWidth: 2,
         borderColor: 'white',
         borderRadius: 30,
    },
    serviceButtonImage: {
        height: '80%',
        width: '70%',
      },
      button: {
        borderWidth: 2,
        borderColor: 'white',
        backgroundColor: 'white',
        borderRadius: 10,
        height: 45,
        width: 185,
        alignItems: "center",
        margin: 10,
        padding: 10
      },
})

export {ServiceButton}