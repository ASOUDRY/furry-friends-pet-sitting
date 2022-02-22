import React from 'react';
import {View} from "react-native";
import {Button, Card, Text} from 'react-native-elements'

const otherReview = ({navigation, route}) => {
    let value = Object.entries(route.params.oldDoc)
    return (
      <View>
        <Button 
          onPress={() => navigation.navigate('Profile')}
          title="Back" />
          {
            value.map((key) => {
              let {animals, endDate, location, startDate} = key[1]
              let anim = Object.entries(animals);
                return (
                    <Card>
                   <Text>{location}</Text>
                   {
                     anim.map((i) => {
                       console.log(i)
                       return (
                         <Text>{i[1].number + ' ' + i[0]}</Text>
                       )
                     })
                   }
                   <Text>{startDate}</Text>
                   <Text>{endDate}</Text>
                </Card>
                )
            })  
          }
      </View>
    );
}

export default otherReview;