import React from 'react';
import {View, Text, StyleSheet} from "react-native";
import { Button, Card} from 'react-native-elements';

export default class Profile extends React.Component {

    constructor(props) {
        super(props);
      }        
   
    render() {
        return (

            <View>
                 <Card>
            <Card.Title>Home</Card.Title>
            <Card.Divider/>
            </Card>
            <Text>Upcoming</Text>
              <Card>
              <Card.Title>Drop in Visits</Card.Title>
              <Card.Divider/>
              </Card>


              <View style={styles.services}
              >
                 <Card>
                <Card.Title>Past Visit</Card.Title>
                <Card.Divider/>
                </Card>
                  <Card>
                  <Card.Title>Past Visit</Card.Title>
                  <Card.Divider/>
                  </Card>
            </View>               
                  <Button  title="More Info"/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    title:{
        flex: 1,
        alignItems: 'center',
        fontSize: 45,
        fontWeight: "600",
        color: '#FFFFFF',
        marginTop: 75,
      },
      services: {
        justifyContent: 'center',
        flexDirection: 'row',
        marginBottom: 10
    },
})