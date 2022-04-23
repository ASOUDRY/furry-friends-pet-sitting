import React from 'react';
import {ScrollView, View, TouchableOpacity, Image} from "react-native";
import {Text, Card } from 'react-native-elements';
import { AirbnbRating } from 'react-native-ratings';



const ReviewPage = ({navigation, route}) => {

const saveData = route.params.reviewData

console.log(saveData)
        return (   
            <ScrollView
            style={{backgroundColor: '#F2F5EE'}}
            >

<View
          style={{flexDirection: 'row', alignContent: 'center', 
        }}
          >
           
           <TouchableOpacity
                           onPress={() => {
                            navigation.goBack()
                        }}
                     style={{       
                    height: 50,
                    marginLeft: 20,
                    alignItems:'center',
                    justifyContent:'center'
                  }}
                          >
                              <Image
                              style={{  
                                height: 35,
                                width: 25
                            }}
                               source={require('../assets/arrow_left.png')}
                              ></Image>
                          </TouchableOpacity>

          <Text
          style={{ marginLeft: 40}}
          h1 >Other Reviews</Text>
          </View>
                {
                saveData.map((review) => {
                    return (
                        <Card
                        containerStyle={{borderRadius: 20}}
                        >
                            <Text
                             style={{ 
                                 fontWeight: 'bold',
                                 textAlign: 'center'
                            }}
                         >
                            
                            {review.Name}</Text>
                            <Text>{review.Message}</Text>
                            <View
                            style={{flexDirection: 'row',
                                justifyContent: 'flex-end'}}
                            >
                                <AirbnbRating
                                size={15}
                                isDisabled={true}
                                showRating={false}
                                count={5}
                                defaultRating={review.Rating}
                            />
                            </View> 
                        </Card>
                        )
                    })
                }
            </ScrollView>
        )
    }
    
export default ReviewPage