import React from 'react';
import {View, StyleSheet} from "react-native";
import { Rating, Input , Text, Button} from 'react-native-elements';

export default class Review extends React.Component {
    constructor(props) {
        super(props);
      }
      
    render() {
        return (
            <View>
                <Text style={styles.text}>Select your Rating.</Text>
                <Rating showRating startingValue="{3}" />
                <Input placeholder='BASIC INPUT' />
                 <Button title="Submit"></Button>
              
            </View>
        )
    }
}

const styles = StyleSheet.create({
    text: {
        textAlign: 'center'
    },
    form: {
        flexDirection: 'column'
    }
})