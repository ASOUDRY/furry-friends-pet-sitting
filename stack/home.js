import React, { useState, useEffect } from 'react';
import {View, ScrollView, StyleSheet, TouchableOpacity, Image} from "react-native";
import {Text, Card } from 'react-native-elements';
import { firestore } from '../components/firebase';
import {getDocs, collection} from 'firebase/firestore'
import {AirbnbRating } from 'react-native-ratings';

const Home = ({route, navigation}) => { 



  const [toggle, setToggle] = useState(false);

  const fetchdata = async () => {
    try {
      if (ReviewList.length != 0) {
        setReviewList([])
      }
     const querySnapshot = await getDocs(collection(firestore, "review"));
     querySnapshot.forEach((doc) => {
         const {Name, Message, Rating} = doc.data().data
         setReviewList((ReviewList) => [...ReviewList, {
             Message: Message,
             Name: Name,
             Rating: Rating
         }])
     });
    } catch (error) {
     console.error(error);      
 } 
}

const refreshState = () => {
  setToggle(!toggle)
 
}

useEffect(() => {
  fetchdata()
  console.log(ReviewList)
}, [toggle]);

    const [ReviewList, setReviewList] = useState([])
    const [walkingTab, setWalkingTab] = useState();

let colorStyle = () => {
  return {
    backgroundColor: 'white'
  }
}
      
  if (ReviewList.length <= 1) {
    return null;
  }
  else {
    return (
      <ScrollView
      style={styles.color}
      >
       
        <Text h2 style={styles.title2}>Services</Text>

        <View style={styles.services}>

            <TouchableOpacity  onPress={() => { setWalkingTab( "Your dog will get a walk around the neighborhood.I'll make sure they get the exercise they want and need."); }
          }
          style={styles.serviceButton}
          >
              <Image 
              style={styles.serviceButtonImage}
              source={require('../assets/Dog.png')} />
              <Text >Walking</Text>
            </TouchableOpacity>

            <TouchableOpacity  onPress={() => { setWalkingTab( "I will drop by multiple times during the day to play with your pets, feed them, give them potty breaks, or do anything else that they need.."); }
          }
          style={styles.serviceButton}
          >
              <Image 
              style={styles.serviceButtonImage}
              source={require('../assets/Bowl.png')} />
              <Text >Drop-in Visits</Text>
            </TouchableOpacity>

            <TouchableOpacity  onPress={() => { setWalkingTab( "I will take care of your pets and your home. Just let me know about any specific tasks you need to get done."); }
          }
          style={styles.serviceButton}
          >
              <Image 
              style={styles.serviceButtonImage}
              source={require('../assets/House.png')} />
              <Text >House Sitting</Text>
            </TouchableOpacity>

        </View>

          <View>
            {
          walkingTab ?
          <Text style={styles.example}> {walkingTab} </Text>
          :
         <Text></Text>
            }
          </View>
          
        <Text style={styles.title2} >Meet Your Caregiver</Text>

        <View style={styles.services}>
            <Image source={require('../assets/IMG.png')} style={{ width: 120, height: 120, margin: 10, borderRadius: 100  }} />
                <View style={styles.care}>
                  <Text style={styles.text} >Alexander Soudry.</Text>
                  <Text
                   style={styles.text}
                  >Reisterstown, MD.</Text>
                  <Text
                   style={styles.text}
                  >Life-long dog owner and lover!</Text>
                  <TouchableOpacity
                  style={styles.contactButton}
                  >
                    <Text 
                    style={styles.contactButtonText}
                    onPress={() => navigation.navigate('Contact')}
                    >Contact Me!</Text>
                  </TouchableOpacity>
                      {/* <Button   /> */}
                </View>
        </View>
               
        <View style={styles.secondRow}>
          <View></View>
        <Text  style={styles.title}>Customer Reviews</Text>

          <TouchableOpacity

style={styles.rowImage}

       onPress={() => {
        navigation.navigate('Reviewform', 
        )
        }}
        >
                <Image
                source={require('../assets/Plus.png')}
                />     
        </TouchableOpacity> 

        </View>
      
        <View style={styles.reviews}>
                  <Card
                        containerStyle={{borderRadius: 20}}
                        >
                            <Text
                             style={{ 
                                 fontWeight: 'bold',
                                 textAlign: 'center'
                            }}
                         >
                            {ReviewList[0].Name}</Text>
                            <Text>{ReviewList[0].Message}</Text>
                            <View
                            style={{flexDirection: 'row',
                                justifyContent: 'flex-end'}}
                            >
                                <AirbnbRating
                                size={15}
                                isDisabled={true}
                                showRating={false}
                                count={5}
                                defaultRating={ReviewList[0].Rating}
                            />
                            </View> 
                        </Card>

                        <Card
                        containerStyle={{borderRadius: 20}}
                        >
                            <Text
                             style={{ 
                                 fontWeight: 'bold',
                                 textAlign: 'center'
                            }}
                         >  
                            {ReviewList[1].Name}</Text>
                            <Text>{ReviewList[1].Message}</Text>
                            <View
                            style={{flexDirection: 'row',
                                justifyContent: 'flex-end'}}
                            >
                                <AirbnbRating
                                size={15}
                                isDisabled={true}
                                showRating={false}
                                count={5}
                                defaultRating={ReviewList[1].Rating}
                            />
                            </View> 
                        </Card>
        </View>
        <TouchableOpacity
        style={{
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: "center",
        marginRight: 20
      }}
        onPress={() => navigation.navigate('Reviews', {reviewData: ReviewList})} 
        >
          <Text
          style={{fontSize: 15}}
          >See all Reviews&nbsp;&nbsp;</Text>
          <Image
                source={require('../assets/Arrow_right.png')}
                />     
          </TouchableOpacity>
      </ScrollView>
  )
  }      
}

const styles = StyleSheet.create({
    title: {
      color: 'black',
      textAlign: 'center',
      fontSize: 20,
    },
    title2: {
      color: 'black',
      textAlign: 'center',
      fontSize: 20,
  },
    example: {
      backgroundColor: 'white',
      textAlign: 'center',
      borderRadius: 20,
      margin: 10,
      padding: 10

    },
    user: {},
    services: {
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        marginBottom: 10
    },
    care: {
        flexDirection: 'column',
    },
    contactButton: {
       backgroundColor: '#BEC3AA',
       alignItems: "center",
        width: 100,
        borderRadius: 20,
    },
    contactButtonText: {
      color: 'black',
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      modalView: {
          height: 300,
          width: 300,
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center"
      },
      color: {
        backgroundColor: '#F2F5EE',
      },
      serviceButton: {
        backgroundColor: 'white',
        borderRadius: 20,
        height: 112,
        width: 112,
        alignItems: 'center',
        margin: 5,
        padding: 5
      },
      serviceButtonImage: {
        height: '80%',
        width: '70%',
      },
      text: {
        marginTop: 7,
        marginBottom: 7
      },
      secondRow: {
        flexDirection: 'row',
        justifyContent: "space-evenly",
      },
      rowImage : {
      }
})

export default Home