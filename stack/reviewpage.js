import React from 'react';
import {ScrollView, StyleSheet} from "react-native";
import {Text, Card, Button} from 'react-native-elements';



const ReviewPage = ({navigation, route}) => {

const saveData = route.params.fetch

        return (   
            <ScrollView>
                 <Button 
          onPress={() => navigation.navigate('Home')}
          title="Back" />
                {
                saveData.map((review) => {
                    return (
                        <Card>
                            <Card.Title>{review.Title}</Card.Title>
                            <Text>{review.Message}</Text>
                        </Card>
                    
                    )
                })
                }
            </ScrollView>
        )
    }
    
const styles = StyleSheet.create({
    text: {
        textAlign: 'center'
    },
    form: {
        flexDirection: 'column'
    }
})

export default ReviewPage