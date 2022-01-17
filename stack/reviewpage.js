import React from 'react';
import {ScrollView, StyleSheet} from "react-native";
import {Text, Card} from 'react-native-elements';



const ReviewPage = (props) => {

const reviewData = props.route.params.fetch

        return (   
            <ScrollView>
                {
                reviewData.map((review) => {
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