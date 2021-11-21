import React from 'react';
import {View, StyleSheet} from "react-native";
import { Text, Button} from 'react-native-elements';

export default class Booking extends React.Component {
    render() {
        return (
    
                 <View>
                <Text>Where do you Live?</Text>
                <Text>What kind of Pets do you have?</Text>
                <Text>What services do you need?</Text>
                <Text>What dates will you need?</Text>
                <Button title="Profile"  onPress={() => this.props.navigation.navigate('Profile')}></Button>
                <Button title="Go Home"
                onPress={() => this.props.navigation.navigate('Home')}
                ></Button>
                </View>
           
        )
    }
}

const styles = StyleSheet.create({
    form: {
        flexDirection: 'column'
    }
})