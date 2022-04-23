import React, {useEffect} from 'react';
import {View, ScrollView, StyleSheet, Modal, Image, TouchableOpacity} from "react-native";
import { Button, Card, Tab, TabView, Text} from 'react-native-elements';
import { auth, firestore } from '../components/firebase';
import {getDocs, collection, where, query} from 'firebase/firestore'

const Profile = ({navigation}) => {
  const [index, setIndex] = React.useState(0);
  const [futureVisits, setFuture] = React.useState([])
  const [currentVisit, setCurrent] = React.useState([])
  const [pastVisit, setPast] = React.useState([])
  // const [limitedPast, setLimit] = React.useState([])
  const [loaded, confirmLoad] = React.useState(false)
  const [run, setRun] = React.useState(1)

  const getData = async (abort) => {
    
   if (!futureVisits.length) {
    const q = query(collection(firestore, "schedule"), where("status", "==", 'future'), where("id", "==", auth.currentUser.uid));
    const querySnapshot = await getDocs(q, {signal: abort.signal})
    querySnapshot.forEach((doc) => {
        setFuture((futureVisits) => [...futureVisits, doc.data()
        ])
    })
  }

  if (!currentVisit.length) {
    const q = query(collection(firestore, "schedule"), where("status", "==", 'current'), where("id", "==", auth.currentUser.uid));
    const querySnapshot = await getDocs(q, {signal: abort.signal})
    querySnapshot.forEach((doc) => {
        setCurrent((currentVisit) => [...currentVisit, doc.data()
        ])
    })
  }

  if (!pastVisit.length) {
    const q = query(collection(firestore, "schedule"), where("status", "==", 'past'), where("id", "==", auth.currentUser.uid));
    const querySnapshot = await getDocs(q, {signal: abort.signal})
    querySnapshot.forEach((doc) => {
        setPast((pastVisit) => [...pastVisit, doc.data()
        ])
    })
  }

   if (futureVisits.length) {
  confirmLoad(true)
   }

   setRun(run + 1)
  }
 
  useEffect(() => {
   const abortController = new AbortController();
   getData(abortController)
  
   return () => {
    abortController.abort();
  } ;  
}, [run === 2])

if (loaded === false) {
  return (
    <View
    style={{backgroundColor: '#F2F5EE', height: '100%', width: '100%', marginTop: 300}}
    >
    <Text h3
    style={{textAlign: 'center'}}
    >You have made no appointments. Check back here after you made one.</Text>
    </View>
  )
}  
else {
  return (
    <>         
       <Tab
          value={index}
          onChange={(e) => setIndex(e)}
          indicatorStyle={{
           height: 0,
          }}
          containerStyle={{
            backgroundColor: '#BEC3AA',
          }}
          variant="default"
          disableIndicator='true'
        >
       
          <Tab.Item
            title="Upcoming"
            titleStyle={{ fontSize: 12, color: 'black' }}
            style={{backgroundColor: '#BEC3AA', 
            borderRadius: 20,
            width: '100%',
            // marginLeft: 24, 
            height: 45
          }}      
          />

          <Tab.Item
            title="Updates"
            titleStyle={{ fontSize: 12,  color: 'black' }}
            style={{backgroundColor: '#BEC3AA',
            borderRadius: 20, width: '100%', height: 45
          }}      
          />

          <Tab.Item
            title="Past Visits"
            titleStyle={{ fontSize: 12,  color: 'black' }}
            style={{backgroundColor: '#BEC3AA',
            borderRadius: 20, width: '100%', height: 45
          }}      
          />
        </Tab>
  
        <TabView value={index} onChange={setIndex} animationType="spring">

        <TabView.Item style={{ height: '100%', width: '100%',
      backgroundColor: '#F2F5EE'
      }}>
           
           <ScrollView>
           <Text h4
        style={{fontWeight: 'bold', textAlign: 'center'}}
        >Upcoming</Text>
             {
               futureVisits.map(
                 (visit) => {
                   return (
                     <View
                     style={{justifyContent: 'center',
                     alignItems: 'center'}}
                     >
                        <View 
                     style={{
                       borderWidth: 1,
                       borderTopColor: '#F2F5EE',
                       borderLeftColor: '#F2F5EE',
                       borderRightColor: '#F2F5EE',
                      borderBottomColor: 'red',
                      paddingBottom: 10,
                      marginBottom: 10,
                      marginTop: 10,
                      width: 380,
                    }}
                     key={visit}>
                     {
             visit.service.length === 1 ?
             <Text
             style={{
              fontWeight: 'bold', 
              marginTop: 10, marginLeft: 20
             }}
             >{visit.service[0]}</Text>
             :
             visit.service.length === 2 ?
             <Text
             style={{
               fontWeight: 'bold', 
               marginTop: 10, marginLeft: 20
              }}
             >{visit.service[0] + ' & ' + visit.service[1]}</Text>
             :
             visit.service.length === 3 ?
             <Text
             style={{
               fontWeight: 'bold', 
               marginTop: 10, marginLeft: 20
              }}
             >{visit.service[0] + ' & ' + visit.service[1] + ' & ' + visit.service[2]
             }</Text>
             :
             <Text
             style={{
               fontWeight: 'bold', 
               marginTop: 10, marginLeft: 20
              }}>
                A service was not selected
              </Text>
           }        
           <Text
           style={{ marginTop: 10, marginLeft: 20}}
           >{visit.location}</Text> 
        
             <View>
             <View style={{flexDirection: 'row', marginTop: 10, marginLeft: 20
          }}
             > 
             
             {
            Object.entries(visit.animals).map((key) => {
              console.log(key)
              return (
                <Text
                key={key}
                >
                  {key.number}
                  { key[1].number + ' ' + key[0] + ', ' }
                </Text>
              )
            })
          }
             
             </View>

          </View>
   
          <Text
            style={{ marginTop: 10, marginLeft: 20}}
          >{visit.startDate + ' - ' + visit.endDate}</Text> 

                     <Card
               containerStyle={{margin: 10, borderRadius: 25}}
             >
           
                 {
              visit.comment ?
              <Text
              style={{
                // marginTop: 10, marginLeft: 20, 
                backgroundColor: 'white', borderRadius: 20, 
              }}
              >{visit.comment}</Text>
              :
              <Text
              style={{backgroundColor: 'white' }}
              >
                Add any comments here</Text>
            }
             </Card>
         
                     </View>
                     </View>
                    
                   )
                 }
               )
             }
           </ScrollView>
          </TabView.Item>
     
          <TabView.Item style={{ height: '100%', width: '100%',
          backgroundColor: '#F2F5EE'
        }}>
            <ScrollView>
       
         <Text h4 style={{fontWeight: 'bold', textAlign: 'center'}} >Current</Text>
      
        { 
     
               currentVisit.map(
                 (visit) => {
                   console.log(visit)
                   return (
                     <View
                     style={{justifyContent: 'center',
                     alignItems: 'center'}}
                     >
                        <View 
                     style={{
                       borderWidth: 1,
                       borderTopColor: '#F2F5EE',
                       borderLeftColor: '#F2F5EE',
                       borderRightColor: '#F2F5EE',
                      borderBottomColor: 'red',
                      paddingBottom: 10,
                      marginBottom: 10,
                      marginTop: 10,
                      width: 380,
                    }}
                     key={visit}>
                      {
             visit.service.length === 1 ?
             <Text
             style={{
              fontWeight: 'bold', 
              marginTop: 10, marginLeft: 20
             }}
             >{visit.service[0]}</Text>
             :
             visit.service.length === 2 ?
             <Text
             style={{
               fontWeight: 'bold', 
               marginTop: 10, marginLeft: 20
              }}
             >{visit.service[0] + ' & ' + visit.service[1]}</Text>
             :
             visit.service.length === 3 ?
             <Text
             style={{
               fontWeight: 'bold', 
               marginTop: 10, marginLeft: 20
              }}
             >{visit.service[0] + ' & ' + visit.service[1] + ' & ' + visit.service[2]
             }</Text>
             :
             <Text
             style={{
               fontWeight: 'bold', 
               marginTop: 10, marginLeft: 20
              }}>
                A service was not selected
              </Text>
           }        
           <Text
           style={{ marginTop: 10, marginLeft: 20}}
           >{visit.location}</Text> 
        
             <View>
             <View style={{flexDirection: 'row', marginTop: 10, marginLeft: 20
          }}
             > 
             
             {
            Object.entries(visit.animals).map((key) => {
              console.log(key)
              return (
                <Text
                key={key}
                >
                  {key.number}
                  { key[1].number + ' ' + key[0] + ', ' }
                </Text>
              )
            })
          }
             
             </View>

          </View>
   
          <Text
            style={{ marginTop: 10, marginLeft: 20}}
          >{visit.startDate + ' - ' + visit.endDate}</Text> 

            {
                visit.update.map((key) => {
                  return (
                    <Card containerStyle={{margin: 10, borderRadius: 25}}>
                       <Text
                        style={{ backgroundColor: 'white', borderRadius: 20, }}
                        >
                       {key}
                       </Text> 
                     </Card> )})}
                      
                  
         
                     </View>
                     </View>
                    
                   )
                 }
               )
     
       
             }
    
            </ScrollView>
          </TabView.Item>

          <TabView.Item style={{ height: '100%', width: '100%',
          backgroundColor: '#F2F5EE'
        }}>
            <ScrollView>
         
        <Text h4
        style={{fontWeight: 'bold', textAlign: 'center'}}
        >Past Visit</Text>
        {
               pastVisit.map(
                 (visit) => {
                   console.log(visit)
                   return (
                     <View
                     style={{justifyContent: 'center',
                     alignItems: 'center'}}
                     >
                        <View 
                     style={{
                       borderWidth: 1,
                       borderTopColor: '#F2F5EE',
                       borderLeftColor: '#F2F5EE',
                       borderRightColor: '#F2F5EE',
                      borderBottomColor: 'red',
                      paddingBottom: 10,
                      marginBottom: 10,
                      marginTop: 10,
                      width: 380,
                    }}
                     key={visit}>
                      {
             visit.service.length === 1 ?
             <Text
             style={{
              fontWeight: 'bold', 
              marginTop: 10, marginLeft: 20
             }}
             >{visit.service[0]}</Text>
             :
             visit.service.length === 2 ?
             <Text
             style={{
               fontWeight: 'bold', 
               marginTop: 10, marginLeft: 20
              }}
             >{visit.service[0] + ' & ' + visit.service[1]}</Text>
             :
             visit.service.length === 3 ?
             <Text
             style={{
               fontWeight: 'bold', 
               marginTop: 10, marginLeft: 20
              }}
             >{visit.service[0] + ' & ' + visit.service[1] + ' & ' + visit.service[2]
             }</Text>
             :
             <Text
             style={{
               fontWeight: 'bold', 
               marginTop: 10, marginLeft: 20
              }}>
                A service was not selected
              </Text>
           }        
           <Text
           style={{ marginTop: 10, marginLeft: 20}}
           >{visit.location}</Text> 
        
             <View>
             <View style={{flexDirection: 'row', marginTop: 10, marginLeft: 20
          }}
             > 
             
             {
            Object.entries(visit.animals).map((key) => {
              console.log(key)
              return (
                <Text
                key={key}
                >
                  {key.number}
                  { key[1].number + ' ' + key[0] + ', ' }
                </Text>
              )
            })
          }
             
             </View>

          </View>
   
          <Text
            style={{ marginTop: 10, marginLeft: 20}}
          >{visit.startDate + ' - ' + visit.endDate}</Text> 

                     <Card
               containerStyle={{margin: 10, borderRadius: 25}}
             >
           
                 {
              visit.update ?
              <Text
              style={{
                // marginTop: 10, marginLeft: 20, 
                backgroundColor: 'white', borderRadius: 20, 
              }}
              >{visit.update}</Text>
              :
              <Text
              style={{backgroundColor: 'white' }}
              >
                The sitter has not left any updates left.</Text>
            }
             </Card>
         
                     </View>
                     </View>
                    
                   )
                 }
               )
             }
            </ScrollView>
          </TabView.Item>
        </TabView>
    </>
    )
  }

}

export default Profile

const styles = StyleSheet.create({
    title:{
        flex: 1,
        alignItems: 'center',
        fontSize: 45,
        fontWeight: "600",
        marginTop: 75,
      },
      services: {
        justifyContent: 'center',
        flexDirection: 'row',
        marginBottom: 10
    },
    button: {
      position: 'relative',
      width: 50,
      left: 320
    },
    text: {
      justifyContent: 'center',
      flexDirection: 'row',
    },
    setUp: {

    }

})