import React from 'react';
import { Button } from 'react-native-elements';
import { View, StyleSheet } from 'react-native';


const ServiceButton = (props) => {

    return (
        <View>
            <Button title={props.title}
            containerStyle={styles.button}
            
            />
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'black',
        color: 'black',
        borderWidth: 2,
        borderColor: 'white',
        borderRadius: 30,
    }
})

export {ServiceButton}