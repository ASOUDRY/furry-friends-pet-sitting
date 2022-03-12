import React, {useEffect} from 'react';
import {View, ScrollView, StyleSheet, Modal} from "react-native";
import { Button, Card, Tab, TabView, Text} from 'react-native-elements';
import { firestore } from '../components/firebase';
import {getDocs, collection, where, query} from 'firebase/firestore'
import { SetProfile } from '../components/setProfile';

const Profile = ({navigation}) => {
  const [index, setIndex] = React.useState(0);
  const [currentDoc, setCurrent] = React.useState([])
  const [oldDoc, setOld] = React.useState([])
  const [arg, setArg] = React.useState()
  const [argNotes, setNotes] = React.useState()
  const [run, setRun] = React.useState(1)
 
  const getData = async (abort) => {
   if (!currentDoc.length) {
    const q = query(collection(firestore, "schedule"), where("current", "==", true));
    const querySnapshot = await getDocs(q, {signal: abort.signal})
    querySnapshot.forEach((doc) => {
        setCurrent((currentDoc) => [...currentDoc, doc.data()
        ])
    })
  }

  if (!oldDoc.length) {
    const q = query(collection(firestore, "schedule"), where("current", "==", false));
    const querySnapshot = await getDocs(q, {signal: abort.signal})
    querySnapshot.forEach((doc) => {
        setOld((oldDoc) => [...oldDoc, doc.data()
        ])
    })
  }
 
   if (currentDoc[0]) {
     getArg(currentDoc[0].animals)
   }

   setRun(run + 1)
  }
 
  const getArg = (animals) => {
  let thing = Object.entries(animals)
  setArg(thing)  
  }

  useEffect(() => {
    const abortController = new AbortController();
   getData(abortController)

   return () => {
    abortController.abort();
console.log("prof clean up")
  } ;  
}, [run === 2])

if (!arg) {
  return null
}  
else {
  return (
    <>
         <Card>
           <SetProfile/>
         <Button 
          icon={{
            name: 'edit',
            type: 'font-awesome',
            // size: 15,
            color: 'white',
          }}
          iconRight
          style={styles.button}
           />
           <Text>
             Name:
           </Text>
           <Text>
             Phone number
           </Text>
           <Text>
             Email
           </Text>
           <Text>
           UserName
           </Text> 
           <Text>
           Password
           </Text>
          </Card>
       <Tab
          value={index}
          onChange={(e) => setIndex(e)}
          indicatorStyle={{
            backgroundColor: 'black',
            height: 3,
          }}
          variant="default"
        >
          <Tab.Item
            title="UpComing"
            titleStyle={{ fontSize: 12 }}
       
          />
          <Tab.Item
            title="Pet Update"
            titleStyle={{ fontSize: 12 }}
       
          />
        </Tab>
  
        <TabView value={index} onChange={setIndex} animationType="spring">
          <TabView.Item style={{ width: '100%' }}>
            {/* Fix issue with date object */}
           <Card>
             <Card.Title>{currentDoc[0].appointment}</Card.Title>
             <Card.Divider/>
             <Text>{currentDoc[0].location}</Text> 
          {
            arg.map((key) => {
              return (
                <Text
                key={Math.random()}
                >{key[0] + " " + key[1].number}</Text>
              )
            })
          }

      <Text style={styles.box}> {currentDoc[0].notes}</Text>
            <Text>{currentDoc[0].startDate}</Text>
            <Text>{currentDoc[0].endDate}</Text>
           </Card>
          </TabView.Item>

          <TabView.Item style={{ height: '100%', width: '100%' }}>
            <ScrollView>
            {
          oldDoc[0].ownerNotes.map((key) => {
            return (
              <Card
              key={Math.random()}
              >
                 <Text
                 style={styles.box}
                 >{key}</Text>
              </Card>
            )
          })
        }
        <Text>Past Visit</Text>
        <View style={styles.text}>
       
        <Button title="More Review"
        onPress={() => navigation.navigate('OtherReview', {oldDoc: oldDoc}
        )}
        />
        </View>
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
        color: '#FFFFFF',
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
    box: {
      borderWidth: 1,
      height: 90
    },
    text: {
      justifyContent: 'center',
      flexDirection: 'row',
    }

})