import React from 'react';
import {View, ScrollView, StyleSheet} from "react-native";
import { Button, Text, Card, Image } from 'react-native-elements';

export default class Home extends React.Component {

    constructor(props) {
        super(props);
      }        
   
    render() {
        return (
            <ScrollView>
                <View style={styles.services}>
                    <Button title="Solid Button" onPress={() => this.props.navigation.navigate('Booking')} />
                    <Button title="Profile"  onPress={() => this.props.navigation.navigate('Profile')}></Button>
                    <Button title="Login"  onPress={() => this.props.navigation.navigate('Login')}></Button>
                </View>
              
                <Text h2 style={styles.title}>Services</Text>

                <View style={styles.services}>
                    <Card>
                        <Card.Title>Walking</Card.Title>
                        <Card.Divider/>
                    </Card>
                    <Card>
                        <Card.Title>HouseVisit</Card.Title>
                        <Card.Divider/>
                    </Card>
                </View>
               
                <Text h2 style={styles.title} >Meet Your Caregiver</Text>

                <View style={styles.services}>
                    <Image source={{ uri: `../profile2.jpg` }} style={{ width: 200, height: 200, margin: 10  }} />
                    <View style={styles.care}>
                        <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                        est laborum.</Text>
                        <Button style={styles.learn} title="Learn More" 
                        onPress={() => this.props.navigation.navigate('Contact')}
                        />
                    </View>
                </View>
               
                <Text h2 style={styles.title} >Customer Reviews</Text>
                <View style={styles.services}>
                    <Card>
                        <Card.Title>Walking</Card.Title>
                        <Card.Divider/>
                    </Card>
                    <Card>
                        <Card.Title>HouseVisit</Card.Title>
                        <Card.Divider/>
                    </Card>
                </View>
                <View style={styles.services}>
                    <Button  title="Write a review" onPress={() => this.props.navigation.navigate('Review')}/>
                    <Button  title="More reviews"/>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    title: {
        color: 'red',
        textAlign: 'center'
    },
    user: {},
    services: {
        justifyContent: 'center',
        flexDirection: 'row',
        marginBottom: 10
    },
    care: {

        flexDirection: 'column',
        height: 200,
        width: 100,
        margin: 10
    },
    learn: {
        color: `red`,
        // backgroundColor: 'black',
        height: 50,
        fontSize: 2
    }
})
