import React, { useState, useEffect } from 'react';
import {View, ScrollView, StyleSheet, Modal, Pressable, TouchableOpacity, Image} from "react-native";
import { Button, Text, Card } from 'react-native-elements';
import { Reviewform} from '../components/reviewform';
import { firestore } from '../components/firebase';
import {getDocs, collection} from 'firebase/firestore'

const Home = ({route, navigation}) => { 

  const [toggle, setToggle] = useState(false);

  const fetchdata = async () => {
    try {
      if (ReviewList.length != 0) {
        setReviewList([])
      }
     const querySnapshot = await getDocs(collection(firestore, "review"));
     querySnapshot.forEach((doc) => {
         const {Title, Message} = doc.data().data
         setReviewList((ReviewList) => [...ReviewList, {
             Message: Message,
             Title: Title
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
}, [toggle]);

const [ReviewList, setReviewList] = useState([])
    
    const [modalOne, setModalOneVisible] = useState(false);
    const [modalTwo, setModalTwoVisible] = useState(false);
    const [walkingTab, setWalkingTab] = useState('');
      
  if (ReviewList.length <= 1) {
    return null;
  }
  else {
    return (
      <ScrollView>
        <Modal
         animationType="fade"
          transparent={true}
                    visible={modalOne}
                    onRequestClose={() => {
                      setModalOneVisible(!modalOne);
                    }}
                  >
                <View 
                style={styles.centeredView}
                >
                  <View style={styles.modalView}>
                    <Text h3 style={styles.modalText}>{ReviewList[0].Title}</Text>
                    <Text>
                    {ReviewList[0].Message}
                    </Text>
                    <Button title={"Hide Modal"}
                     onPress={() => setModalOneVisible(!modalOne)}
                    />
                  </View>
                </View>
        </Modal>

        <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalTwo}
                    onRequestClose={() => {
                      setModalTwoVisible(!modalTwo);
                    }}
                  >
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                  <Text h3 style={styles.modalText}>{ReviewList[1].Title}</Text>
                    <Text>
                    {ReviewList[1].Message}
                    </Text>
                    <Button title={"Hide Modal"}
                     onPress={() => setModalTwoVisible(!setModalTwoVisible)}
                    />
                  </View>
                </View>
        </Modal>
     
        <Text h2 style={styles.title}>Services</Text>

        <View style={styles.services}>

            <TouchableOpacity  onPress={() => { setWalkingTab( "Let me walk your pupper."); }}>
              <Card>
                  <Card.Title>Walking</Card.Title>
                  <Card.Divider/>
              </Card>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => { setWalkingTab( "Let me house sit your pupper."); }}>
              <Card>
                  <Card.Title>HouseVisit</Card.Title>
                  <Card.Divider/>
              </Card>
            </TouchableOpacity>
                        
        </View>

        <Text style={styles.example}> {walkingTab} </Text>
          
        <Text h2 style={styles.title} >Meet Your Caregiver</Text>

        <View style={styles.services}>
            <Image source={require('./image.png')} style={{ width: 200, height: 200, margin: 10  }} />
                <View style={styles.care}>
                  <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                        est laborum.
                  </Text>
                      <Button style={styles.learn} title="Contact Me" onPress={() => navigation.navigate('Contact')} />
                </View>
        </View>
               
        <Text h2 style={styles.title} >Customer Reviews</Text>
        <View style={styles.services}>
         
                <TouchableOpacity
                onPress={() => {setModalOneVisible(true)}}
                >
                  <Card>
                    <Card.Title>{ReviewList[0].Title}</Card.Title>
                    <Card.Divider/>
                  </Card>
                </TouchableOpacity>
                <TouchableOpacity
                 onPress={() => {setModalTwoVisible(true)}}
                > 
                   <Card>
                    <Card.Title>{ReviewList[1].Title}</Card.Title>
                    <Card.Divider/>
                  </Card>
                </TouchableOpacity>
        </View>
        <View style={styles.services}>
          <Reviewform refreshState={refreshState}/>
            <Button  title="More reviews" onPress={() => navigation.navigate('Reviews', {reviewData: ReviewList})} 
        />
    
      
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
    example: {
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
        height: 50,
        fontSize: 2
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
      }
      
})

export default Home