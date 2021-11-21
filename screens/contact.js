import React from 'react';
import {View, StyleSheet} from "react-native";
import { Button, Input, Text } from 'react-native-elements';

export default class Contact extends React.Component {

    constructor(props) {
        super(props);
      }        
   
    render() {
        return (
            <View style={styles.form}>
                <Text>Wanna Chat?</Text>
                <Text>Send me a personal email</Text>
                        <Text>Name</Text>
                        <Input placeholder='BASIC INPUT' />
                        <Text>Email</Text>
                        <Input placeholder='BASIC INPUT' />
                        <Text>Subject</Text>
                        <Input placeholder='BASIC INPUT' />
                        <Text>Message</Text>
                        <Input placeholder='BASIC INPUT' />
                 <Button title="Submit"></Button>
                </View>
        )
    }
}

const styles = StyleSheet.create({
    form: {
        flexDirection: 'column'
    }
})